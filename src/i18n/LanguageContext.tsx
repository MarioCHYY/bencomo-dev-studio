import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T>(obj: Record<string, T>) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Spanish first: the site is for businesses in Culiacán, and it's also what Google renders and indexes
  // (its crawler has no saved choice). English only when the visitor picked it with the switch.
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("lang") === "en" ? "en" : "es") as Lang;
    } catch {
      return "es";
    }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* private mode: the choice just lasts this visit */
    }
  };

  const t = <T,>(obj: Record<string, T>): T => obj[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
