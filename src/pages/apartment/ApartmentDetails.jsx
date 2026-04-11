import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import {
  Share2,
  Heart,
  Bed,
  Bath,
  Maximize,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ThermometerSun,
  AlertCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ApartmentDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxios();

  const [isSaved, setIsSaved] = useState(false);

  const {
    data: apartment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["apartment", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/apartment/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner fullPage />;

  if (!apartment || error)
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <AlertCircle size={48} className="text-rose-500" />
        <h2 className="text-2xl font-black text-slate-900">Unit Not Found</h2>
        <button
          onClick={() => navigate("/apartmentList")}
          className="text-indigo-600 font-bold hover:underline"
        >
          Return to Listings
        </button>
      </div>
    );

  const requestLease = async () => {
    if (!user) return navigate("/login");
    // Logic for requesting lease (matches ApartmentList)
    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      apartmentNo: apartment.apartmentNo,
      floorNo: apartment.floorNo,
      blockName: apartment.blockName,
      rent: apartment.rent,
      status: "pending",
      agreement: "requested",
    };
    try {
      const res = await axiosSecure.post("/agreements", agreementData);
      if (res.data.insertedId) {
        alert("Lease Request Submitted Succesfully!");
        navigate("/dashboard/my-requests");
      }
    } catch (error) {
      console.error("Agreement error:", error);
      alert("This unit is already requested or unavailable.");
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Immersive Hero Gallery */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-16">
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[60vh]">
          <div className="w-full lg:w-2/3 h-[40vh] lg:h-full rounded-[2.5rem] overflow-hidden relative group">
            <img
              src={apartment.image}
              alt={`Unit ${apartment.apartmentNo}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/30">
              Available Now
            </div>
          </div>
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-4 h-[20vh] lg:h-full">
            <div className="flex-1 rounded-[2rem] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="living space"
              />
            </div>
            <div className="flex-1 rounded-[2rem] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover opacity-80"
                alt="kitchen"
              />
              <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                <span className="text-white font-black tracking-widest uppercase text-xs border-b border-white/50 pb-1 cursor-pointer">
                  View All Media
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Details Layout */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Col: Specs & Description */}
        <div className="lg:col-span-2 space-y-16">
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Penthouse Unit {apartment.apartmentNo}
                </h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                  <MapPin size={16} /> Block {apartment.blockName} • Floor{" "}
                  {apartment.floorNo}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                  <Share2 size={20} />
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${isSaved ? "border-rose-100 bg-rose-50 text-rose-500" : "border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100"}`}
                >
                  <Heart size={20} className={isSaved ? "fill-current" : ""} />
                </button>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="flex flex-wrap gap-4 py-6 border-y border-slate-100">
              {[
                { icon: Bed, val: "3 Bedrooms" },
                { icon: Bath, val: "2.5 Baths" },
                { icon: Maximize, val: "2,400 Sq Ft" },
                { icon: ThermometerSun, val: "Smart Climate" },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl"
                >
                  <spec.icon size={20} className="text-indigo-600" />
                  <span className="font-bold text-slate-700">{spec.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900">
              Architectural Overview
            </h3>
            <p className="text-slate-500 leading-relaxed font-medium text-lg">
              This immaculate residence has been fully upgraded to feature
              premium lifestyle enhancements and smart home integrations.
              Showcasing sprawling panoramic city views, high ceilings, and
              custom-imported flooring, it represents the absolute pinnacle of
              Domexis standard living. The layout is optimized for both serene
              privacy and dynamic entertaining.
            </p>
          </div>

          {/* Key Rules / Info */}
          <div className="bg-indigo-50/50 rounded-[3rem] p-10 border border-indigo-100/50">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <ShieldCheck className="text-indigo-600" /> Residency Mechanics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "No subletting permitted",
                "Comprehensive background check required",
                "Pet-friendly (Restrictions apply)",
                "Mandatory digital lock integration",
                "Biannual maintenance inspections",
                "Inclusive utility baseline",
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-indigo-500 shrink-0 mt-0.5"
                  />
                  <p className="text-slate-700 font-medium text-sm">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resident Feedback (Requirement) */}
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">
                Resident Feedback
              </h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span className="font-black text-amber-900 text-sm">
                  4.9 / 5.0
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  user: "Julian Marc",
                  date: "Jan 2024",
                  text: "Truly breathtaking views. The management team at Domexis is incredibly responsive to maintenance requests.",
                },
                {
                  user: "Elena Sofie",
                  date: "Dec 2023",
                  text: "The security features and digital locks give such peace of mind. Highly recommended for young professionals.",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="p-8 border border-slate-100 rounded-[2rem] space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-black text-slate-900">{review.user}</p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      {review.date}
                    </p>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Action & Pricing */}
        <div>
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white sticky top-32 shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="mb-8 border-b border-white/10 pb-8 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Monthly Lease
              </p>
              <h2 className="text-5xl font-black">${apartment.rent}</h2>
              <p className="text-slate-400 font-medium text-sm mt-2">
                Excluding standard admin & vetting fees.
              </p>
            </div>

            <div className="space-y-4 mb-8 pt-2 relative z-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">
                  Verification Fee
                </span>
                <span className="font-bold">$150</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">
                  Security Deposit
                </span>
                <span className="font-bold">1 Month Rent</span>
              </div>
            </div>

            <button
              onClick={requestLease}
              className="w-full py-5 bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/30 uppercase text-xs tracking-widest relative z-10"
            >
              Initiate Lease Request
            </button>

            <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest relative z-10 mt-6">
              Requires Background Approval
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Listings (Requirement) */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-32 border-t border-slate-100 pt-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h3 className="text-3xl font-black text-slate-900 italic">
              Similar{" "}
              <span className="text-indigo-600 not-italic">Residences</span>
            </h3>
            <p className="text-slate-400 font-medium mt-2">
              Alternative units within the Domexis architecture.
            </p>
          </div>
          <button
            onClick={() => navigate("/apartmentList")}
            className="px-6 py-2 border border-slate-200 rounded-full text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              no: "12C",
              block: "North",
              rent: 1450,
              img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
            },
            {
              no: "08A",
              block: "East",
              rent: 1200,
              img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
            },
            {
              no: "15B",
              block: "South",
              rent: 1800,
              img: "https://images.unsplash.com/photo-1554995207-c18c20360a59?auto=format&fit=crop&w=800&q=80",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.img}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  alt="suggested unit"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-black text-slate-900 tracking-tight">
                    Unit {item.no} • {item.block}
                  </h4>
                  <p className="font-black text-indigo-600">${item.rent}</p>
                </div>
                <button
                  onClick={() => navigate("/apartmentList")}
                  className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors"
                >
                  Explore Protocol <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetails;
