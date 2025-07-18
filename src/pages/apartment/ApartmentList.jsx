import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";

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
    AOS.init({ duration: 1000, once: true });
    fetchAllAgreements();
  }, [user]);

  // Fetch all agreements (for all users)
  const fetchAllAgreements = async () => {
    const res = await axiosSecure.get("/agreements");
    setAllAgreements(res.data || []);
  };

  // Fetch apartments filtered by rent (no filtering by agreements here)
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

  // Pagination
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedApartments = apartments.slice(
    startIdx,
    startIdx + itemsPerPage
  );
  const totalPages = Math.ceil(apartments.length / itemsPerPage);

  // Find agreement for an apartment (any user)
  const getAgreementByApartment = (apartmentNo) =>
    allAgreements.find((ag) => ag.apartmentNo === apartmentNo);

  // Modal open for agreement confirmation
  const openAgreementModal = (apartment) => {
    if (!user) return navigate("/login");
    setSelectedApartment(apartment);
    document.getElementById("agreement_modal").showModal();
  };

  // Confirm agreement creation - only add new document to agreements collection
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
        alert("Agreement requested!");
        await fetchAllAgreements();  // refresh agreements
        document.getElementById("agreement_modal").close();
      }
    } catch (error) {
      console.error("Agreement error:", error);
    }
  };

  // Cancel agreement for this user - update/delete only agreement collection
  const handleCancel = async (agreementId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this agreement?");
    if (!confirmed) return;

    try {
      const res = await axiosSecure.delete(`/agreements/${agreementId}`);
      if (res.data.deletedCount > 0) {
        alert("Agreement cancelled.");
        await fetchAllAgreements();
      }
    } catch (error) {
      console.error("Cancel error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2
        className="text-4xl font-bold text-center mb-10 text-gray-800"
        data-aos="fade-down"
      >
        Explore Our Apartments
      </h2>

      {/* Rent Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10" data-aos="fade-up">
        <input
          type="number"
          className="input input-bordered w-32"
          placeholder="Min Rent"
          onChange={(e) => setMinRent(e.target.value)}
        />
        <input
          type="number"
          className="input input-bordered w-32"
          placeholder="Max Rent"
          onChange={(e) => setMaxRent(e.target.value)}
        />
        <button className="btn btn-accent" onClick={() => refetch()}>
          Filter
        </button>
      </div>

      {/* Apartments List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {paginatedApartments.map((apt, index) => {
          const agreement = getAgreementByApartment(apt.apartmentNo);
          const isUserOwner = agreement?.userEmail === user?.email;

          return (
            <div
              key={apt.apartmentNo}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={apt.image}
                alt={apt.apartmentNo}
                className="rounded-xl mb-4 w-full h-48 object-cover"
              />
              <div className="space-y-1 text-gray-700">
                <h3 className="text-lg font-bold text-blue-700">
                  Apartment {apt.apartmentNo}
                </h3>
                <p>Floor: {apt.floorNo}</p>
                <p>Block: {apt.blockName}</p>
                <p className="font-semibold">Rent: ${apt.rent}</p>
              </div>

              {/* Buttons */}
              {!agreement ? (
                <button
                  onClick={() => openAgreementModal(apt)}
                  className="btn btn-primary mt-4 w-full"
                >
                  Make Agreement
                </button>
              ) : isUserOwner ? (
                <button
                  onClick={() => handleCancel(agreement._id)}
                  className="btn btn-warning mt-4 w-full"
                >
                  Cancel Agreement
                </button>
              ) : (
                <button disabled className="btn btn-success mt-4 w-full">
                  Agreement Done
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-2" data-aos="fade-up">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${currentPage === page + 1 ? "btn-primary" : "btn-outline"}`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      </div>

      {/* Agreement Modal */}
      <dialog id="agreement_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-blue-600">
            Confirm Apartment Agreement
          </h3>
          {selectedApartment && (
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p><strong>Apartment No:</strong> {selectedApartment.apartmentNo}</p>
              <p><strong>Block:</strong> {selectedApartment.blockName}</p>
              <p><strong>Floor:</strong> {selectedApartment.floorNo}</p>
              <p><strong>Rent:</strong> ${selectedApartment.rent}</p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline mr-3">Cancel</button>
            </form>
            <button onClick={confirmAgreement} className="btn btn-primary">
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApartmentList;
