/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin, Users, Wallet } from "lucide-react";

const services = [
  {
    id: 1,
    title: { ar: "نظام المعتمر المتطور", en: "Advanced Pilgrim System" },
    description: {
      ar: "نحن ندرك مدى القلق الذي قد يشعر به المعتمر من الضياع في الزحام. لذلك قمنا بتطوير نظام تتبع جغرافي دقيق يعمل في أصعب الظروف داخل الحرم المكي الشريف والمشاعر المقدسة.",
      en: "We understand the anxiety pilgrims feel about getting lost. We developed a precise GPS system working in tough conditions within the Holy Mosque and sacred sites."
    },
    icon: <MapPin className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: { ar: "لوحة تحكم المشرف", en: "Supervisor Dashboard" },
    description: {
      ar: "بصفتك مشرفاً، تقع على عاتقك مسؤولية كبيرة. منصتنا توفر لك الأدوات اللازمة لمراقبة جميع أفراد مجموعتك في وقت واحد على خريطة تفاعلية.",
      en: "As a supervisor, you carry big responsibility. Our platform provides tools to monitor all group members simultaneously on an interactive map."
    },
    icon: <Users className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: { ar: "باقات اقتصادية وذكية", en: "Smart Economic Plans" },
    description: {
      ar: "الإيمان لا يجب أن يكلف كثيراً. صممنا نظام باقات مرن يبدأ بمستوى مجاني للأفراد والمجموعات الصغيرة، وصولاً إلى باقات مخصصة لشركات السياحة الكبيرة.",
      en: "Faith shouldn't be costly. We designed flexible plans starting with a free tier for individuals and small groups, up to custom plans for large agencies."
    },
    icon: <Wallet className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800"
  },
];

export default function ServicesPage({ isAr }: { isAr?: boolean }) {
  return (
    <div className="pt-20 bg-white">
      <section className="relative py-32 overflow-hidden bg-primary/95">
        <div className="absolute inset-0 bg-islamic-pattern opacity-50 pointer-events-none mix-blend-overlay" />
        <div className={`max-w-7xl mx-auto px-10 relative z-10 ${isAr ? 'text-right' : 'text-left'}`}>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {isAr ? "خدماتنا المتميزة" : "Our Featured Services"}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-xl text-white/90 max-w-2xl ${isAr ? 'ml-auto' : 'mr-auto'}`}
          >
            {isAr 
              ? "نحن نكرس التقنية لراحة ضيوف الرحمن، ونوفر حلولاً ذكية لكل من المعتمر والمشرف لتجربة لا تُنسى."
              : "We dedicate technology to the comfort of Allah's guests, providing smart solutions for both pilgrims and supervisors for an unforgettable experience."}
          </motion.p>
        </div>
      </section>

      {services.map((service, index) => (
        <section key={service.id} className={`py-32 ${index % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: (index % 2 === 0) ? (isAr ? 50 : -50) : (isAr ? -50 : 50) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`${index % 2 === 1 ? 'lg:order-last' : ''} ${isAr ? 'text-right' : 'text-left'}`}
              >
                <div className={`w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-inner ${isAr ? 'ml-auto' : 'mr-auto'}`}>
                  {service.icon}
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-8">{isAr ? service.title.ar : service.title.en}</h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-10">
                  {isAr ? service.description.ar : service.description.en}
                </p>
                <button className="btn-primary">
                  {isAr ? "ابدأ الاستخدام الآن" : "Start Using Now"}
                </button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img src={service.image} alt={isAr ? service.title.ar : service.title.en} className="w-full h-full object-cover" />
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
