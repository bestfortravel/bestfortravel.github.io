'use client';

import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import en from '@/locales/en.json';
import ua from '@/locales/ua.json';
import de from '@/locales/de.json';
import ru from '@/locales/ru.json';

type Locale = 'en' | 'ua' | 'de' | 'ru';
type Dict = Record<string, any>;

type I18nContext = {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
};

const I18nCtx = createContext<I18nContext | null>(null);

function getNavigatorLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language?.toLowerCase() || 'en';
  if (lang.startsWith('ua')) return 'ua';
  if (lang.startsWith('de')) return 'de';
  if (lang.startsWith('ru')) return 'ru';
  return 'en';
}

const DICTS: Record<Locale, Dict> = { en, ua, de, ru };

function getByPath(obj: Dict, path: string): string {
  return path.split('.').reduce<any>((acc, cur) => (acc && acc[cur] != null ? acc[cur] : undefined), obj) ?? '';
}

export function TranslationProvider({children}: {children: React.ReactNode}) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('locale') as Locale) || getNavigatorLocale();
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
    // you can also toggle <html lang="..."> or direction if needed:
    document.documentElement.lang = locale;
    document.documentElement.dir = 'ltr';
  }, [locale]);

  const dict = DICTS[locale] || DICTS.en;

  const value = useMemo<I18nContext>(() => ({
    locale,
    setLocale,
    t: (key: string) => getByPath(dict, key) || key,
    dir: 'ltr',
  }), [locale, dict]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used within TranslationProvider');
  return ctx;
}
