import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",
      title: "Modern Living Spaces",
      subtitle: "Discover comfort and convenience in your building",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      title: "Smart Building Management",
      subtitle: "Control, security, and elegance in one place",
    },
    {
      image:
        "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1600&q=80",
      title: "Your Dream Apartment Awaits",
      subtitle: "Clean, safe, and beautifully designed homes",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        pagination={{ clickable: true }}
        className="h-[70vh] md:h-[85vh] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-opacity-50"></div>

              {/* Caption */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10 text-white">
                <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-4 animate-fade-in">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl drop-shadow animate-fade-in-slow">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
