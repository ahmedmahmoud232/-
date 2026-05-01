/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 px-10 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-6 md:mb-0">
        <span className="text-2xl font-bold logo-thuluth">معتمرون</span>
        <p className="border-r border-slate-200 pr-8 hidden md:block">جميع الحقوق محفوظة لمنصة معتمرون &copy; 2024</p>
        <p className="md:hidden text-center">جميع الحقوق محفوظة &copy; 2024</p>
      </div>
      
      <div className="flex gap-8 font-medium">
        <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
        <a href="#" className="hover:text-primary transition-colors">الشروط والأحكام</a>
        <a href="#" className="hover:text-primary transition-colors">تواصل معنا</a>
      </div>
    </footer>
  );
}
