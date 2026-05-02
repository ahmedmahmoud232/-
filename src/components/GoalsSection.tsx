/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Users, Wallet } from "lucide-react";

const goals = [
  {
    id: 1,
    title: { ar: "للمعتمر والزائر", en: "For Pilgrims & Visitors" },
    description: {
      ar: "تتبع مجموعتك بلمسة واحدة، لا تقلق من الضياع بعد اليوم داخل الحرم أو أثناء التنقل.",
      en: "Track your group with one touch, worry no more about getting lost in the Haram or during transit."
    },
    icon: <MapPin className="w-8 h-8" />,
    color: "bg-surface",
    textColor: "text-ink",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: { ar: "للمشرف والمنظم", en: "For Supervisors & Organizers" },
    description: {
      ar: "أضف مجموعاتك، تابع مواقعهم، تواصل معهم، وقم بمهام الإدارة بكل سلاسة واحترافية.",
      en: "Add groups, track locations, communicate, and manage tasks smoothly and professionally."
    },
    icon: <Users className="w-8 h-8" />,
    color: "bg-primary",
    textColor: "text-surface",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: { ar: "أسعار تنافسية", en: "Competitive Pricing" },
    description: {
      ar: "باقات مرنة تناسب الأفراد والشركات، لأن هدفنا الأول هو خدمة ضيوف الرحمن.",
      en: "Flexible plans for individuals and companies, our main goal is serving Allah's guests."
    },
    icon: <Wallet className="w-8 h-8" />,
    color: "bg-ink",
    textColor: "text-surface",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
  },
];

export default function GoalsSection({ isAr }: { isAr?: boolean }) {
  const displayedGoals = isAr ? [...goals].reverse() : goals;

  return (
    <section className="relative py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-10">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8`}>
          {displayedGoals.map((goal, i) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-sm flex flex-col group hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 min-h-[300px] ${isAr ? 'text-right' : 'text-left'}`}
            >
              <div className={`flex items-center gap-5 mb-8 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-colors duration-500`}>
                  {goal.icon}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-2xl mb-1">{isAr ? goal.title.ar : goal.title.en}</h3>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">{isAr ? "خدمة متميزة" : "Premium Service"}</p>
                </div>
              </div>
              <p className="text-slate-500 leading-relaxed text-lg flex-grow">
                {isAr ? goal.description.ar : goal.description.en}
              </p>
              
              <div className={`mt-8 pt-6 border-t border-slate-50 flex ${isAr ? 'justify-start' : 'justify-end'}`}>
                <div className="w-8 h-1 bg-slate-100 group-hover:w-full group-hover:bg-primary/20 transition-all duration-700 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Removed Card subcomponent as it's flattened into the grid above per theme pattern
