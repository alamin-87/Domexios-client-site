import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion as Motion } from "framer-motion";
import { FaMapMarkerAlt, FaCar, FaTrain, FaPlane, FaExternalLinkAlt } from "react-icons/fa";

// Fix Leaflet icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ApartmentLocation = () => {
  // Coordinates for Dubai Marina, UAE
  const position = [25.0805, 55.1382];

  const directions = [
    { icon: <FaCar className="text-blue-500" />, title: "By Car", desc: "Easy access via Sheikh Zayed Road with dedicated basement parking." },
    { icon: <FaTrain className="text-emerald-500" />, title: "By Metro", desc: "10-minute walk from DMCC station (Red Line)." },
    { icon: <FaPlane className="text-orange-500" />, title: "By Air", desc: "30-minute drive from Dubai International Airport (DXB)." },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <Motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Connectivity</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
            Prime Location
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
            Strategically located in the heart of Dubai Marina, offering unparalleled access to the city's best attractions.
          </p>
        </Motion.div>

        {/* Content Row */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Map */}
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-white ring-1 ring-slate-200"
            style={{ minHeight: "450px" }}
          >
            <MapContainer
              center={position}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "450px", width: "100%", zIndex: 1 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup className="custom-popup">
                  <div className="font-bold text-blue-600">Domexis Tower</div>
                  <div className="text-xs text-slate-500">Luxury Living @ Dubai Marina</div>
                </Popup>
              </Marker>
            </MapContainer>
          </Motion.div>

          {/* Directions */}
          <Motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              How to Get Here
            </h3>
            
            <div className="space-y-8 mb-10">
              {directions.map((dir, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {dir.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1">{dir.title}</h4>
                    <p className="text-slate-500 leading-relaxed">{dir.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.google.com/maps/place/Dubai+Marina/@25.0805,55.1382,15z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-colors"
            >
              Get Directions <FaExternalLinkAlt className="text-sm" />
            </Motion.a>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};


export default ApartmentLocation;

