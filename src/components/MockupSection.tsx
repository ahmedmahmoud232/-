/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Navigation2, Search, Bell, User } from "lucide-react";

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
                  <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200/50">
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </div>
                  <span>{item}</span>
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
              className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-[12px] border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] perspective-1000 group/phone"
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
                    {isAr ? "الموقع الحالي: الحرم المكي" : "Location: Al-Haram Mosque"}
                  </p>
                </div>
                
                <div className="px-6 -mt-6 relative z-10">
                  <div className="bg-surface p-4 rounded-2xl shadow-xl space-y-4 border border-slate-100">
                    <div className={`flex items-center justify-between text-ink/40 text-[10px] font-bold uppercase tracking-tighter ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                      <span>{isAr ? "البعد عن المشرف" : "Dist. to Supervisor"}</span>
                      <span>{isAr ? "١٥٠ متر" : "150m"}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-primary ${isAr ? 'w-1/3' : 'w-1/3 mr-auto ml-0'}`} style={{ width: '33%' }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-grow flex flex-col h-[calc(100%-200px)]">
                  <p className={`text-sm font-bold mb-4 ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? "تتبع المجموعة" : "Group Tracking"}
                  </p>
                  <div className="flex-grow bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-200 shadow-inner group/map">
                    <img 
                      src="/src/assets/images/regenerated_image_1777719596648.png" 
                      className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover/map:scale-110"
                      alt="Map"
                    />
                    
                    {/* Supervisor Pin */}
                    <div className="absolute top-[30%] left-[40%] group/pin-s">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white cursor-pointer relative z-10"
                      >
                        <User className="w-5 h-5" />
                      </motion.div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover/pin-s:opacity-100 transition-opacity bg-white px-2 py-1 rounded-lg shadow-lg text-[10px] whitespace-nowrap font-bold text-slate-900 border border-slate-100">
                        {isAr ? "المشرف" : "Supervisor"}
                      </div>
                    </div>

                    {/* Pilgrim Pin (User) */}
                    <div className="absolute top-[60%] left-[65%] group/pin-p">
                      <div className="absolute inset-0 animate-ping bg-primary rounded-full opacity-50" />
                      <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white cursor-pointer transition-transform group-hover/pin-p:scale-125">
                        <Navigation2 className="w-4 h-4 fill-current rotate-45" />
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/pin-p:opacity-100 transition-opacity bg-white px-2 py-1 rounded-lg shadow-lg text-[10px] whitespace-nowrap font-bold text-slate-900 border border-slate-100">
                        {isAr ? "أنت" : "You"}
                      </div>
                    </div>

                    {/* Other Pilgrims */}
                    <div className="absolute top-[45%] left-[70%] w-2 h-2 bg-emerald-500 rounded-full border border-white shadow-md" />
                    <div className="absolute top-[55%] left-[30%] w-2 h-2 bg-emerald-500 rounded-full border border-white shadow-md" />
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
