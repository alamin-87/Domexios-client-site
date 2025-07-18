import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const Announcements = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: announcements = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    Swal.fire("Error", error.message || "Failed to load announcements", "error");
    return (
      <div className="text-center text-red-600 mt-4">
        Failed to load announcements.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md mt-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Announcements</h2>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-500">No announcements found.</p>
      ) : (
        <div className="space-y-6">
          {announcements.map(({ _id, title, description, createdAt }) => (
            <div
              key={_id}
              className="border border-gray-200 rounded-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-700 whitespace-pre-line mb-3">{description}</p>
              <p className="text-sm text-gray-400 italic">
                Posted on: {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
