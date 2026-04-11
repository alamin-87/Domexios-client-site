import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import DomexisLogo from "../domexisLogo/DomexisLogo";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="brightness-0 invert w-max">
                <DomexisLogo />
            </div>
            <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-xs">
              Redefining intelligent residential living. Domexis is the premium architectural management system for modern communities.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-all shadow-xl hover:shadow-indigo-500/20">
                <FaLinkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-all shadow-xl hover:shadow-indigo-500/20">
                <FaTwitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-rose-600 hover:text-white transition-all shadow-xl hover:shadow-rose-500/20">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-lg">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Apartments', 'About', 'Lifestyle', 'Gallery', 'Support', 'Contact', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : item === 'Apartments' ? '/apartmentList' : item === 'Lifestyle' ? '/amenities' : `/${item.toLowerCase()}`}
                    className="text-slate-400 font-bold hover:text-indigo-400 transition-colors flex items-center gap-2 group w-max"
                  >
                    <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Aux */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-lg">Legal Base</h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Cookie Declaration', path: '/cookies' },
                { name: 'Residency Rules', path: '/rules' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-400 font-bold hover:text-indigo-400 transition-colors flex items-center gap-2 group w-max">
                    <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-lg">Secure Contact</h4>
            <div className="space-y-4">
               <div className="flex items-start gap-4 text-slate-400">
                  <div className="bg-white/5 p-2 rounded-lg text-indigo-400"><MapPin size={18} /></div>
                  <p className="font-medium text-sm leading-relaxed">Suite 500, Domexis Plaza<br/>Dhaka, BD - 1205</p>
               </div>
               <div className="flex items-center gap-4 text-slate-400">
                  <div className="bg-white/5 p-2 rounded-lg text-emerald-400"><Phone size={18} /></div>
                  <p className="font-bold text-sm tracking-widest">+880 1712-345678</p>
               </div>
               <div className="flex items-center gap-4 text-slate-400">
                  <div className="bg-white/5 p-2 rounded-lg text-rose-400"><Mail size={18} /></div>
                  <p className="font-bold text-sm">support@domexis-res.com</p>
               </div>
            </div>
          </div>

        </div>
        
        {/* Deep Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 space-y-4 md:space-y-0">
           <p className="text-slate-500 text-xs font-black uppercase tracking-widest">
             © {new Date().getFullYear()} Domexis Infrastructure. All Rights Reserved.
           </p>
           <div className="flex gap-4">
              <span className="text-slate-600 text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Secure SSL</span>
              <span className="text-slate-600 text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">System Active</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
