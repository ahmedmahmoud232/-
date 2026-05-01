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
    name: "الباقة المجانية",
    price: "0",
    features: ["إضافة مجموعة واحدة مجانية", "تتبع جغرافي أساسي", "تحديث الموقع كل 15 دقيقة", "دعم فني عبر البريد"],
    isPopular: false,
    buttonText: "ابدأ مجاناً الآن"
  },
  {
    id: 2,
    name: "الباقة الأساسية",
    price: "4.99",
    features: ["إضافة حتى 5 مجموعات", "تتبع جغرافي دقيق", "تحديث الموقع كل 5 دقائق", "تنبيهات مفقودين فورية"],
    isPopular: true,
    buttonText: "اختر الباقة الأساسية"
  },
  {
    id: 3,
    name: "الباقة المتقدمة",
    price: "9.99",
    features: ["مجموعات غير محدودة", "تتبع جغرافي فائق الدقة", "تحديث الموقع وقتي (Real-time)", "تقارير أداء المشرفين"],
    isPopular: false,
    buttonText: "اختر الباقة المتقدمة"
  },
  {
    id: 4,
    name: "باقة النخبة",
    price: "19.99",
    features: ["كافة مميزات الباقة المتقدمة", "تكامل برمجيات مخصص", "مدير حساب خاص", "دعم فني عبر الهاتف 24/7"],
    isPopular: false,
    buttonText: "تواصل مع المبيعات"
  }
];

interface PricesPageProps {
  onSubscribe: () => void;
}

export default function PricesPage({ onSubscribe }: PricesPageProps) {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <section className="relative py-48 overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1565552607561-79290911ca60?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover"
            alt="Makkah Background" 
          />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[1px]" />
        </div>
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
            className="text-xl text-white/70 max-w-2xl ml-auto"
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
                className={`bg-white p-8 rounded-card border ${plan.isPopular ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-xl' : 'border-slate-100'}`}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-slate-500 text-sm"> / شهرياً</span>
                </div>
                
                <ul className="space-y-4 mb-8 min-h-[200px]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span>{feature}</span>
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
