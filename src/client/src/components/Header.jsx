import { useTranslation } from "react-i18next";
import { BsDice5Fill } from "react-icons/bs";
import useScreenSize from "../hooks/useScreenSize";
import useDarkValue from "../hooks/useDarkValue";
import HeaderButtons from "./HeaderButtons";
import { useAppContext } from '../context/AppContext';

const colors = {
  light: {
    header: '#9A1663',
    icon: '#EBEBEB',
    title: '#EBEBEB',
    slogan: '#EBEBEB',
    subHeader: '#EBEBEB',
  },
  dark: {
    header: '#FFDE00',
    icon: '#2C3333',
    title: '#2C3333',
    slogan: '#2C3333',
    subHeader: '#2C3333',
  },
};

const Header = () => {
  const { t } = useTranslation('global');
  const { width } = useScreenSize();
  const color = useDarkValue(colors.light, colors.dark);
  const { appContext, setAppContext } = useAppContext();
  const handleReturn = () => {
    setAppContext({ ...appContext, state: 'initial', type: 1, columnA: [], columnB: [],});
    appContext.nav('/');
  };
  return (
    <div
      style={{ backgroundColor: color.header, }}
      className="header__container--back"
    >
      <header
        className="header__container"
        >
        <div className="header__main">
          <div
            className="header__main--title"
            >
            <div className="header-icon__container">
              <BsDice5Fill
                style={{ color: color.icon, }}
                className="header-icon"
                />
            </div>
            <h2
              style={{ color: color.title, }}
              onClick={handleReturn}
            >
              elige.me
            </h2>
          </div>
          {
            (width > 1000) && (
              <div
                style={{ borderLeft: `2px solid ${color.slogan}`, }}
                className="header__main--slogan"
              >
                <h1 style={{ color: color.slogan, }}>
                  {t('header.slogan')}
                </h1>
              </div>
            )
          }
        </div>
        {(width > 600) && <HeaderButtons subHeader={false} />}
      </header>
      {
        (width <= 600) && (
          <div
            style={{ backgroundColor: color.subHeader, }}
            className="subheader__container"
          >
            <HeaderButtons subHeader={true} />
          </div>
        )
      }
    </div>
  );
};

export default Header;