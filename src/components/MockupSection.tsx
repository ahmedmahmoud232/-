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
      <div className="max-w-4xl mx-auto px-10 relative z-10">
        <div className={`flex flex-col items-start gap-12`}>
          
          <div className={`w-full ${isAr ? 'text-right' : 'text-left'}`}>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              {isAr ? "نظام المعتمر" : "Pilgrim System"}<br />
              <span className="text-primary">{isAr ? "بوصلتك الرقمية" : "Your Digital Compass"}</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 font-medium">
              {isAr 
                ? "واجهة مستخدم مصممة بدقة لتكون واضحة حتى تحت أشعة الشمس، تساعدك على التركيز في عبادتك بينما نتولى نحن الجانب التقني بمراقبة موقع مجموعتك بدقة متناهية."
                : "A user interface designed to be clear even under direct sunlight, helping you focus on worship while we handle the technical side by precisely monitoring your group's location."}
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>
    </section>
  );
}
