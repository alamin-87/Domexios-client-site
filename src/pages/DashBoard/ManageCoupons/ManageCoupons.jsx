import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DomexisLogo from "../../shared/domexisLogo/DomexisLogo";
import {
  Ticket,
  Plus,
  Trash2,
  Settings,
  Zap,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Scissors,
  Tag,
  Clock,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editCoupon, setEditCoupon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    validTill: "",
    type: "",
    status: "active",
    discount: "",
    discountType: "percentage",
  });

  // Correctly access data from server object { coupons, total }
  const { data, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons?limit=100"); // Getting a larger set for management
      return res.data;
    },
  });

  const coupons = data?.coupons || [];
  const totalCount = data?.total || 0;

  const createCoupon = useMutation({
    mutationFn: async (newCoupon) => {
      const res = await axiosSecure.post("/coupons", newCoupon);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Coupon created successfully!");
      queryClient.invalidateQueries(["coupons"]);
      setShowModal(false);
      resetForm();
    },
  });

  const updateCoupon = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosSecure.put(`/coupons/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Coupon updated successfully!");
      queryClient.invalidateQueries(["coupons"]);
      setEditCoupon(null);
      setShowModal(false);
      resetForm();
    },
  });

  const deleteCoupon = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/coupons/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "The coupon has been removed.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["coupons"]);
    },
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      code: "",
      validTill: "",
      type: "",
      status: "active",
      discount: "",
      discountType: "percentage",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (editCoupon) {
      delete payload._id;
      updateCoupon.mutate({ id: editCoupon._id, data: payload });
    } else {
      createCoupon.mutate(payload);
    }
  };

  const handleEdit = (coupon) => {
    setEditCoupon(coupon);
    setForm({ ...coupon });
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Delete Coupon?",
      text: "Users will no longer be able to use this code.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, Remove",
      borderRadius: "1rem",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCoupon.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Ticket className="text-indigo-600" />
            Promo Management
          </h2>
          <p className="text-gray-500 mt-1">
            Create and manage discount vouchers for building residents.
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95 text-sm md:text-base"
          onClick={() => {
            setEditCoupon(null);
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus size={20} />
          Create New Coupon
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Total Coupons
            </p>
            <p className="text-2xl font-black text-gray-800">{totalCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Active
            </p>
            <p className="text-2xl font-black text-gray-800">
              {coupons.length}
            </p>
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      {coupons.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-dashed border-gray-200 text-center">
          <Ticket size={64} className="mx-auto text-slate-200 mb-6" />
          <h3 className="text-xl font-bold text-gray-400">No Active Coupons</h3>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Start by creating your first promotional offer.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Scissors Line Effect */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-100 mx-4 z-0"></div>
              <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50/50 rounded-full border border-gray-100 z-10"></div>
              <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50/50 rounded-full border border-gray-100 z-10"></div>

              <div className="p-6 pb-1 relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {coupon.code}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                      {coupon.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-indigo-600 leading-none">
                      {coupon.discount}
                      <span className="text-lg font-bold ml-0.5">
                        {coupon.discountType === "percentage" ? "%" : "TK"}
                      </span>
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                      OFF
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500 leading-relaxed min-h-[40px]">
                  {coupon.description}
                </p>
              </div>

              <div className="p-6 pt-5 relative z-10 flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                    <Clock size={12} />
                    Valid:{" "}
                    {coupon.validTill
                      ? new Date(coupon.validTill).toLocaleDateString()
                      : "Infinite"}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold capitalize">
                    <Tag size={12} />
                    Category: {coupon.type || "General"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="p-3 bg-amber-50 text-amber-600 rounded-2xl hover:bg-amber-600 hover:text-white transition-all transform active:scale-95 shadow-sm"
                  >
                    <Settings size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(coupon._id)}
                    className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all transform active:scale-95 shadow-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Premium Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[1000] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-slate-50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight">
                  {editCoupon ? "Refine Promo" : "Forge Coupon"}
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-bold uppercase tracking-widest">
                  Domexis Premium Access
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-white rounded-full border border-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Voucher Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Summer Special"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-gray-300 font-bold"
                    value={form.title || ""}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    placeholder="SUMMER50"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-gray-300 font-mono font-bold uppercase"
                    value={form.code || ""}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Discount Value
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="50"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-gray-300 font-bold"
                      value={form.discount || ""}
                      onChange={(e) =>
                        setForm({ ...form, discount: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Type
                  </label>
                  <select
                    className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold appearance-none cursor-pointer"
                    value={form.discountType || "percentage"}
                    onChange={(e) =>
                      setForm({ ...form, discountType: e.target.value })
                    }
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat (TK)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold cursor-pointer"
                    value={form.validTill || ""}
                    onChange={(e) =>
                      setForm({ ...form, validTill: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Short description for the user..."
                    className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium min-h-[80px]"
                    value={form.description || ""}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-3xl shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {editCoupon ? <Zap size={18} /> : <Plus size={18} />}
                  {editCoupon ? "Sync Changes" : "Create Master Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
