import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

// === Stripe Form ===
const ProcessPayment = ({ agreement, coupon, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (agreement?.rent > 0) {
      const amount = agreement.rent - (coupon?.discount || 0);
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => setErrorMsg("Could not create payment intent"));
    }
  }, [agreement, coupon, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);
    setErrorMsg("");

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      setErrorMsg(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      await axiosSecure.post("/payments/complete", {
        agreementId: agreement._id,
        userEmail: agreement.userEmail,
        couponCode: coupon?.code || "",
        discount: coupon?.discount || 0,
      });
      onSuccess(); // Close modal + refresh
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <CardElement className="border p-3 rounded" />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

// === Main Component ===
const MakePayment = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  // Agreements with agreement: "requested" and status: "pending"
  const {
    data: agreements = [],
    isLoading: loadingAgreements,
    refetch,
  } = useQuery({
    queryKey: ["agreements", user?.email],
    enabled: !!user?.email,
    queryFn: () =>
      axiosSecure
        .get(`/agreements/user/${user.email}/checked`) // Backend should handle filter
        .then((res) => res.data),
  });

  // All coupons
  const { data: coupons = [], isLoading: loadingCoupons } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => axiosSecure.get("/coupons").then((res) => res.data),
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState({ code: "", discount: 0 });

  const openModal = (agreement) => {
    setSelectedAgreement(agreement);
    setCoupon({ code: "", discount: 0 });
    setCouponCode("");
    setShowModal(true);
  };

  const applyCoupon = () => {
    const found = coupons.find((c) => c.code === couponCode.trim());
    if (found) {
      setCoupon({ code: found.code, discount: found.discount });
    } else {
      alert("Invalid coupon code");
      setCoupon({ code: "", discount: 0 });
    }
  };

  if (loadingAgreements || loadingCoupons) {
    return <p className="text-center py-10 text-lg">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Make Payment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agreements.map((agr) => (
          <div
            key={agr._id}
            className="border border-gray-300 p-4 rounded-lg shadow bg-white"
          >
            <p>
              <strong>Apartment:</strong> {agr.apartmentNo}
            </p>
            <p>
              <strong>Rent:</strong> ${agr.rent}
            </p>
            <p>
              <strong>Status:</strong> {agr.status}
            </p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => openModal(agr)}
              disabled={agr.status === "paid"}
            >
              {agr.status === "paid" ? "Paid" : "Pay Now"}
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedAgreement && (
        <dialog open className="modal">
          <div className="modal-box max-w-xl">
            <h3 className="text-xl font-semibold">
              Payment for {selectedAgreement.apartmentNo}
            </h3>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="input input-bordered w-full mb-2"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                className="btn btn-sm btn-secondary"
                onClick={applyCoupon}
              >
                Apply Coupon
              </button>

              <p className="mt-4 text-lg">
                Total to Pay:{" "}
                <strong>
                  $
                  {(selectedAgreement.rent - (coupon.discount || 0)).toFixed(2)}
                </strong>
              </p>

              <Elements stripe={stripePromise}>
                <ProcessPayment
                  agreement={selectedAgreement}
                  coupon={coupon}
                  onSuccess={() => {
                    setShowModal(false);
                    refetch();
                  }}
                />
              </Elements>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MakePayment;
