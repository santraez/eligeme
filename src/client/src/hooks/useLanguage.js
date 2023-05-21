import { useTranslation } from 'react-i18next';
import useLocalStorage from './useLocalStorage';
import { lang } from '../index';

const useLanguage = () => {
  const [language, setLanguage] = useLocalStorage('language', lang);
  const { i18n } = useTranslation('global');
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };
  return [language, changeLanguage];
};

export default useLanguage;