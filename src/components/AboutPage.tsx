/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <div className="pt-20 bg-white">
      <section className="relative py-48 overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover"
            alt="Makkah View"
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="max-w-7xl mx-auto px-10 relative z-10 text-right">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold text-white mb-6"
          >
            نبذة عن معتمرون
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl ml-auto"
          >
            نحن فريق يسعى لتسخير أحدث التقنيات لخدمة الحجيج والمعتمرين، لضمان سلامتهم وتفرغهم للعبادة والذكر في أطهر بقاع الأرض.
          </motion.p>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-right"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-8">رؤيتنا وأهدافنا</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-6">
                يكمن التحدي الأكبر في الزحام الشديد في مكة المكرمة والمدينة المنورة في الحفاظ على ترابط المجموعة المشتركة في الرحلة. 
              </p>
              <div className="space-y-6">
                <div className="bg-emerald-50 p-6 rounded-2xl border-r-4 border-primary">
                   <h3 className="font-bold text-slate-900 mb-2">للمشرف والمنظم</h3>
                   <p className="text-slate-600">هدفنا الرئيسي هو تمكين مشرف العمرة من تتبع أفراد المجموعة لحظة بلحظة، والتدخل السريع في حال تغيب أي فرد أو ضياعه، مما يقلل من حوادث الفقدان ويوفر الوقت والجهد.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-r-4 border-slate-900">
                   <h3 className="font-bold text-slate-900 mb-2">للمعتمر الفرد</h3>
                   <p className="text-slate-600">نساعد المعتمر على إيجاد فريقه ومجموعته في وقت قياسي دون الحاجة للاتصالات الهاتفية المتكررة أو البحث العشوائي، مما يمنحه طمأنينة نفسية كاملة خلال أداء النسك.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800" alt="Al-Masjid Al-Haram" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
