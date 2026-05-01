/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Navigation2, Search, Bell } from "lucide-react";

export default function MockupSection({ isAr }: { isAr?: boolean }) {
  const items = isAr ? [
    "تتبع جغرافي دقيق داخل وخارج الحرم",
    "نظام تنبيهات ذكي للطوارئ والتجمعات",
    "خرائط تفصيلية للمعالم والمشاعر المقدسة"
  ] : [
    "Precise GPS tracking inside/outside Haram",
    "Smart alerts for emergencies/gatherings",
    "Detailed maps for landmarks & holy sites"
  ];

  return (
    <section className="py-24 bg-surface-dark bg-slate-50 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${isAr ? '' : 'lg:flex-row-reverse'}`}>
          
          <div className={`flex-1 ${isAr ? 'text-right lg:order-last' : 'text-left'}`}>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              {isAr ? "نظام المعتمر" : "Pilgrim System"}<br />
              <span className="text-primary">{isAr ? "بوصلتك الرقمية" : "Your Digital Compass"}</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 font-medium">
              {isAr 
                ? "واجهة مستخدم مصممة بدقة لتكون واضحة حتى تحت أشعة الشمس، تساعدك على التركيز في عبادتك بينما نتولى نحن الجانب التقني بمراقبة موقع مجموعتك بدقة متناهية."
                : "A user interface designed to be clear even under direct sunlight, helping you focus on worship while we handle the technical side by precisely monitoring your group's location."}
            </p>
            
            <ul className="space-y-6">
              {items.map((item, i) => (
                <li key={i} className={`flex items-center gap-4 text-slate-700 font-bold ${isAr ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
                  <span>{item}</span>
                  <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200/50">
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 flex justify-center">
            {/* Phone Mockup */}
            <motion.div
              initial={{ rotateY: 30, rotateX: 10, y: 50, opacity: 0 }}
              whileInView={{ rotateY: isAr ? -10 : 10, rotateX: 5, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-[12px] border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] perspective-1000"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />
              
              <div className="absolute inset-0 bg-surface rounded-[2rem] overflow-hidden">
                {/* App UI */}
                <div className="p-6 bg-primary text-surface pb-12">
                  <div className="flex justify-between items-center mb-8">
                    <Bell className="w-5 h-5 opacity-60" />
                    <span className="font-bold">{isAr ? "معتمرون" : "Motamiroon"}</span>
                    <Search className="w-5 h-5 opacity-60" />
                  </div>
                  <h3 className={`text-xl font-black ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? "أهلاً بك، أحمد" : "Welcome, Ahmed"}
                  </h3>
                  <p className={`text-xs opacity-70 ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? "الموقع الحالي: جبل الرحمة" : "Location: Jabal al-Rahmah"}
                  </p>
                </div>
                
                <div className="px-6 -mt-6">
                  <div className="bg-surface p-4 rounded-2xl shadow-xl space-y-4">
                    <div className={`flex items-center justify-between text-ink/40 text-[10px] font-bold uppercase tracking-tighter ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                      <span>{isAr ? "البعد عن المشرف" : "Dist. to Supervisor"}</span>
                      <span>{isAr ? "١٥٠ متر" : "150m"}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-primary ${isAr ? 'w-1/3' : 'w-1/3 mr-auto ml-0'}`} style={{ width: '33%' }} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className={`text-sm font-bold mb-4 ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? "خريطة المشاعر" : "Holy Sites Map"}
                  </p>
                  <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative border border-black/5">
                    <img 
                      src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600" 
                      className="w-full h-full object-cover opacity-20"
                      alt="Map texture"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping bg-primary rounded-full opacity-50" />
                        <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center text-surface shadow-lg">
                          <Navigation2 className="w-4 h-4 fill-current rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
