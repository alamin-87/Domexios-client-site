import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  Users,
  UserMinus,
  Mail,
  ShieldCheck,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { TableRowSkeleton } from "../../../components/common/Skeleton";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users and filter members
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.filter((user) => user.role === "member");
    },
  });

  const filteredMembers = members.filter(
    (member) =>
      member.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Mutation: Change role to 'user'
  const { mutate: removeMemberRole, isPending } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/${userId}/remove-member`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      Swal.fire({
        title: "Reduced Access",
        text: "Member role has been removed successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        borderRadius: "1rem",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Update Failed",
        text: "Could not update user role at this time.",
        icon: "error",
        borderRadius: "1rem",
      });
    },
  });

  const handleRemove = (member) => {
    Swal.fire({
      title: "Revoke Membership?",
      text: `This will return ${member.displayName || "this user"} to standard guest status.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Revoke Role",
      borderRadius: "1rem",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMemberRole(member._id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 max-w-7xl mx-auto">
        <div className="h-12 w-1/4 bg-slate-200 animate-pulse rounded-lg mb-8"></div>
        <div className="h-16 w-full bg-slate-200 animate-pulse rounded-2xl mb-8"></div>
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <TableRowSkeleton key={i} cols={3} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 max-w-7xl mx-auto">
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Users className="text-indigo-600" />
            Tower Residency
          </h2>
          <p className="text-slate-500 font-medium">
            Manage active members and oversee resident permissions.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-xl flex items-center gap-3">
            <ShieldCheck size={20} />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Verified Members
              </span>
              <span className="text-xl font-black leading-none">
                {members.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
            size={18}
          />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search by resident name or email..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium"
          />
        </div>
        <button className="h-full px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2 font-bold">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Resident Identity
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Role Protocol
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Administrative Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMembers.map((member) => (
                <tr
                  key={member._id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 overflow-hidden flex items-center justify-center shrink-0">
                        {member.photoURL ? (
                          <img
                            src={member.photoURL}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserCircle className="text-indigo-200" size={32} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {member.displayName || "Anonymous Resident"}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-0.5">
                          <Mail size={12} />
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-2 w-fit">
                      <ShieldCheck size={12} />
                      Active Member
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleRemove(member)}
                        disabled={isPending}
                        className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-wider group/btn disabled:opacity-50"
                      >
                        {isPending ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <UserMinus
                              size={14}
                              className="group-hover/btn:scale-110 transition-transform"
                            />
                            Revoke Membership
                          </>
                        )}
                      </button>
                      <button className="p-2.5 text-slate-300 hover:text-indigo-600 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                      <Users size={32} />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">
                        No members identified
                      </p>
                      <p className="text-slate-400 text-sm mt-1">
                        Try adjusting your search criteria or verify the user
                        roster.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination Placeholder */}
        <div className="px-8 py-4 bg-slate-50/30 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
          <p>Showing {filteredMembers.length} active residency records</p>
          <div className="flex items-center gap-1">
            <span>Verified System Audit 2026</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {/* Proactive Tip */}
      <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-black">Resident Role Protocol</h4>
            <p className="text-indigo-100 text-sm font-medium max-w-lg">
              Revoking membership will reset the user to a standard "User" role.
              This will disable their access to member-only dashboard panels and
              payment portals.
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-700/20 active:scale-95 transition-all">
            Review Governance Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
