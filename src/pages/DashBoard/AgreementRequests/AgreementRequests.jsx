import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const AgreementRequests = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch agreements where agreement === "requested"
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requested-agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements/requested");
      return res.data;
    },
  });

  // Accept handler
  const acceptRequest = async (request) => {
    try {
      // 1. Update agreement field to "checked"
      await axiosSecure.patch(`/agreements/${request._id}`, {
        agreement: "checked",
      });

      // 2. Update user role to "member"
      await axiosSecure.patch(`/users/role/member/${request.userEmail}`);

      toast.success("Agreement accepted!");
      queryClient.invalidateQueries(["requested-agreements"]);
    } catch (err) {
      toast.error("Failed to accept request");
    }
  };

  // Reject handler
  const rejectRequest = async (request) => {
    try {
      // 1. Update agreement field to "checked"
      await axiosSecure.patch(`/agreements/${request._id}`, {
        agreement: "checked",
      });

      // 2. Delete the agreement
      await axiosSecure.delete(`/agreements/${request._id}`);

      toast.success("Agreement rejected");
      queryClient.invalidateQueries(["requested-agreements"]);
    } catch (err) {
      toast.error("Failed to reject request");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Agreement Requests</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Email</th>
            <th>Floor</th>
            <th>Block</th>
            <th>Apartment</th>
            <th>Rent</th>
            <th>Request Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.userName}</td>
              <td>{req.userEmail}</td>
              <td>{req.floorNo}</td>
              <td>{req.blockName}</td>
              <td>{req.apartmentNo}</td>
              <td>৳{req.rent}</td>
              <td>
                {new Date(
                  parseInt(req._id.toString().substring(0, 8), 16) * 1000
                ).toLocaleDateString()}
              </td>
              <td className="space-x-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => acceptRequest(req)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => rejectRequest(req)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgreementRequests;
