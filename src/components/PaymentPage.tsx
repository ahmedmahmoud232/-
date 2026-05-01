import { motion } from "motion/react";
import { CreditCard, ShieldCheck, Lock, ArrowRight, Wallet, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";

interface PaymentPageProps {
  onBack: () => void;
  isAr: boolean;
  plan: { name: string; price: number } | null;
}

export default function PaymentPage({ onBack, isAr, plan }: PaymentPageProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const finalPrice = plan?.price || 0;

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-lg w-full border border-slate-100"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {isAr ? "تمت العملية بنجاح!" : "Payment Successful!"}
          </h2>
          <p className="text-slate-500 mb-10 leading-relaxed">
            {isAr ? "شكراً لاشتراكك في معتمرون. يمكنك الآن البدء في استخدام كافة مميزات المنصة." : "Thank you for subscribing to Motamiroon. You can now start using all platform features."}
          </p>
          <button 
            onClick={onBack}
            className="btn-primary w-full py-4 rounded-2xl"
          >
            {isAr ? "العودة للرئيسية" : "Back to Home"}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {isAr ? "تفاصيل الدفع" : "Payment Details"}
              </h2>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold">{isAr ? "دفع آمن" : "Secure Payment"}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{isAr ? "الاسم الكامل" : "Full Name"}</label>
                  <input type="text" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-right" placeholder={isAr ? "مثال: محمد أحمد" : "Ex: Mohammed Ahmed"} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{isAr ? "البريد الإلكتروني" : "Email"}</label>
                  <input type="email" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-right" placeholder="mail@example.com" />
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-end gap-4 mb-6">
                  <span className="font-bold text-slate-900">{isAr ? "بطاقة الائتمان" : "Credit Card"}</span>
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-6">
                  <div className="text-right">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">{isAr ? "رقم البطاقة" : "Card Number"}</label>
                    <input type="text" required maxLength={16} className="w-full p-4 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-center" placeholder="0000 0000 0000 0000" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-right">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">{isAr ? "تاريخ الانتهاء" : "Expiry Date"}</label>
                      <input type="text" required placeholder="MM/YY" className="w-full p-4 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-center" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">CVV</label>
                      <input type="text" required maxLength={3} placeholder="123" className="w-full p-4 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-center" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button type="button" className="flex-1 flex items-center justify-center gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="PayPal" />
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <Wallet className="w-5 h-5 text-slate-600" />
                  <span className="font-bold text-slate-600">Apple Pay</span>
                </button>
              </div>

              <button type="submit" className="btn-primary w-full py-5 rounded-2xl text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                <Lock className="w-5 h-5" />
                {isAr ? "تأكيد عملية الشراء" : "Confirm Purchase"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-12 xl:col-span-5 lg:order-2">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit sticky top-32"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-8 text-right">{isAr ? "ملخص الطلب" : "Order Summary"}</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-slate-50 text-right">
                <span className="text-lg font-black text-primary">${finalPrice.toFixed(2)}</span>
                <div>
                  <p className="font-bold text-slate-900">{plan?.name || (isAr ? "الباقة المختارة" : "Selected Plan")}</p>
                  <p className="text-sm text-slate-400">{isAr ? "اشتراك شهري" : "Monthly Subscription"}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>${finalPrice.toFixed(2)}</span>
                  <span>{isAr ? "السعر الفرعي" : "Subtotal"}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>$0.00</span>
                  <span>{isAr ? "الضريبة" : "Tax"}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                <span className="text-4xl font-black text-slate-900">${finalPrice.toFixed(2)}</span>
                <span className="text-xl font-bold text-slate-900">{isAr ? "الإجمالي" : "Total"}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl mt-8">
                <p className="text-xs text-slate-400 leading-relaxed text-right">
                  {isAr 
                    ? "من خلال إتمام عملية الشراء، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بمنصة معتمرون." 
                    : "By completing the purchase, you agree to Motamiroon's Terms of Service and Privacy Policy."}
                </p>
              </div>

              <button 
                onClick={onBack}
                className="w-full flex items-center justify-center gap-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
              >
                {isAr ? "العودة لتعديل الطلب" : "Back to Edit Order"}
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-0' : 'rotate-180'}`} />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
