import React from "react";
import buildingImg from "../../../assets/aboutBuilding.jpg";

const AboutBuilding = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-4xl font-extrabold text-slate-800">
            About the Building
          </h2>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover what makes our building exceptional for modern urban living.
          </p>
        </div>

        {/* Content Row */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="w-full lg:w-1/2" data-aos="fade-right" data-aos-duration="800">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              A Smart 30-Floor Residential Tower
            </h3>
            <p className="text-slate-700 leading-relaxed text-justify mb-4">
              Our building is a modern residential complex designed to offer
              comfortable and secure living for families and professionals alike.
              The 30-story tower houses a total of 120 spacious apartments — with
              4 elegantly designed units on each floor.
            </p>
            <p className="text-slate-700 leading-relaxed text-justify mb-4">
              Every apartment is equipped with smart technology, high-speed
              internet, round-the-clock security, and access to building amenities
              such as a gym, rooftop garden, and a dedicated parking area.
            </p>
            <div className="mt-6 flex gap-6" data-aos="zoom-in-up">
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-md text-center">
                <h4 className="text-3xl font-bold text-blue-600">30</h4>
                <p className="text-sm text-slate-600 mt-1">Floors</p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-md text-center">
                <h4 className="text-3xl font-bold text-blue-600">120</h4>
                <p className="text-sm text-slate-600 mt-1">Apartments</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2" data-aos="fade-left" data-aos-duration="800">
            <img
              src={buildingImg}
              alt="Building"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
