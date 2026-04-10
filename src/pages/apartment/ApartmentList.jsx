import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { motion as Motion, AnimatePresence } from "framer-motion";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";
import { FaSearch, FaFilter, FaBed, FaArrowRight, FaCity, FaShieldAlt, FaParking, FaWifi } from "react-icons/fa";

const ApartmentList = () => {
  const axiosInstance = useAxios();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [minRent, setMinRent] = useState(0);
  const [maxRent, setMaxRent] = useState(99999);
  const itemsPerPage = 6;

  const [selectedApartment, setSelectedApartment] = useState(null);
  const [allAgreements, setAllAgreements] = useState([]);

  useEffect(() => {
    fetchAllAgreements();
  }, [user]);

  const fetchAllAgreements = async () => {
    try {
      const res = await axiosSecure.get("/agreements");
      setAllAgreements(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const {
    data: apartments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["apartments", minRent, maxRent],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/apartment?min=${minRent}&max=${maxRent}`
      );
      return res.data;
    },
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedApartments = apartments.slice(
    startIdx,
    startIdx + itemsPerPage
  );
  const totalPages = Math.ceil(apartments.length / itemsPerPage);

  const getAgreementByApartment = (apartmentNo) =>
    allAgreements.find((ag) => ag.apartmentNo === apartmentNo);

  const openAgreementModal = (apartment) => {
    if (!user) return navigate("/login");
    setSelectedApartment(apartment);
    document.getElementById("agreement_modal").showModal();
  };

  const confirmAgreement = async () => {
    if (!selectedApartment || !user) return;

    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      apartmentNo: selectedApartment.apartmentNo,
      floorNo: selectedApartment.floorNo,
      blockName: selectedApartment.blockName,
      rent: selectedApartment.rent,
      status: "pending",
      agreement: "requested",
    };

    try {
      const res = await axiosSecure.post("/agreements", agreementData);
      if (res.data.insertedId) {
        await fetchAllAgreements();
        document.getElementById("agreement_modal").close();
      }
    } catch (error) {
      console.error("Agreement error:", error);
    }
  };

  const handleCancel = async (agreementId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this agreement?");
    if (!confirmed) return;

    try {
      const res = await axiosSecure.delete(`/agreements/${agreementId}`);
      if (res.data.deletedCount > 0) {
        await fetchAllAgreements();
      }
    } catch (error) {
      console.error("Cancel error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1545324418-f1d3ac1ef38a?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover opacity-40" 
            alt="Hero"
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/50 via-transparent to-white"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-black tracking-widest uppercase mb-6"
          >
            Luxury Real Estate
          </Motion.span>
          <Motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl"
          >
            Find Your Next <br />
            <span className="text-blue-500 italic">Signature</span> Home
          </Motion.h1>
          
          <Motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col md:flex-row gap-4 items-center"
          >
            <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <FaSearch className="text-slate-400" />
              <input 
                type="number" 
                placeholder="Min Rent" 
                className="w-full outline-hidden font-bold text-slate-700 bg-transparent placeholder:text-slate-400"
                onChange={(e) => setMinRent(e.target.value)}
              />
            </div>
            <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <FaFilter className="text-slate-400" />
              <input 
                type="number" 
                placeholder="Max Rent" 
                className="w-full outline-hidden font-bold text-slate-700 bg-transparent placeholder:text-slate-400"
                onChange={(e) => setMaxRent(e.target.value)}
              />
            </div>
            <button 
              onClick={() => refetch()}
              className="w-full md:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl transition-all duration-300 shadow-lg shadow-blue-300 flex items-center justify-center gap-2"
            >
              Search Units
            </button>
          </Motion.div>
        </div>
      </section>

      {/* 2. Main Listing Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Available Residences</h2>
            <p className="text-slate-500 text-lg">
              Each floor at Domexis is meticulously designed to maximize space and natural light.
            </p>
          </div>
          <p className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
            Showing {paginatedApartments.length} of {apartments.length} Units
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="flex justify-center py-24">
              <div className="loading loading-spinner loading-lg text-blue-600"></div>
            </div>
          ) : (
            <Motion.div 
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
            >
              {paginatedApartments.map((apt, index) => {
                const agreement = getAgreementByApartment(apt.apartmentNo);
                const isUserOwner = agreement?.userEmail === user?.email;

                return (
                  <Motion.div
                    key={apt.apartmentNo}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={apt.image}
                        alt={apt.apartmentNo}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 px-4 py-2 glass rounded-full text-blue-900 font-black text-sm shadow-xl">
                        Floor {apt.floorNo}
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900">Unit {apt.apartmentNo}</h3>
                          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{apt.blockName} Block</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-black text-blue-600 leading-none">${apt.rent}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Per Month</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mb-8 py-4 border-y border-slate-50">
                        <div className="flex items-center gap-2 text-slate-600">
                          <FaBed className="text-blue-500" />
                          <span className="text-sm font-bold">2 Bed</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <FaCity className="text-blue-500" />
                          <span className="text-sm font-bold">City View</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        {!agreement ? (
                          <button
                            onClick={() => openAgreementModal(apt)}
                            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-3 group"
                          >
                            Rent This Unit
                            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                          </button>
                        ) : isUserOwner ? (
                          <button
                            onClick={() => handleCancel(agreement._id)}
                            className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all duration-300"
                          >
                            Cancel Request
                          </button>
                        ) : (
                          <div className="w-full py-5 bg-green-50 text-green-600 text-center font-black rounded-2xl border border-green-100 flex items-center justify-center gap-2">
                             Occupied
                          </div>
                        )}
                      </div>
                    </div>
                  </Motion.div>
                );
              })}
            </Motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center gap-3">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                className={`w-12 h-12 rounded-full font-black transition-all duration-300 ${
                  currentPage === page + 1 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "bg-white text-slate-400 border border-slate-100 hover:border-blue-200"
                }`}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 3. New Section: Resident Perks */}
      <section className="py-24 bg-slate-50 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">Standard for All Units</h2>
            <p className="text-slate-500 mt-4">Elevating your standard of living with these universal inclusions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <FaShieldAlt />, title: "24/7 Patrol", desc: "Dedicated security team for every block." },
              { icon: <FaWifi />, title: "Fiber Internet", desc: "Pre-installed giga-speed connectivity." },
              { icon: <FaParking />, title: "Assigned Spot", desc: "One dedicated slot per apartment." },
              { icon: <FaCity />, title: "Trash Pickup", desc: "Daily maintenance and waste removal." }
            ].map((p, i) => (
              <Motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-[2rem] border border-slate-100 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                  {p.icon}
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-3">{p.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{p.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. New Section: Book a Viewing CTA */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-950 rounded-[3rem] p-12 md:p-24 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Want to see it <br />
                  <span className="text-blue-500">In Person?</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  Schedule a private tour with our estate managers to experience the 
                  Domexis lifestyle firsthand. Weekend slots are limited.
                </p>
                <button className="px-12 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl">
                  Book Private Tour
                </button>
              </div>
              <div className="w-full md:w-1/3">
                 <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-sm">
                   <div className="flex gap-4 mb-6">
                     <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">SM</div>
                     <div>
                       <p className="text-white font-bold leading-none">Sarah Miller</p>
                       <p className="text-xs text-slate-500 mt-1">Property Manager</p>
                     </div>
                   </div>
                   <p className="text-slate-300 text-sm leading-relaxed italic">
                     "I'd be delighted to show you the penthouse views or the 
                     community lounge. We have slots open this Saturday."
                   </p>
                 </div>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Agreement Modal */}
      <dialog id="agreement_modal" className="modal backdrop-blur-md">
        <div className="modal-box rounded-[2.5rem] p-10 max-w-lg border-none">
          <Motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8">
              <FaCity />
            </div>
            <h3 className="font-black text-3xl text-slate-900 mb-2">
              Confirm Agreement
            </h3>
            <p className="text-slate-500 mb-8 font-medium">Please review the unit details before confirming your lease request.</p>
            
            {selectedApartment && (
              <div className="space-y-4 mb-10 text-left bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400 uppercase text-xs">Unit</span>
                  <span className="font-black text-slate-900">{selectedApartment.apartmentNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400 uppercase text-xs">Floor / Block</span>
                  <span className="font-black text-slate-900">{selectedApartment.floorNo} / {selectedApartment.blockName}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-4">
                  <span className="font-bold text-slate-400 uppercase text-xs">Monthly Rent</span>
                  <span className="font-black text-blue-600 text-xl">${selectedApartment.rent}</span>
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-4">
              <button onClick={confirmAgreement} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200">
                Confirm Lease Request
              </button>
              <form method="dialog">
                <button className="w-full py-4 text-slate-400 font-bold hover:text-slate-600">
                  Go Back
                </button>
              </form>
            </div>
          </Motion.div>
        </div>
      </dialog>
    </div>
  );
};

export default ApartmentList;
