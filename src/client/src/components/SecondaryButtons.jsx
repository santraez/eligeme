import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import useDarkValue from "../hooks/useDarkValue";
import useScreenSize from "../hooks/useScreenSize";
import toast, { Toaster } from 'react-hot-toast';
import useDarkMode from "../hooks/useDarkMode";

const colors = {
  light: {
    backname: "#FFF7B9",
    name: "#2C3333",
    backButton1: "#2C3333",
    backButton2: "#9A1663",
    button: "#EBEBEB",
    alert: '#FFDE00',
    textAlert: '#2C3333',
    border: '#FFDE00',
    rowData: 'sec-data__container--light'
  },
  dark: {
    backname: "#3D323A",
    name: "#EBEBEB",
    backButton1: "#EBEBEB",
    backButton2: "#FFDE00",
    button: "#2C3333",
    alert: '#9A1663',
    textAlert: '#EBEBEB',
    border: '#9A1663',
    rowData: 'sec-data__container--dark'
  },
};

const { REACT_APP_DOMAIN } = process.env;

const SecondaryButtons = () => {
  const { appContext, setAppContext } = useAppContext();
  const [darkMode, setDarkMode] = useDarkMode();
  const color = useDarkValue(colors.light, colors.dark);
  const { width } = useScreenSize();
  const { t } = useTranslation('global');
  useEffect(() => {
    setDarkMode(darkMode);
  }, [darkMode]);
  const handleShare = async () => {
    const url = `${REACT_APP_DOMAIN}/result/${appContext.idItem}`;
    try {
      await navigator.clipboard.writeText(url);
      notify('copy');
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const handleReturn = () => {
    setAppContext({ ...appContext, row: 1, state: 'initial', code: 0, name: '',});
    // setAppContext({ ...appContext, state: 'initial', type: 1, columnA: [], columnB: [], name: '',});
    appContext.nav('/');
  };
  const notify = (type) => {
    const typeAlert = {
      empty: t('body.alert-empty'),
      name: t('body.alert-name'),
      column: t('body.alert-column'),
      copy: t('body.alert-copy'),
    };
    toast(t(typeAlert[type]), {
      id: type,
      position: "bottom-center",
      style: {
        borderRadius: '0px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
        background: color.alert,
        color: color.textAlert,
        padding: '12px',
        // border: `7px solid ${color.border}`,
        fontWeight: '700',
        fontSize: '27px',
        marginBottom: '400px',
      },
    });
  };
  let typeValue = '';
  if (appContext.type === 1) {
    typeValue = t('body.choose-button');
  } else if (appContext.type === 2) {
    typeValue = t('body.order-button');
  } else if (appContext.type === 3) {
    typeValue = t('body.group-button');
  } else if (appContext.type === 4) {
    typeValue = t('body.assign-button');
  };
  return (
    <div className="secondary-buttons__container">
      <div
        style={{
          flexDirection: (width <= 600) ? 'column-reverse' : 'row',
          alignItems: (width <= 600) ? 'flex-start' : 'flex-end',
          height: (width <= 600) ? '85px' : '30px',
          justifyContent: (width <= 600) ? 'flex-end' : 'space-between',
        }}
        className={color.rowData}
      >
        <div
          style={{
            flexDirection: (width <= 600) ? 'column' : 'row',
          }}
          className="sec-data__container--data1"
        >
          <p>{`${t('body.text-type')} `}<span>{typeValue}</span></p>
          <p
            style={{
              marginLeft: (width <= 600) ? '0px' : '30px',
              marginTop: (width <= 600) ? '8px' : '0px',
              marginBottom: (width <= 600) ? '5px' : '0px',
            }}
            className="sec-data__container--link"
            onClick={handleReturn}
          >
            {t('body.text-link')}
          </p>
        </div>
        <p
          style={{
            marginBottom: (width <= 600) ? '9px' : '0px',
          }}
          className="sec-data__container--data2"
        >
          {t('body.text-code')} <span>{appContext.code}</span>
        </p>
      </div>
      <div
        style={{ backgroundColor: color.backname, }}
        className="sec-name__container"
      >
        <p style={{ color: color.name, }}>
          {(appContext.name === 'Unnamed' || appContext.name === 'Sin nombre' || appContext.name === 'Sans nom') ? t('body.input-name-default') : appContext.name}
        </p>
      </div>
      <div className="sec-button__container">
        <button
          style={{
            width: '40%',
            backgroundColor: color.backButton1,
            color: color.button,
            fontSize: (width <= 600) ? '24px' : '30px',
          }}
          onClick={handleReturn}
        >
          {t('body.return-button')}
        </button>
        <button 
          style={{
            width: '58%',
            backgroundColor: color.backButton2,
            color: color.button,
            fontWeight: '700',
            fontSize: '30px',
          }}
          onClick={handleShare}
        >
          {t('body.share-button')}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default SecondaryButtons;