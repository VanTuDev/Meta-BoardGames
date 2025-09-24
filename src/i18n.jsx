import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import viPromo from "./locales/vi/components/PromoBanner.json";
import enPromo from "./locales/en/components/PromoBanner.json";
import viHeader from "./locales/vi/components/Header.json";
import enHeader from "./locales/en/components/Header.json";
import viProducts from "./locales/vi/sections/Products.json";
import enProducts from "./locales/en/sections/Products.json";
import viCollections from "./locales/vi/sections/Collections.json";
import enCollections from "./locales/en/sections/Collections.json";

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
         vi: { components: { PromoBanner: viPromo, Header: viHeader }, sections: { Products: viProducts, Collections: viCollections } },
         en: { components: { PromoBanner: enPromo, Header: enHeader }, sections: { Products: enProducts, Collections: enCollections } },
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


