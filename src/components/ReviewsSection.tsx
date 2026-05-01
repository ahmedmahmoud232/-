/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: { ar: "عبدالله الشمري", en: "Abdullah Al-Shemmeri" },
    rating: 5,
    text: { 
      ar: "تجربة رائعة جداً، ساعدني التطبيق في تتبع عائلتي داخل الزحام الشديد في الحرم المكي. شكراً للقائمين عليه.",
      en: "A very wonderful experience, the app helped me track my family in the heavy crowd inside the Haram. Thank you to the developers."
    },
    date: { ar: "أبريل 2024", en: "April 2024" }
  },
  {
    id: 2,
    name: { ar: "سارة محمود", en: "Sarah Mahmoud" },
    rating: 5,
    text: { 
      ar: "كمشرفة رحلات، وفر عليّ هذا النظام مجهوداً جباراً في إدارة وتوجيه المجموعات. التواصل الآن أصبح أسرع بكثير.",
      en: "As a trip supervisor, this system saved me massive effort in managing and guiding groups. Communication is much faster now."
    },
    date: { ar: "مارس 2024", en: "March 2024" }
  },
  {
    id: 3,
    name: { ar: "محمد إندونيسي", en: "Muhammad Indonesia" },
    rating: 4,
    text: {
      ar: "التطبيق مفيد جداً للمعتمرين الذين لا يتحدثون العربية بطلاقة. تتبع الموقع دقيق للغاية.",
      en: "App is very helpful for pilgrims who don't speak Arabic fluently. The GPS tracking is very accurate."
    },
    date: { ar: "فبراير 2024", en: "February 2024" }
  }
];

export default function ReviewsSection({ isAr }: { isAr?: boolean }) {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-10">
        <div className={`flex justify-between items-end mb-16 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{isAr ? "آراء المعتمرين" : "Pilgrim Reviews"}</h2>
            <p className="text-slate-500 text-lg font-medium">
              {isAr ? "أكثر من 10,000 مستخدم يثقون بنا" : "Trusted by over 10,000 users"}
            </p>
          </div>
          <div className={`hidden md:flex items-center gap-2 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-bold text-lg text-slate-900">4.9 / 5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className={`glass-card p-8 rounded-card relative group hover:border-primary transition-all duration-300 shadow-sm ${isAr ? 'text-right' : 'text-left'}`}>
              <Quote className={`absolute top-8 ${isAr ? 'left-8' : 'right-8'} w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors`} />
              <div className={`flex items-center gap-1 mb-6 ${isAr ? 'justify-end' : 'justify-start'}`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium">"{isAr ? review.text.ar : review.text.en}"</p>
              <div className={`flex items-center gap-4 pt-6 border-t border-slate-50 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary">
                  {isAr ? review.name.ar[0] : review.name.en[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{isAr ? review.name.ar : review.name.en}</h4>
                  <p className="text-xs text-slate-400 font-medium">{isAr ? review.date.ar : review.date.en}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
