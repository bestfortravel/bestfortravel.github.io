import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import uk from '@/locales/uk.json';

const dictionary: any = { en, ru, uk };

export function useTranslations(lang: string) {
  return (key: string) => {
    const [group, field] = key.split('.');
    return dictionary[lang]?.[group]?.[field] || key;
  };
}
