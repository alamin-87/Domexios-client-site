import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  User,
  Mail,
  Shield,
  Building,
  MapPin,
  Layers,
  Banknote,
  Calendar,
  BadgeCheck,
  Briefcase,
  Edit,
  X,
  Camera,
  Save,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router";
import { ProfileSkeleton } from "../../../components/common/Skeleton";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // 1. Fetch user info from 'users' collection
  const { data: currentUser = {}, isLoading: loadingUser } = useQuery({
    queryKey: ["current-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // 2. Fetch agreements (only if member or admin)
  const isAgreementUser =
    currentUser?.role === "member" || currentUser?.role === "admin";

  const { data: agreements = [], isLoading: loadingAgreements } = useQuery({
    queryKey: ["user-agreements", user?.email],
    enabled: !!user?.email && isAgreementUser,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/user/${user.email}`);
      return res.data;
    },
  });

  const handleUpdateProfile = async (data) => {
    try {
      // Step 1: Update Firebase Profile
      await updateUserProfile({
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      // Step 2: Update MongoDB database
      await axiosSecure.patch(`/users/update/${user.email}`, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
      queryClient.invalidateQueries(["current-user", user?.email]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (loadingUser || (isAgreementUser && loadingAgreements)) {
    return <ProfileSkeleton />;
  }

  const roleColors = {
    admin: "bg-rose-50 text-rose-600 border-rose-100",
    member: "bg-emerald-50 text-emerald-600 border-emerald-100",
    user: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

        <div className="relative px-6 pb-8 pt-16 md:px-10 flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={
                currentUser?.photoURL ||
                user?.photoURL ||
                "https://i.ibb.co/2YjNZ3t/user.png"
              }
              alt="User Avatar"
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg shadow-indigo-100/20"
              onError={(e) => {
                e.target.src = "https://i.ibb.co/2YjNZ3t/user.png";
              }}
            />
          </div>

          <div className="flex-1 text-center md:text-left mb-2">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-3">
              {currentUser?.displayName || user?.displayName}
              <BadgeCheck className="text-blue-500 w-6 h-6" />
            </h1>
            <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-500">
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full text-sm border border-slate-100">
                <Mail size={14} className="text-indigo-400" />
                {user?.email}
              </span>
              <span
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border capitalize ${roleColors[currentUser?.role] || roleColors.user}`}
              >
                <Shield size={14} />
                {currentUser?.role || "User"}
              </span>
            </div>
          </div>

          <div className="md:mb-2 self-center md:self-end">
            <button
              onClick={() => {
                reset({
                  displayName:
                    currentUser?.displayName || user?.displayName || "",
                  photoURL: currentUser?.photoURL || user?.photoURL || "",
                });
                setIsModalOpen(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-indigo-200 shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <Edit size={18} />
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[1000] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-slate-50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-2xl font-black text-gray-900">
                Update Identity
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white rounded-full transition-colors font-bold"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="p-8 space-y-6"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">
                  Display Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    {...register("displayName", { required: true })}
                    type="text"
                    placeholder="Your full name"
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold placeholder:font-normal"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">
                  Photo URL
                </label>
                <div className="relative">
                  <Camera
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    {...register("photoURL", { required: true })}
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold placeholder:font-normal"
                  />
                </div>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-3xl shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Save size={18} />
                )}
                Save Profile Details
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Stats Quick View (For Members/Admins) */}
      {isAgreementUser && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Building size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Apartments
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {agreements.length}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Banknote size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total Rent
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {agreements.reduce((acc, curr) => acc + (curr.rent || 0), 0)} TK
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Latest Status
              </p>
              <p className="text-lg font-bold text-gray-800 capitalize">
                {agreements[0]?.status || "No Active Status"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Agreement Section */}
      {isAgreementUser ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Briefcase className="text-indigo-600" />
              {currentUser?.role === "admin"
                ? "Assigned Properties"
                : "My Rental Agreements"}
            </h3>
            <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
              {agreements.length} Total
            </span>
          </div>

          {agreements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 focus-within:ring-0">
              {agreements.map((agreement) => (
                <div
                  key={agreement._id}
                  className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
                        <Building size={20} />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          agreement.status === "checked"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {agreement.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 leading-tight">
                        Apartment {agreement.apartmentNo}
                      </h4>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2.5 text-gray-500">
                          <MapPin size={16} className="text-indigo-400" />
                          <span className="text-sm font-medium">
                            Block: {agreement.blockName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-gray-500">
                          <Layers size={16} className="text-indigo-400" />
                          <span className="text-sm font-medium">
                            Floor: {agreement.floorNo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-gray-500">
                          <Banknote size={16} className="text-indigo-400" />
                          <span className="text-sm font-bold text-indigo-600">
                            {agreement.rent} TK/mo
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-gray-500">
                          <Calendar size={16} className="text-indigo-400" />
                          <span className="text-sm font-medium">
                            {new Date(agreement.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center space-y-4">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Briefcase size={32} />
              </div>
              <p className="text-gray-500 font-medium">
                No active agreements found.
              </p>
              <NavLink
                to="/apartmentList"
                className="text-indigo-600 font-semibold text-sm hover:underline"
              >
                Explore Apartments
              </NavLink>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 space-y-4">
          <h3 className="text-xl font-bold text-indigo-900">Become a Member</h3>
          <p className="text-indigo-700/80 leading-relaxed">
            Unlock the full potential of Domexis by applying for an apartment.
            Once approved, your agreements and billing history will appear here.
          </p>
          <NavLink
            to="/apartmentList"
            className="inline-block bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold shadow-sm hover:shadow-md transition-all"
          >
            Browse Available Listings
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
