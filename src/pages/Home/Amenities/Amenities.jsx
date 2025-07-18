import React from "react";
import { FaDumbbell, FaParking, FaShieldAlt, FaLeaf, FaWifi } from "react-icons/fa";

const amenities = [
  { icon: <FaDumbbell className="text-4xl text-blue-600" />, title: "Modern Gym" },
  { icon: <FaLeaf className="text-4xl text-green-500" />, title: "Rooftop Garden" },
  { icon: <FaParking className="text-4xl text-gray-700" />, title: "Dedicated Parking" },
  { icon: <FaShieldAlt className="text-4xl text-red-600" />, title: "24/7 Security" },
  { icon: <FaWifi className="text-4xl text-purple-600" />, title: "High-Speed Internet" },
];

const Amenities = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 
          className="text-4xl font-extrabold text-gray-800 mb-8"
          data-aos="fade-down"
        >
          Amenities & Facilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {amenities.map(({ icon, title }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center space-y-4 p-6 bg-slate-50 rounded-lg shadow hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {icon}
              <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
