/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Footer({ isAr }: { isAr?: boolean }) {
  return (
    <footer className={`bg-white border-t border-slate-100 py-12 px-10 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 ${isAr ? 'rtl' : 'ltr flex-row-reverse'}`}>
      <div className={`flex flex-col md:flex-row items-center gap-8 mb-6 md:mb-0 ${isAr ? '' : 'flex-row-reverse'}`}>
        <span className="text-2xl font-bold logo-thuluth text-primary">{isAr ? "معتمرون" : "Motamiroon"}</span>
        <p className={`border-slate-200 hidden md:block ${isAr ? 'border-r pr-8' : 'border-l pl-8'}`}>
          {isAr ? "جميع الحقوق محفوظة لمنصة معتمرون © 2024" : "All rights reserved to Motamiroon Platform © 2024"}
        </p>
        <p className="md:hidden text-center">
          {isAr ? "جميع الحقوق محفوظة © 2024" : "All rights reserved © 2024"}
        </p>
      </div>
      
      <div className={`flex gap-8 font-medium ${isAr ? '' : 'flex-row-reverse'}`}>
        <a href="#" className="hover:text-primary transition-colors">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</a>
        <a href="#" className="hover:text-primary transition-colors">{isAr ? "الشروط والأحكام" : "Terms & Conditions"}</a>
        <a href="#" className="hover:text-primary transition-colors">{isAr ? "تواصل معنا" : "Contact Us"}</a>
      </div>
    </footer>
  );
}
