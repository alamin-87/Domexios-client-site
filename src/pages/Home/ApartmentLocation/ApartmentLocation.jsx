import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

  return (
    <section className="py-16 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-800">
            Apartment Location & Directions
          </h2>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our prime location in Dubai Marina — the heart of luxury
            living in the UAE.
          </p>
        </div>

        {/* Content Row */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Map */}
          <div
            className="w-full lg:w-1/2 rounded-xl shadow-lg overflow-hidden border border-gray-200"
            style={{ minHeight: "400px" }}
          >
            <MapContainer
              center={position}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "400px", width: "100%" }} // Fixed height here
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  Your Smart 30-Floor Residential Tower <br /> Dubai Marina, UAE
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Directions */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              How to Get There
            </h3>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Our building is situated in Dubai Marina, one of the most prestigious neighborhoods in UAE, known for its stunning waterfront views and vibrant lifestyle.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Easily accessible by car via Sheikh Zayed Road with ample parking available. Public transport options include Dubai Metro’s DMCC station just a 10-minute walk away, and several bus routes serve the area.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              For visitors arriving via Dubai International Airport (DXB), it's approximately a 30-minute drive using the Dubai Metro or taxis.
            </p>
            <a
              href="https://www.google.com/maps/place/Dubai+Marina/@25.0805,55.1382,15z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              aria-label="Open location in Google Maps"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApartmentLocation;
