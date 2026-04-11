import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Check,
  X,
  MapPin,
  Layers,
  Building,
  Banknote,
  User,
  Clock,
  ClipboardList,
  Mail,
} from "lucide-react";
import { TableRowSkeleton } from "../../../components/common/Skeleton";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();
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
      await axiosSecure.patch(`/agreements/${request._id}`, {
        agreement: "checked",
      });
      await axiosSecure.patch(`/users/role/member/${request.userEmail}`);
      toast.success("Agreement accepted successfully!");
      queryClient.invalidateQueries(["requested-agreements"]);
    } catch (err) {
      toast.error("Failed to accept request");
    }
  };

  // Reject handler
  const rejectRequest = async (request) => {
    try {
      await axiosSecure.patch(`/agreements/${request._id}`, {
        agreement: "checked",
      });
      await axiosSecure.delete(`/agreements/${request._id}`);
      toast.success("Request rejected");
      queryClient.invalidateQueries(["requested-agreements"]);
    } catch (err) {
      toast.error("Failed to reject request");
    }
  };

  const getRequestDate = (id) => {
    try {
      return new Date(
        parseInt(id.toString().substring(0, 8), 16) * 1000,
      ).toLocaleDateString();
    } catch (e) {
      return "N/A";
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
        <div className="h-12 w-1/4 bg-slate-200 animate-pulse rounded-lg mb-8"></div>
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <TableRowSkeleton key={i} cols={5} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ClipboardList className="text-indigo-600" />
            Agreement Requests
          </h2>
          <p className="text-gray-500 mt-1">
            Review and manage incoming apartment lease applications.
          </p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          {requests.length} Pending Actions
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-gray-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Apartment Details
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Financials
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Submission
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {req.userName?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {req.userName}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail size={12} /> {req.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-indigo-600 flex items-center gap-1.5">
                          <Building size={14} /> Apt {req.apartmentNo}
                        </p>
                        <div className="flex gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Layers size={12} /> Floor {req.floorNo}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> Block {req.blockName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-gray-900 font-bold">
                        <Banknote size={16} className="text-emerald-500" />
                        {req.rent} TK
                        <span className="text-[10px] text-gray-400 font-normal ml-1">
                          / Month
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600 flex items-center gap-1.5">
                        <Clock size={14} className="text-gray-400" />
                        {getRequestDate(req._id)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          title="Accept Request"
                          className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all transform active:scale-95"
                          onClick={() => acceptRequest(req)}
                        >
                          <Check size={18} />
                        </button>
                        <button
                          title="Reject Request"
                          className="p-2.5 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition-all transform active:scale-95"
                          onClick={() => rejectRequest(req)}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-20 text-center text-gray-400"
                  >
                    <ClipboardList
                      size={40}
                      className="mx-auto mb-4 opacity-20"
                    />
                    <p className="font-medium">
                      No pending agreement requests found.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgreementRequests;
