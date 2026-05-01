/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function AboutPage({ isAr }: { isAr?: boolean }) {
  return (
    <div className="pt-20 bg-white">
      <section className="relative py-32 overflow-hidden bg-primary/95">
        <div className={`max-w-7xl mx-auto px-10 relative z-10 ${isAr ? 'text-right' : 'text-left'}`}>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {isAr ? "نبذة عن معتمرون" : "About Motamiroon"}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-xl text-white/90 max-w-2xl ${isAr ? 'ml-auto' : 'mr-auto'}`}
          >
            {isAr 
              ? "نحن فريق يسعى لتسخير أحدث التقنيات لخدمة الحجيج والمعتمرين، لضمان سلامتهم وتفرغهم للعبادة والذكر في أطهر بقاع الأرض."
              : "We are a team striving to harness latest technologies to serve pilgrims and performers of Umrah, ensuring their safety and focus on worship."}
          </motion.p>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${isAr ? '' : 'lg:flex-row-reverse'}`}>
            <motion.div 
              initial={{ opacity: 0, x: isAr ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={isAr ? 'text-right' : 'text-left'}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-8">{isAr ? "رؤيتنا وأهدافنا" : "Our Vision & Goals"}</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-6">
                {isAr 
                  ? "يكمن التحدي الأكبر في الزحام الشديد في مكة المكرمة والمدينة المنورة في الحفاظ على ترابط المجموعة المشتركة في الرحلة." 
                  : "The biggest challenge in the crowds of Makkah and Madinah is maintaining group cohesion during the journey."}
              </p>
              <div className="space-y-6">
                <div className={`bg-emerald-50 p-6 rounded-2xl ${isAr ? 'border-r-4' : 'border-l-4'} border-primary`}>
                   <h3 className="font-bold text-slate-900 mb-2">{isAr ? "للمشرف والمنظم" : "For Supervisors & Organizers"}</h3>
                   <p className="text-slate-600">
                     {isAr 
                       ? "هدفنا الرئيسي هو تمكين مشرف العمرة من تتبع أفراد المجموعة لحظة بلحظة، والتدخل السريع في حال تغيب أي فرد أو ضياعه." 
                       : "Our main goal is to empower Umrah supervisors to track group members moment by moment and intervene quickly in case of absence."}
                   </p>
                </div>
                <div className={`bg-slate-50 p-6 rounded-2xl ${isAr ? 'border-r-4' : 'border-l-4'} border-slate-900`}>
                   <h3 className="font-bold text-slate-900 mb-2">{isAr ? "للمعتمر الفرد" : "For Individual Pilgrims"}</h3>
                   <p className="text-slate-600">
                     {isAr 
                       ? "نساعد المعتمر على إيجاد فريقه ومجموعته في وقت قياسي دون الحاجة للاتصالات الهاتفية المتكررة، مما يمنحه طمأنينة نفسية كاملة." 
                       : "We help pilgrims find their teams and groups in record time without repeated calls, giving them full psychological peace."}
                   </p>
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
                <img src="https://images.unsplash.com/photo-1565552607561-79290911ca60?auto=format&fit=crop&q=80&w=800" alt="Masjid Nabawi" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
