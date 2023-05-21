import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import App from './App';
import globalEs from './translations/es/global.json';
import globalEn from './translations/en/global.json';
import globalFr from './translations/fr/global.json';
import './styles/css/App.css';

const LANGUAGE = {
  'es': 'es',
  'es-ES': 'es',
  'es-419': 'es',
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'fr': 'fr',
  'fr-FR': 'fr',
  'fr-CA': 'fr',
};
const DEFAULT_LANGUAGE = 'en';
export const lang = JSON.parse(window.localStorage.getItem('language')) || LANGUAGE[navigator.language] || DEFAULT_LANGUAGE;
i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: lang,
  resources: {
    es: {
      global: globalEs,
    },
    en: {
      global: globalEn,
    },
    fr: {
      global: globalFr,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);