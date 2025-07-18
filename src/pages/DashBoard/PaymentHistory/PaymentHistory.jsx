import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const PaymentHistory = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="overflow-x-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">My Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <table className="table table-zebra w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Apartment</th>
              <th>Floor</th>
              <th>Block</th>
              <th>Rent</th>
              <th>Discount</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.userName}</td>
                <td>{payment.userEmail}</td>
                <td>{payment.apartmentNo}</td>
                <td>{payment.floorNo}</td>
                <td>{payment.blockName}</td>
                <td>${payment.rent}</td>
                <td>${payment.discount}</td>
                <td>${payment.paidAmount}</td>
                <td>
                  <span
                    className={`badge ${
                      payment.status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td>{new Date(payment.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
