/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    id: 1,
    name: "باقة 5 مجموعات",
    price: "3",
    features: ["إضافة حتى 5 مجموعات", "تتبع جغرافي دقيق", "تحديث الموقع كل 5 دقائق", "تنبيهات مفقودين فورية"],
    isPopular: false,
    buttonText: "اختر الباقة"
  },
  {
    id: 2,
    name: "باقة 10 مجموعات",
    price: "6",
    features: ["إضافة حتى 10 مجموعات", "تتبع جغرافي فائق الدقة", "تحديث الموقع وقتي (Real-time)", "دعم فني متميز"],
    isPopular: true,
    buttonText: "اختر الباقة"
  },
  {
    id: 3,
    name: "باقة 15 مجموعة",
    price: "8",
    features: ["إضافة حتى 15 مجموعة", "لوحة تحكم احترافية", "تقارير أداء مفصلة", "تكامل مع أنظمة الشركة"],
    isPopular: false,
    buttonText: "اختر الباقة"
  },
  {
    id: 4,
    name: "باقة مخصصة",
    price: "4.5",
    features: ["حد أدنى 3 مجموعات", "1.5 دولار لكل مجموعة إضافية", "دعم فني خاص", "تخصيص كامل للمميزات"],
    isPopular: false,
    buttonText: "ابدأ التخصيص",
    isCustom: true
  }
];

interface PricesPageProps {
  onSubscribe: () => void;
}

export default function PricesPage({ onSubscribe }: PricesPageProps) {
  const [customGroups, setCustomGroups] = useState(3);
  
  const calculateCustomPrice = (groups: number) => {
    if (groups <= 3) return 4.5;
    return 4.5 + (groups - 3) * 1.5;
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <section className="relative py-32 overflow-hidden bg-primary/95">
        <div className="max-w-7xl mx-auto px-10 relative z-10 text-right">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold text-white mb-6"
          >
            أسعار الباقات
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl ml-auto"
          >
            خطط تسعير مرنة ومدروسة لتناسب احتياجاتكم، من المعتمر المستقل إلى كبرى شركات السياحة لتسهيل أداء المناسك.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-8 rounded-[2.5rem] border ${plan.isPopular ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-xl' : 'border-slate-100 shadow-sm'}`}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">
                    ${plan.isCustom ? calculateCustomPrice(customGroups).toFixed(1) : plan.price}
                  </span>
                  <span className="text-slate-500 text-sm"> / شهرياً</span>
                </div>
                
                {plan.isCustom && (
                  <div className="mb-6 space-y-2">
                    <label className="text-xs font-bold text-slate-400 block text-right">عدد المجموعات</label>
                    <input 
                      type="number" 
                      min="3"
                      value={customGroups}
                      onChange={(e) => setCustomGroups(Math.max(3, parseInt(e.target.value) || 3))}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 text-center font-bold"
                    />
                  </div>
                )}
                
                <ul className="space-y-4 mb-8 min-h-[200px] text-right">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start justify-end gap-2 text-slate-600 text-sm">
                      <span>{feature}</span>
                      <Check className="w-5 h-5 text-primary shrink-0" />
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={onSubscribe}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${plan.isPopular ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-900 text-white hover:bg-primary'}`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
