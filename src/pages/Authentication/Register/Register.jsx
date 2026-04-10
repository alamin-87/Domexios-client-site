import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import UseAuth from "../../../hooks/UseAuth";
import useAxios from "../../../hooks/useAxios";
import { motion as Motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaSpinner, FaArrowRight } from "react-icons/fa";
import AuthBackground from "../AuthBackground";

const Register = () => {
  const { createUser, updateUserProfile } = UseAuth();
  const [profilePic, setProfilePic] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (isUploading) return;
    
    createUser(data.email, data.password)
      .then(async (result) => {
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        await axiosInstance.post("/users", userInfo);

        const userProfile = {
          displayName: data.name,
          photoURL: profilePic || "https://i.ibb.co/vzYFr6p/avatar.png",
        };

        updateUserProfile(userProfile)
          .then(() => {
            navigate("/login");
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => console.error(error));
  };

  const handelImgUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD}`,
        formData
      );
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg py-12 px-4 flex items-center justify-center relative overflow-hidden">
      <AuthBackground />

      {/* Decorative Elements (keep some subtle ones if needed, otherwise remove) */}

      <Motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 flex flex-col lg:flex-row relative z-10"
      >
        {/* Left Side: Boutique Branding (Unified) */}
        <div className="lg:w-5/12 p-12 relative overflow-hidden flex flex-col border-b lg:border-b-0 lg:border-r border-slate-100/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px]"></div>
          
          <Motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 mb-12"
          >
            <h2 className="text-2xl font-black tracking-tighter text-slate-900">DOMEXIS</h2>
            <div className="w-8 h-1 bg-blue-600 rounded-full mt-1"></div>
          </Motion.div>
          
          <div className="relative z-10 space-y-8">
            <Motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-black leading-tight italic text-slate-900"
            >
              Signature <br />
              <span className="text-blue-500 not-italic">Living.</span>
            </Motion.h1>
            
            <div className="space-y-6">
              {[
                { title: "Smart Ecosystem", desc: "Integrated home automation" },
                { title: "Elite Security", desc: "24/7 biometric monitoring" },
                { title: "Sky Amenities", desc: "Infinity pool & garden access" }
              ].map((item, i) => (
                <Motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  key={i} 
                  className="flex gap-4 items-start group cursor-default"
                >
                  <div className="w-1.5 h-10 bg-blue-600/5 group-hover:bg-blue-600 rounded-full transition-all duration-500"></div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>

          <div className="mt-auto relative z-10 pt-12 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Domexis Elite Management</p>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">System Live</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-7/12 p-10 md:p-14 bg-white/30">
          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <h3 className="text-2xl font-black text-slate-900 mb-1">Join the Elite</h3>
            <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Initialization Protocol</p>
          </Motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             {/* Avatar Section */}
             <Motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 mb-8 group"
             >
                <div className="relative">
                  <div className="w-20 h-20 bg-slate-50/50 backdrop-blur-md rounded-[2rem] border-2 border-slate-100 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-600/20 group-hover:bg-slate-100">
                    {isUploading ? (
                      <FaSpinner className="animate-spin text-blue-600" />
                    ) : profilePic ? (
                      <img src={profilePic} alt="PFP" className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="text-slate-200 text-2xl" />
                    )}
                  </div>
                  <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-600 transition-colors">
                    <FaCamera size={12} />
                    <input type="file" className="hidden" onChange={handelImgUpload} />
                  </label>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Profile Identity</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">Select your digital avatar</p>
                </div>
             </Motion.div>

             <div className="grid grid-cols-1 gap-5">
                {[
                  { id: "name", label: "Legal Name", type: "text", placeholder: "John Doe" },
                  { id: "email", label: "Email Port", type: "email", placeholder: "john@domexis.com" },
                  { id: "password", label: "Security Key", type: "password", placeholder: "••••••••" }
                ].map((field, index) => (
                  <Motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1) }}
                    key={field.id} 
                    className="space-y-2 group"
                  >
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">{field.label}</label>
                    <div className="relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-slate-200 group-focus-within:h-8 group-focus-within:bg-blue-600 transition-all duration-300"></div>
                      <input
                        type={field.type}
                        {...register(field.id, { required: true, minLength: field.id === "password" ? 6 : 0 })}
                        className="w-full px-7 py-4 bg-slate-50/50 border border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-hidden transition-all font-bold text-slate-700 placeholder:text-slate-300"
                        placeholder={field.placeholder}
                      />
                    </div>
                  </Motion.div>
                ))}
             </div>

             <Motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              disabled={isUploading}
              className="w-full py-5 bg-blue-600 text-white font-black rounded-[1.25rem] hover:bg-blue-700 shadow-2xl shadow-blue-100 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
             >
                Create Account
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
             </Motion.button>
          </form>

          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="relative my-10 flex items-center"
          >
            <div className="flex-grow border-t border-slate-50"></div>
            <span className="flex-shrink mx-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">External Gateway</span>
            <div className="flex-grow border-t border-slate-50"></div>
          </Motion.div>

          <Motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.2 }}
          >
            <SocialLogin />
          </Motion.div>

          <Motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-center mt-10 text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            Already a resident? 
            <Link to="/login" className="ml-2 text-blue-600 hover:text-blue-700 underline decoration-blue-100 decoration-2 underline-offset-4 transition-colors">
               Access Portal
            </Link>
          </Motion.p>
        </div>
      </Motion.div>
    </div>
  );
};

export default Register;
