import React from "react";

const testimonials = [
  {
    name: "Sara Khan",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Living here has been an absolute pleasure. The building is beautiful, and the amenities are top-notch!",
  },
  {
    name: "Ahmed Al-Mansoori",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    text: "The location is unbeatable, and the management team is very responsive to all our needs.",
  },
  {
    name: "Fatima Ali",
    photo: "https://randomuser.me/api/portraits/women/30.jpg",
    text: "I love the rooftop garden — a perfect place to relax after work. Highly recommended apartments!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-tr from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12" data-aos="fade-down">
          What Our Residents Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map(({ name, photo, text }, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay={idx * 200} // stagger animations
            >
              <img
                src={photo}
                alt={`${name}'s portrait`}
                className="w-24 h-24 rounded-full object-cover mb-4"
                loading="lazy"
              />
              <p className="text-gray-700 italic mb-4">&ldquo;{text}&rdquo;</p>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
