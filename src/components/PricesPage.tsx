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
    name: { ar: "باقة 5 مجموعات", en: "5 Groups Plan" },
    price: 3,
    features: {
      ar: ["إضافة حتى 5 مجموعات", "تتبع جغرافي دقيق", "تحديث الموقع كل 5 دقائق", "تنبيهات مفقودين فورية"],
      en: ["Up to 5 groups", "Accurate GPS tracking", "Update every 5 mins", "Instant missing alerts"]
    },
    isPopular: false,
    buttonText: { ar: "اختر الباقة", en: "Choose Plan" }
  },
  {
    id: 2,
    name: { ar: "باقة 10 مجموعات", en: "10 Groups Plan" },
    price: 6,
    features: {
      ar: ["إضافة حتى 10 مجموعات", "تتبع جغرافي فائق الدقة", "تحديث الموقع وقتي (Real-time)", "دعم فني متميز"],
      en: ["Up to 10 groups", "High-precision GPS", "Real-time updates", "Premium support"]
    },
    isPopular: true,
    buttonText: { ar: "اختر الباقة", en: "Choose Plan" }
  },
  {
    id: 3,
    name: { ar: "باقة 15 مجموعة", en: "15 Groups Plan" },
    price: 8,
    features: {
      ar: ["إضافة حتى 15 مجموعة", "لوحة تحكم احترافية", "تقارير أداء مفصلة", "تكامل مع أنظمة الشركة"],
      en: ["Up to 15 groups", "Professional dashboard", "Detailed performance reports", "System integration"]
    },
    isPopular: false,
    buttonText: { ar: "اختر الباقة", en: "Choose Plan" }
  }
];

const customPlanInfo = {
  id: 4,
  name: { ar: "باقة مخصصة", en: "Custom Plan" },
  price: 4.5,
  features: {
    ar: ["حد أدنى 3 مجموعات", "1.5 دولار لكل مجموعة إضافية", "دعم فني خاص", "تخصيص كامل للمميزات"],
    en: ["Minimum 3 groups", "$1.5 per extra group", "Dedicated support", "Full feature customization"]
  },
  isPopular: false,
  buttonText: { ar: "ابدأ التخصيص", en: "Start Customizing" },
  isCustom: true
};

interface PricesPageProps {
  onSubscribe: (plan: { name: string; price: number }) => void;
  isAr: boolean;
}

export default function PricesPage({ onSubscribe, isAr }: PricesPageProps) {
  const [customGroups, setCustomGroups] = useState(3);
  
  const calculateCustomPrice = (groups: number) => {
    if (groups <= 3) return 4.5;
    return 4.5 + (groups - 3) * 1.5;
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <section className="relative py-32 overflow-hidden bg-primary/95">
        <div className="absolute inset-0 bg-islamic-pattern opacity-50 pointer-events-none mix-blend-overlay" />
        <div className={`max-w-7xl mx-auto px-10 relative z-10 ${isAr ? 'text-right' : 'text-left'}`}>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-black"
          >
            {isAr ? "أسعار الباقات" : "Pricing Plans"}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-xl text-white/90 max-w-2xl ${isAr ? 'ml-auto' : 'mr-auto'}`}
          >
            {isAr 
              ? "خطط تسعير مرنة ومدروسة لتناسب احتياجاتكم، من المعتمر المستقل إلى كبرى شركات السياحة لتسهيل أداء المناسك."
              : "Flexible pricing plans designed to meet your needs, from independent pilgrims to major travel agencies."}
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-10">
        <div className="max-w-7xl mx-auto">
          {/* Main 3 Plans Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-8 rounded-[2.5rem] border flex flex-col ${plan.isPopular ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-xl relative z-10' : 'border-slate-100 shadow-sm'}`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                    {isAr ? "الأكثر شيوعاً" : "Most Popular"}
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">{isAr ? plan.name.ar : plan.name.en}</h3>
                <div className="mb-6 text-center">
                  <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-slate-500 text-sm"> {isAr ? "/ شهرياً" : "/ monthly"}</span>
                </div>
                
                <ul className={`space-y-4 mb-8 flex-grow ${isAr ? 'text-right' : 'text-left'}`}>
                  {(isAr ? plan.features.ar : plan.features.en).map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-slate-600 text-sm ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => onSubscribe({ 
                    name: isAr ? plan.name.ar : plan.name.en, 
                    price: plan.price 
                  })}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${plan.isPopular ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-900 text-white hover:bg-primary'}`}
                >
                  {isAr ? plan.buttonText.ar : plan.buttonText.en}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Custom Plan Row - Full Width */}
          <motion.div
            id="custom-plan"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm"
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isAr ? '' : 'lg:flex-row-reverse'}`}>
              <div className={`${isAr ? 'text-right' : 'text-left lg:order-1'}`}>
                <h3 className="text-3xl font-black text-slate-900 mb-4">{isAr ? customPlanInfo.name.ar : customPlanInfo.name.en}</h3>
                <p className="text-slate-500 mb-8 max-w-md">
                  {isAr 
                    ? "هل لديك حجم أعمال أكبر؟ يمكنك تخصيص عدد المجموعات التي تريد إدارتها والحصول على سعر خاص بك." 
                    : "Have a larger business scale? Customize the number of groups you want to manage and get your own price."}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {(isAr ? customPlanInfo.features.ar : customPlanInfo.features.en).map((feature, idx) => (
                    <div key={idx} className={`flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 text-sm font-medium ${isAr ? 'flex-row-reverse' : ''}`}>
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <div className="text-center mb-10">
                  <span className="text-5xl font-black text-slate-900">${calculateCustomPrice(customGroups).toFixed(1)}</span>
                  <span className="text-slate-500 block mt-2">{isAr ? "السعر الشهري" : "Monthly Price"}</span>
                </div>

                <div className="space-y-6 mb-10">
                  <div className={`flex justify-between items-center px-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <label className="text-sm font-bold text-slate-500">{isAr ? "عدد المجموعات" : "Number of Groups"}</label>
                    <span className="text-xl font-black text-primary">{customGroups}</span>
                  </div>
                  <input 
                    type="range" 
                    min="3"
                    max="100"
                    step="1"
                    value={customGroups}
                    onChange={(e) => setCustomGroups(parseInt(e.target.value))}
                    className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2">
                    <span>100</span>
                    <span>3</span>
                  </div>
                </div>

                <button 
                  onClick={() => onSubscribe({ 
                    name: isAr ? customPlanInfo.name.ar : customPlanInfo.name.en, 
                    price: calculateCustomPrice(customGroups) 
                  })}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-primary transition-all shadow-xl shadow-slate-900/10"
                >
                  {isAr ? customPlanInfo.buttonText.ar : customPlanInfo.buttonText.en}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
