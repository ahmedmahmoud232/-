/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "عبدالله الشمري",
    rating: 5,
    text: "تجربة رائعة جداً، ساعدني التطبيق في تتبع عائلتي داخل الزحام الشديد في الحرم المكي. شكراً للقائمين عليه.",
    date: "أبريل 2024"
  },
  {
    id: 2,
    name: "سارة محمود",
    rating: 5,
    text: "كمشرفة رحلات، وفر عليّ هذا النظام مجهوداً جباراً في إدارة وتوجيه المجموعات. التواصل الآن أصبح أسرع بكثير.",
    date: "مارس 2024"
  },
  {
    id: 3,
    name: "محمد إندونيسي",
    rating: 4,
    text: "App is very helpful for pilgrims who don't speak Arabic fluently. The GPS tracking is very accurate.",
    date: "فبراير 2024"
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-end mb-16">
          <div className="text-right">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">آراء المعتمرين</h2>
            <p className="text-slate-500 text-lg font-medium">أكثر من 10,000 مستخدم يثقون بنا</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
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
            <div key={review.id} className="glass-card p-8 rounded-card relative group hover:border-primary transition-all duration-300 shadow-sm">
              <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
              <div className="flex items-center gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium">"{review.text}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
