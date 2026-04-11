import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
        }}
        className="h-[60vh] lg:h-[70vh] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="h-full w-full relative">
                <Motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: isActive ? 1 : 1.1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="h-full w-full bg-cover bg-center absolute inset-0"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                
                {/* Overlay with glassmorphism hint */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

                {/* Caption */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10 text-white">
                  <Motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={isActive ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
                  >
                    {slide.title.split(" ").map((word, i) => (
                      <span key={i} className={i === 1 ? "text-blue-400" : ""}>
                        {word}{" "}
                      </span>
                    ))}
                  </Motion.h1>
                  
                  <Motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={isActive ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-2xl max-w-2xl font-medium text-gray-200"
                  >
                    {slide.subtitle}
                  </Motion.p>

                  <Motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-10 flex gap-4"
                  >
                    <Link to="/apartmentList" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-500/30">
                      Explore Floors
                    </Link>
                    <Link to="/support" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-semibold transition-all backdrop-blur-md">
                      Resident Support
                    </Link>
                  </Motion.div>
                </div>
                
                {/* Visual Hint for next section */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <ChevronDown className="text-white/70" size={32} />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


export default Banner;

