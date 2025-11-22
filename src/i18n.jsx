import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import viPromo from "./locales/vi/components/PromoBanner.json";
import enPromo from "./locales/en/components/PromoBanner.json";
import viHeader from "./locales/vi/components/Header.json";
import enHeader from "./locales/en/components/Header.json";
import viFooter from "./locales/vi/components/Footer.json";
import enFooter from "./locales/en/components/Footer.json";
import viChatWidget from "./locales/vi/components/ChatWidget.json";
import enChatWidget from "./locales/en/components/ChatWidget.json";
import viProducts from "./locales/vi/sections/Products.json";
import enProducts from "./locales/en/sections/Products.json";
import viCollections from "./locales/vi/sections/Collections.json";
import enCollections from "./locales/en/sections/Collections.json";
import viBenefits from "./locales/vi/sections/Benefits.json";
import enBenefits from "./locales/en/sections/Benefits.json";
import viHeroParallax from "./locales/vi/sections/HeroParallax.json";
import enHeroParallax from "./locales/en/sections/HeroParallax.json";
import viAbout from "./locales/vi/pages/About.json";
import enAbout from "./locales/en/pages/About.json";

const I18nContext = createContext({
   locale: "vi",
   setLocale: () => { },
   t: (key) => key,
});

function getNested(obj, path) {
   return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export const I18nProvider = ({ children }) => {
   const [locale, setLocale] = useState(() => {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem("locale") : null;
      return saved || "vi";
   });

   const messages = useMemo(
      () => ({
         vi: { components: { PromoBanner: viPromo, Header: viHeader, Footer: viFooter, ChatWidget: viChatWidget }, sections: { Products: viProducts, Collections: viCollections, Benefits: viBenefits, HeroParallax: viHeroParallax }, pages: { About: viAbout } },
         en: { components: { PromoBanner: enPromo, Header: enHeader, Footer: enFooter, ChatWidget: enChatWidget }, sections: { Products: enProducts, Collections: enCollections, Benefits: enBenefits, HeroParallax: enHeroParallax }, pages: { About: enAbout } },
      }),
      []
   );

   const t = (key) => {
      const bundle = messages[locale] || {};
      const value = getNested(bundle, key);
      return value !== undefined ? value : key;
   };

   const value = useMemo(() => ({ locale, setLocale, t }), [locale]);

   useEffect(() => {
      if (typeof window !== "undefined") {
         window.localStorage.setItem("locale", locale);
         document.documentElement.lang = locale;
      }
   }, [locale]);

   return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);


