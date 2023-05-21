import { useTranslation } from "react-i18next";
import { useAppContext } from '../context/AppContext';
import useDarkValue from "../hooks/useDarkValue";
import useScreenSize from "../hooks/useScreenSize";

const colors = {
  light: {
    text: '#EBEBEB',
    button: '#2C3333',
    shadow: '#FFDE00',
  },
  dark: {
    text: '#2C3333',
    button: '#EBEBEB',
    shadow: '#9A1663',
  },
};

const ColumnBar = () => {
  const { appContext, setAppContext } = useAppContext();
  const color = useDarkValue(colors.light, colors.dark);
  const { width } = useScreenSize();
  const { t } = useTranslation('global');
  return (
    <>
    {
      (width <= 600 && appContext.type === 4) && (
        <div className="row-buttons__container">
          <div className="row-button">
            <button
              style={{ backgroundColor: color.button, color: color.text, }}
              onClick={() => setAppContext({ ...appContext, row: 1 })}
            >
              <p>{t('body.row-a-button')}</p>
            </button>
            {(appContext.row === 1) && <div style={{ backgroundColor: color.shadow }} className="row-button--active" />}
          </div>
          <div className="row-button">
            <button
              style={{ backgroundColor: color.button, color: color.text, }}
              onClick={() => setAppContext({ ...appContext, row: 2 })}
            >
              <p>{t('body.row-b-button')}</p>
            </button>
            {(appContext.row === 2) && <div style={{ backgroundColor: color.shadow }} className="row-button--active" />}
          </div>
        </div>
      )
    }
    </>
  );
};

export default ColumnBar;