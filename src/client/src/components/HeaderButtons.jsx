import { useEffect } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useDarkValue from "../hooks/useDarkValue";
import useLanguage from "../hooks/useLanguage";

const colorsA = {
  light: {
    toogleBox: '#EBEBEB',
    toogle: '#9A1663',
    textButtonOn: '#9A1663',
    textButtonOff: '#EBEBEB',
    backButtonOn: '#EBEBEB',
    backButtonOff: '#9A1663',

  },
  dark: {
    toogleBox: '#2C3333',
    toogle: '#FFDE00',
    textButtonOn: '#FFDE00',
    textButtonOff: '#2C3333',
    backButtonOn: '#2C3333',
    backButtonOff: '#FFDE00',
  },
};
const colorsB = {
  light: {
    toogleBox: '#2C3333',
    toogle: '#EBEBEB',
    textButtonOn: '#EBEBEB',
    textButtonOff: '#2C3333',
    backButtonOn: '#2C3333',
    backButtonOff: '#EBEBEB',

  },
  dark: {
    toogleBox: '#EBEBEB',
    toogle: '#2C3333',
    textButtonOn: '#2C3333',
    textButtonOff: '#EBEBEB',
    backButtonOn: '#EBEBEB',
    backButtonOff: '#2C3333',
  },
};

const HeaderButtons = ({ subHeader }) => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [language, setLanguage] = useLanguage();
  const colorA = useDarkValue(colorsA.light, colorsA.dark);
  const colorB = useDarkValue(colorsB.light, colorsB.dark);
  return (
    <div className="header-buttons__container">
      <div
        className="dark-mode__box"
        style={{
          justifyContent: useDarkValue('flex-start', 'flex-end'),
          backgroundColor: (subHeader) ? colorB.toogleBox : colorA.toogleBox,
        }}
        onClick={() => setDarkMode(!darkMode)}
      >
        <div
          className="dark-mode__toggle"
          style={{ backgroundColor: (subHeader) ? colorB.toogle : colorA.toogle, }}
        />
      </div>
      <div className="language-buttons__box">
        <button
          className="language-button"
          style={{
            color: (language === 'en') ? ((subHeader) ? colorB.textButtonOn : colorA.textButtonOn) : ((subHeader) ? colorB.textButtonOff : colorA.textButtonOff),
            backgroundColor: (language === 'en') ? ((subHeader) ? colorB.backButtonOn : colorA.backButtonOn) : ((subHeader) ? colorB.backButtonOff : colorA.backButtonOff),
            fontWeight: (language === 'en') ? '700' : '400',
          }}
          onClick={() => setLanguage('en')}
        >
            en
        </button>
        <button
          className="language-button"
          style={{
            color: (language === 'es') ? ((subHeader) ? colorB.textButtonOn : colorA.textButtonOn) : ((subHeader) ? colorB.textButtonOff : colorA.textButtonOff),
            backgroundColor: (language === 'es') ? ((subHeader) ? colorB.backButtonOn : colorA.backButtonOn) : ((subHeader) ? colorB.backButtonOff : colorA.backButtonOff),
            fontWeight: (language === 'es') ? '700' : '400',
          }}
          onClick={() => setLanguage('es')}
        >
          es
        </button>
        <button
          className="language-button"
          style={{
            color: (language === 'fr') ? ((subHeader) ? colorB.textButtonOn : colorA.textButtonOn) : ((subHeader) ? colorB.textButtonOff : colorA.textButtonOff),
            backgroundColor: (language === 'fr') ? ((subHeader) ? colorB.backButtonOn : colorA.backButtonOn) : ((subHeader) ? colorB.backButtonOff : colorA.backButtonOff),
            fontWeight: (language === 'fr') ? '700' : '400',
          }}
          onClick={() => setLanguage('fr')}
        >
          fr
        </button>
      </div>
    </div>
  );
};

export default HeaderButtons;