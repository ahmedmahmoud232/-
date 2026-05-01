/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin, Users, Wallet } from "lucide-react";

const services = [
  {
    id: 1,
    title: "نظام المعتمر المتطور",
    description: "نحن ندرك مدى القلق الذي قد يشعر به المعتمر من الضياع في الزحام. لذلك قمنا بتطوير نظام تتبع جغرافي دقيق يعمل في أصعب الظروف داخل الحرم المكي الشريف والمشاعر المقدسة. بضغطة زر واحدة يمكنك معرفة موقع مجموعتك بدقة والوصول إلى مشرفك بأسرع وقت ممكن.",
    icon: <MapPin className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "لوحة تحكم المشرف",
    description: "بصفتك مشرفاً، تقع على عاتقك مسؤولية كبيرة. منصتنا توفر لك الأدوات اللازمة لمراقبة جميع أفراد مجموعتك في وقت واحد على خريطة تفاعلية. يمكنك إرسال تنبيهات جماعية في حالات الطوارئ أو التجمع، وضمان عدم تخلف أي معتمر عن الرحلة.",
    icon: <Users className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1565552607561-79290911ca60?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "باقات اقتصادية وذكية",
    description: "الإيمان لا يجب أن يكلف كثيراً. صممنا نظام باقات مرن يبدأ بمستوى مجاني للأفراد والمجموعات الصغيرة، وصولاً إلى باقات مخصصة لشركات السياحة الكبيرة. كل ذلك مع ضمان استقرار الخدمة وسرعة الاستجابة على مدار الساعة.",
    icon: <Wallet className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1581442111816-d36c2db53e36?auto=format&fit=crop&q=80&w=800"
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20 bg-white">
      <section className="relative py-32 overflow-hidden bg-primary/95">
        <div className="max-w-7xl mx-auto px-10 relative z-10 text-right">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold text-white mb-6"
          >
            خدماتنا المتميزة
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl ml-auto"
          >
            نحن نكرس التقنية لراحة ضيوف الرحمن، ونوفر حلولاً ذكية لكل من المعتمر والمشرف لتجربة لا تُنسى.
          </motion.p>
        </div>
      </section>

      {services.map((service, index) => (
        <section key={service.id} className={`py-32 ${index % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'lg:order-last' : ''}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-inner">
                  {service.icon}
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-8">{service.title}</h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-10">
                  {service.description}
                </p>
                <button className="btn-primary">ابدأ الاستخدام الآن</button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
