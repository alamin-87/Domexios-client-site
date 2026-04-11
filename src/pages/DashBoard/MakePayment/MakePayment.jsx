import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  CreditCard,
  Ticket,
  ArrowRight,
  Building,
  AlertCircle,
  CheckCircle2,
  Wallet,
  Calendar,
  Layers,
  MapPin,
  X,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

// === Stripe Form Component ===
const ProcessPayment = ({ agreement, coupon, onSuccess, onLoading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
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
    onLoading(true);
    setErrorMsg("");

    const card = elements.getElement(CardNumberElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      },
    );

    if (error) {
      setErrorMsg(error.message);
      setProcessing(false);
      onLoading(false);
      toast.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.post("/payments/complete", {
          agreementId: agreement._id,
          userEmail: agreement.userEmail,
          couponCode: coupon?.code || "",
          discount: coupon?.discount || 0,
        });
        toast.success("Payment successful!");
        onSuccess();
      } catch (err) {
        toast.error("Database sync failed, please contact support");
      } finally {
        setProcessing(false);
        onLoading(false);
      }
    }
  };

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1e293b",
        fontFamily: '"Inter", system-ui, sans-serif',
        "::placeholder": {
          color: "#94a3b8",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 animate-in fade-in duration-500"
    >
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
          <ShieldCheck className="text-emerald-500" size={20} />
          <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            Secure Authentication Protocol
          </span>
        </div>

        {/* Horizontal Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* Card Number */}
          <div className="md:col-span-6 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Card Number
            </label>
            <div className="bg-slate-50 border-2 border-transparent px-5 py-4.5 rounded-2xl focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/5 transition-all">
              <CardNumberElement options={ELEMENT_OPTIONS} />
            </div>
          </div>

          {/* Expiry */}
          <div className="md:col-span-3 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Expiry
            </label>
            <div className="bg-slate-50 border-2 border-transparent px-5 py-4.5 rounded-2xl focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/5 transition-all">
              <CardExpiryElement options={ELEMENT_OPTIONS} />
            </div>
          </div>

          {/* CVC */}
          <div className="md:col-span-3 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              CVC Code
            </label>
            <div className="bg-slate-50 border-2 border-transparent px-5 py-4.5 rounded-2xl focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/5 transition-all">
              <CardCvcElement options={ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!stripe || processing || !clientSecret}
            className="relative w-full h-18 bg-slate-900 overflow-hidden group hover:bg-black text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 mt-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            {processing ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <>
                <Zap
                  size={20}
                  className="text-indigo-400 group-hover:text-white transition-colors"
                />
                Authorize Transaction
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-2">
          <Lock size={12} /> PCI-DSS Level 1 Compliant
        </p>
        <div className="hidden md:block w-1 h-1 rounded-full bg-slate-200"></div>
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-2">
          256-Bit SSL Encryption Active
        </p>
      </div>
    </form>
  );
};

// === Main Component ===
const MakePayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: agreements = [],
    isLoading: loadingAgreements,
    refetch,
  } = useQuery({
    queryKey: ["agreements-checked", user?.email],
    enabled: !!user?.email,
    queryFn: () =>
      axiosSecure
        .get(`/agreements/user/${user.email}/checked`)
        .then((res) => res.data),
  });

  const { data: couponsRes = { coupons: [] }, isLoading: loadingCoupons } =
    useQuery({
      queryKey: ["coupons-all"],
      queryFn: () => axiosSecure.get("/coupons").then((res) => res.data),
    });

  const [showModal, setShowModal] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState({ code: "", discount: 0 });
  const [paymentLoading, setPaymentLoading] = useState(false);

  const openModal = (agreement) => {
    setSelectedAgreement(agreement);
    setAppliedCoupon({ code: "", discount: 0 });
    setCouponCode("");
    setShowModal(true);
  };

  const handleApplyCoupon = () => {
    const found = couponsRes.coupons?.find(
      (c) => c.code.toLowerCase() === couponCode.trim().toLowerCase(),
    );
    if (found) {
      setAppliedCoupon({ code: found.code, discount: found.discount });
      toast.success(`${found.discount} TK Discount Applied!`);
    } else {
      toast.error("Invalid coupon code");
      setAppliedCoupon({ code: "", discount: 0 });
    }
  };

  if (loadingAgreements || loadingCoupons) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold animate-pulse text-xs uppercase tracking-[0.2em]">
          Restoring Session...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700 max-w-6xl mx-auto">
      {/* Immersive Header */}
      <div className="bg-white p-8 md:p-12 rounded-[3.8rem] shadow-xl shadow-slate-200/50 border border-gray-100 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-20 -mt-20 blur-3xl"></div>

        <div className="relative z-10 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
            <Wallet size={12} />
            Centralized Billing
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter">
            Billing Archive
          </h2>
          <p className="text-slate-500 font-medium max-w-md">
            Access your verified residential agreements and complete secure
            month-end checkout.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white text-center min-w-[160px] shadow-2xl shadow-indigo-100">
            <span className="block text-[8px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">
              Open Bills
            </span>
            <span className="text-4xl font-black">
              {agreements.filter((a) => a.status !== "paid").length}
            </span>
          </div>
          <div className="bg-slate-100 rounded-[2.5rem] p-8 text-slate-600 text-center min-w-[140px]">
            <span className="block text-[8px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">
              Checked
            </span>
            <span className="text-4xl font-black">{agreements.length}</span>
          </div>
        </div>
      </div>

      {agreements.length === 0 ? (
        <div className="bg-white p-20 rounded-[3.8rem] border border-dashed border-gray-200 text-center space-y-6">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
            <Building size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              Archive Empty
            </h3>
            <p className="text-slate-400 font-medium max-w-xs mx-auto">
              Verified residency contracts will appear here for monthly
              checkout.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {agreements.map((agr) => (
            <div
              key={agr._id}
              className="group bg-white p-10 rounded-[3.5rem] shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>

              <div className="relative space-y-8">
                <div className="flex items-start justify-between">
                  <div className="p-5 bg-indigo-100 text-indigo-600 rounded-3xl shadow-sm transition-all group-hover:bg-indigo-600 group-hover:text-white">
                    <Building size={28} />
                  </div>
                  <span
                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      agr.status === "paid"
                        ? "bg-emerald-100 text-emerald-600 border border-emerald-100"
                        : "bg-amber-100 text-amber-600 border border-amber-100"
                    }`}
                  >
                    {agr.status} Protocol
                  </span>
                </div>

                <div>
                  <h4 className="text-3xl font-black text-slate-900 tracking-tight">
                    Apartment {agr.apartmentNo}
                  </h4>
                  <div className="mt-5 flex flex-wrap gap-5">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider bg-slate-50 px-4 py-2 rounded-xl">
                      <MapPin size={14} className="text-indigo-400" />
                      {agr.blockName} Block
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider bg-slate-50 px-4 py-2 rounded-xl">
                      <Layers size={14} className="text-indigo-400" />
                      Floor {agr.floorNo}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Base Rent
                    </span>
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">
                      {agr.rent} TK/mo
                    </span>
                  </div>
                  <button
                    onClick={() => openModal(agr)}
                    disabled={agr.status === "paid"}
                    className={`px-10 py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 ${
                      agr.status === "paid"
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-slate-900 text-white hover:bg-black shadow-2xl shadow-slate-200"
                    }`}
                  >
                    {agr.status === "paid" ? (
                      <>
                        <CheckCircle2 size={16} /> Finalized
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} /> Open Checkout
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Extreme Modern Payment Modal */}
      {showModal && selectedAgreement && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_32px_120px_-15px_rgba(0,0,0,0.3)] w-full max-w-5xl my-auto animate-in zoom-in-95 duration-300 relative">
            <div className="p-8 md:p-14 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-600 rounded-2xl md:rounded-[1.8rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-100 transform -rotate-3">
                  <Zap size={28} className="md:w-8 md:h-8" />
                </div>
                <div>
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter">
                    Authorized Checkout
                  </h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">
                    Audit Stream: DX-7790-2026
                  </p>
                </div>
              </div>
              <button
                disabled={paymentLoading}
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 md:top-10 md:right-10 p-3 md:p-4 hover:bg-slate-50 rounded-2xl md:rounded-3xl transition-all font-bold text-slate-300 hover:text-rose-500 disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 md:p-14 space-y-10 md:space-y-12">
              {/* Wide Summary Row */}
              <div className="bg-indigo-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 text-white shadow-2xl shadow-indigo-200 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left space-y-2">
                  <span className="inline-block text-[9px] font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest mb-2">
                    Verified Contract
                  </span>
                  <h4 className="text-2xl lg:text-3xl font-black">
                    Apartment {selectedAgreement.apartmentNo}
                  </h4>
                  <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">
                    Residency Floor {selectedAgreement.floorNo} •{" "}
                    {selectedAgreement.blockName} Block
                  </p>
                </div>

                <div className="text-center md:text-right">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">
                    Current Amount Due
                  </span>
                  <div className="flex items-baseline justify-center md:justify-end gap-3">
                    {appliedCoupon.discount > 0 && (
                      <span className="text-xl text-indigo-200/50 line-through font-bold">
                        {selectedAgreement.rent}
                      </span>
                    )}
                    <span className="text-5xl lg:text-6xl font-black tracking-tighter">
                      {selectedAgreement.rent - appliedCoupon.discount}
                      <span className="text-lg ml-2 opacity-60 font-black">
                        TK
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="space-y-12">
                {/* Promo Section */}
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="relative flex-1 w-full group">
                    <Ticket
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                      size={24}
                    />
                    <input
                      disabled={paymentLoading}
                      type="text"
                      placeholder="Unlock residency rewards with a promo code..."
                      className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-indigo-600 outline-none transition-all font-black placeholder:font-normal"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  <button
                    disabled={paymentLoading || !couponCode}
                    className="h-[76px] px-12 bg-slate-100 text-slate-600 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all disabled:opacity-50 min-w-[220px]"
                    onClick={handleApplyCoupon}
                  >
                    Apply Reward
                  </button>
                </div>

                {/* Integrated Horizontal Payment Zone */}
                <Elements stripe={stripePromise}>
                  <ProcessPayment
                    onLoading={setPaymentLoading}
                    agreement={selectedAgreement}
                    coupon={appliedCoupon}
                    onSuccess={() => {
                      setShowModal(false);
                      refetch();
                    }}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MakePayment;
