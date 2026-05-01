/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Users, User, MapPin } from "lucide-react";

export default function Hero({ isAr }: { isAr?: boolean }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50">
      <div className={`max-w-7xl mx-auto w-full px-10 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${isAr ? '' : 'lg:flex-row-reverse'}`}>
        {/* Text Content */}
        <motion.div
          initial={{ x: isAr ? 50 : -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`space-y-8 ${isAr ? 'text-right' : 'text-left lg:order-1'}`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold tracking-wider">
            {isAr ? "بوابة المعتمر والمنظم الذكية" : "Smart Portal for Pilgrims & Organizers"}
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900 mb-6 font-display">
            {isAr ? "سهولة في النسك،" : "Simplicity in Rituals,"}<br/>
            <span className="text-primary">{isAr ? "طمأنينة في الرحلة" : "Peace in the Journey"}</span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
            {isAr 
              ? "المنصة الأولى المتكاملة لخدمة ضيوف الرحمن، توفر للمعتمر تتبعاً دقيقاً لمجموعته وللمشرف إدارة احترافية ذكية لكل التفاصيل."
              : "The first integrated platform serving the guests of Allah, providing accurate group tracking for pilgrims and professional smart management for supervisors."
            }
          </p>
          
          <div className={`flex flex-wrap items-center gap-6 pt-4 ${isAr ? 'justify-end' : 'justify-start'}`}>
            <button className="btn-secondary px-10 py-4 border-slate-200 text-slate-900 hover:bg-slate-100 active:scale-95">
              {isAr ? "عرض خطط الاشتراك" : "View Subscription Plans"}
            </button>
            <button className="btn-primary px-10 py-4 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">
              {isAr ? "اشترك الآن" : "Sign Up Now"}
            </button>
          </div>
        </motion.div>

        {/* Feature Graphic */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative flex items-center justify-center"
        >
          {/* Main Square Frame */}
          <div className="relative w-80 h-80 rounded-[3rem] overflow-hidden border-8 border-white/20 shadow-2xl backdrop-blur-sm group">
            <img 
              src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 hover:scale-110"
              alt="Al-Masjid Al-Haram Square"
            />
          </div>

          {/* Floating Stat 1: Team */}
          <motion.div
            initial={{ x: 30, y: -30, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -top-10 -right-10 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4 z-20 min-w-[200px]"
          >
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold">فريق معتمرون</p>
              <p className="text-lg font-black text-slate-900">50+ خبير</p>
            </div>
          </motion.div>

          {/* Floating Stat 2: Supervisor */}
          <motion.div
            initial={{ x: -40, y: 20, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute -bottom-10 -left-16 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4 z-20 min-w-[220px]"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold">المشرف المسؤول</p>
              <p className="text-lg font-black text-slate-900">أ/ محمد ابراهيم</p>
            </div>
          </motion.div>

          {/* Floating Stat 3: Location */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute -bottom-20 right-10 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4 z-20"
          >
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold">الموقع الحالي</p>
              <p className="text-lg font-black text-slate-900">قرب الكعبة المشرفة</p>
            </div>
          </motion.div>

          {/* Decorative Rings */}
          <div className="absolute inset-0 -z-10 border-2 border-white/10 rounded-full scale-150 animate-pulse" />
          <div className="absolute inset-0 -z-10 border border-white/5 rounded-full scale-[2]" />
        </motion.div>
      </div>
    </section>
  );
}

