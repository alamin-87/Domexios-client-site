import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const Coupons = () => {
  const axiosInstance = useAxios();

  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/coupons");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading coupons...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
          🎁 Member-Exclusive Coupons
        </h2>
        <p className="text-slate-600 mb-12 max-w-xl mx-auto">
          Take advantage of limited-time offers and perks just for you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white border border-slate-200 p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
              data-aos="zoom-in"
              data-aos-delay="150"
              data-aos-duration="800"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">{coupon.title}</h3>
              <p className="text-slate-600 mb-3">{coupon.description}</p>
              <div className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded font-mono text-sm mb-2">
                Code: {coupon.code}
              </div>
              <p className="text-sm text-slate-500">{coupon.validTill}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coupons;
