import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";


const ManageCoupons = () => {
  const axiosSecure = UseAxiosSecure();
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

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const createCoupon = useMutation({
    mutationFn: async (newCoupon) => {
      const res = await axiosSecure.post("/coupons", newCoupon);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Coupon created!");
      queryClient.invalidateQueries(["coupons"]);
      setShowModal(false);
      setForm({});
    },
  });

  const updateCoupon = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosSecure.put(`/coupons/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Coupon updated!");
      queryClient.invalidateQueries(["coupons"]);
      setEditCoupon(null);
      setShowModal(false);
    },
  });

  const deleteCoupon = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/coupons/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Coupon deleted!");
      queryClient.invalidateQueries(["coupons"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (editCoupon) {
      delete payload._id; // 🚫 Remove _id before update
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

  return (
    <div className="p-4">
      <button
        className="btn btn-primary mb-4"
        onClick={() => {
          setEditCoupon(null);
          setForm({});
          setShowModal(true);
        }}
      >
        Add Coupon
      </button>

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="card shadow p-4 border space-y-2">
            <h2 className="text-xl font-semibold">{coupon.title}</h2>
            <p>{coupon.description}</p>
            <p>
              <strong>Code:</strong> {coupon.code}
            </p>
            <p>
              <strong>Discount:</strong> {coupon.discount}
              {coupon.discountType === "percentage" ? "%" : ""}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-sm btn-warning"
                onClick={() => handleEdit(coupon)}
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => deleteCoupon.mutate(coupon._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl mb-4">
              {editCoupon ? "Update Coupon" : "Add Coupon"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                className="input input-bordered w-full"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Code"
                className="input input-bordered w-full"
                value={form.code || ""}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                required
              />
              <input
                type="date"
                className="input input-bordered w-full"
                value={form.validTill || ""}
                onChange={(e) =>
                  setForm({ ...form, validTill: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Type"
                className="input input-bordered w-full"
                value={form.type || ""}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
              <input
                type="number"
                placeholder="Discount"
                className="input input-bordered w-full"
                value={form.discount || ""}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                required
              />
              <select
                className="select select-bordered w-full"
                value={form.discountType || "percentage"}
                onChange={(e) =>
                  setForm({ ...form, discountType: e.target.value })
                }
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editCoupon ? "Update" : "Add"}
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
