/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";

const languages = [
  { code: "ar", name: "العربية" },
  { code: "en", name: "English" },
  { code: "ur", name: "اردو" },
  { code: "tr", name: "Türkçe" },
  { code: "id", name: "Indonesia" },
  { code: "fr", name: "Français" },
  { code: "ms", name: "Melayu" },
];

interface HeaderProps {
  onNavigate: (page: string) => void;
  onLanguageChange: (lang: string) => void;
  currentPage: string;
  currentLang: string;
  onAuthClick: () => void;
}

export default function Header({ onNavigate, onLanguageChange, currentPage, currentLang, onAuthClick }: HeaderProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "الصفحة الرئيسية", labelEn: "Home" },
    { id: "services", label: "خدماتنا", labelEn: "Services" },
    { id: "prices", label: "أسعار الباقات", labelEn: "Pricing" },
    { id: "about", label: "نبذه عنّا", labelEn: "About Us" },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAr = currentLang === "ar";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-12">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-4xl text-primary font-bold logo-thuluth">معتمرون</span>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`nav-link text-sm font-semibold transition-colors ${currentPage === link.id ? "active" : ""}`}
                >
                  {isAr ? link.label : link.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm hover:bg-slate-50 transition-colors"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="font-medium">{languages.find(l => l.code === currentLang)?.name}</span>
              </button>
              
              {isLangOpen && (
                <div className="absolute top-12 right-0 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { onLanguageChange(l.code); setIsLangOpen(false); }}
                      className={`w-full text-right px-4 py-2 text-sm hover:bg-slate-50 ${currentLang === l.code ? 'text-primary font-bold' : ''}`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <div className="flex items-center gap-4 text-sm font-bold">
              <button 
                onClick={() => onNavigate('supervisor')}
                className="text-slate-700 hover:text-primary transition-colors"
              >
                {isAr ? "بوابة المشرف" : "Supervisor Portal"}
              </button>
              <button 
                onClick={() => onNavigate('pilgrim')}
                className="btn-primary"
              >
                {isAr ? "بوابة المعتمر" : "Pilgrim Portal"}
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-700">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 p-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-right py-2 text-lg font-bold ${currentPage === link.id ? 'text-primary' : 'text-slate-700'}`}
            >
              {isAr ? link.label : link.labelEn}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-50 flex flex-col gap-4">
            <button onClick={() => handleNav('supervisor')} className="text-slate-700 font-bold text-right">
              {isAr ? "بوابة المشرف" : "Supervisor Portal"}
            </button>
            <button onClick={() => handleNav('pilgrim')} className="btn-primary w-full">
              {isAr ? "بوابة المعتمر" : "Pilgrim Portal"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
