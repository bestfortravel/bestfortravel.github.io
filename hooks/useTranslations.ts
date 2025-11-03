import en from '@/locales/en.json';
import de from '@/locales/de.json';
import ru from '@/locales/ru.json';
import ua from '@/locales/ua.json';

const dictionary: any = { en, de, ru, ua };

export function useTranslations(lang: string) {
  return (key: string) => {
    const [group, field] = key.split('.');
    return dictionary[lang]?.[group]?.[field] || key;
  };
}
