import { useForm } from "react-hook-form";
import { useLocation, Link, useNavigate } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxios from "../../../hooks/useAxios";
import { motion as Motion } from "framer-motion";
import { FaBuilding, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import AuthBackground from "../AuthBackground";

const Login = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";
  const { signIn } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(async (res) => {
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        await axiosInstance.post("/users", userInfo);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen mesh-bg py-20 px-4 flex items-center justify-center relative overflow-hidden">
      <AuthBackground />

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
              Elite <br />
              <span className="text-blue-500 not-italic">Identity.</span>
            </Motion.h1>
            
            <div className="space-y-6">
              {[
                { title: "Resident Portal", desc: "Your personal building dashboard" },
                { title: "Priority Support", desc: "Instant concierge connectivity" },
                { title: "Smart Pass", desc: "Digital keys & secure access" }
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
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Secure Auth v2.1</p>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">System Live</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-7/12 p-10 md:p-14 bg-white/30">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-slate-900 mb-1">Member Access</h3>
            <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Gateway Authentication</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="space-y-2 group"
            >
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Access Email</label>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-slate-200 group-focus-within:h-8 group-focus-within:bg-blue-600 transition-all duration-300"></div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-7 py-4 bg-slate-50/50 border border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-hidden transition-all font-bold text-slate-700 placeholder:text-slate-300"
                  placeholder="name@domexis.com"
                />
              </div>
            </Motion.div>

            <Motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.7 }}
               className="space-y-2 group"
            >
              <div className="flex justify-between items-center ml-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Security Key</label>
                <Link to="#" className="text-[9px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest hover:underline underline-offset-4">Reset Key</Link>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-slate-200 group-focus-within:h-8 group-focus-within:bg-blue-600 transition-all duration-300"></div>
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  className="w-full px-7 py-4 bg-slate-50/50 border border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-hidden transition-all font-bold text-slate-700 placeholder:text-slate-300"
                  placeholder="••••••••"
                />
              </div>
            </Motion.div>

            <Motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-full py-5 bg-slate-900 text-white font-black rounded-[1.25rem] hover:bg-blue-600 shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
            >
              Access Portal
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </Motion.button>
          </form>

          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="relative my-10 flex items-center"
          >
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">External Access</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </Motion.div>

          <Motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.0 }}
          >
            <SocialLogin />
          </Motion.div>

          <Motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center mt-10 text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            New resident? 
            <Link to="/register" className="ml-2 text-blue-600 hover:text-blue-700 underline decoration-blue-100 decoration-2 underline-offset-4 transition-colors">
               Apply for Account
            </Link>
          </Motion.p>
        </div>
      </Motion.div>
    </div>
  );
};

export default Login;
