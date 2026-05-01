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
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600"
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
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600"
  },
];

export default function GoalsSection({ isAr }: { isAr?: boolean }) {
  return (
    <section className="relative py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-10">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isAr ? '' : 'flex-row-reverse'}`}>
          {goals.map((goal, i) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-8 rounded-card flex flex-col group hover:border-primary transition-all duration-300 min-h-[250px] ${isAr ? 'text-right' : 'text-left'}`}
            >
              <div className={`flex items-center gap-4 mb-6 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-emerald-200/20`}>
                  {goal.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xl">{isAr ? goal.title.ar : goal.title.en}</h3>
                  <p className="text-xs text-slate-500 font-medium">{isAr ? "خدمات ذكية" : "Smart Services"}</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isAr ? goal.description.ar : goal.description.en}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Removed Card subcomponent as it's flattened into the grid above per theme pattern
