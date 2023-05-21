import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useAppContext } from '../context/AppContext';
import useDarkValue from "../hooks/useDarkValue";
import useScreenSize from "../hooks/useScreenSize";
import useRandom from '../hooks/useRandom';
import ajaxMethod from '../helpers/ajaxMethod';
import toast, { Toaster } from 'react-hot-toast';

const colors = {
  light: {
    button: '#2C3333',
    text: '#EBEBEB',
    alert: '#FFDE00',
    textAlert: '#2C3333',
    border: '#FFDE00',
    activeButton: 'bar-start__button--light',
    activeCounter: 'bar-start__counter--light',
  },
  dark: {
    button: '#EBEBEB',
    text: '#2C3333',
    alert: '#9A1663',
    textAlert: '#EBEBEB',
    border: '#9A1663',
    activeButton: 'bar-start__button--dark',
    activeCounter: 'bar-start__counter--dark',
  },
};

const { REACT_APP_SERVER_HOST } = process.env;

const BarStart = () => {
  const [numberItems, setNumberItems] = useState(1);
  const { appContext, setAppContext } = useAppContext();
  const color = useDarkValue(colors.light, colors.dark);
  // const [counterDb, setCounterDb] = useState(0);
  // console.log("🚀 ~ file: BarStart.jsx:38 ~ BarStart ~ counterDb", typeof(counterDb))
  const { width } = useScreenSize();
  const { t } = useTranslation('global');
  const { result } = useRandom({
    type: appContext.type,
    number: numberItems,
    columnA: appContext.columnA,
    columnB: appContext.columnB,
  });

  // const getCounterData = async () => {
  //   try {
  //     const url = `${REACT_APP_SERVER_HOST}/api/counter`;
  //     const { data } = await ajaxMethod(url, 'GET');
  //     if (data.status === 'error') {
  //       return;
  //     };
  //     return setCounterDb(data.data);
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   };
  // };
  const URI = `${REACT_APP_SERVER_HOST}/api/public`;
  const nameValue = (appContext.name === '') ? t('body.input-name-default') : appContext.name;
  const body = { 
    name: nameValue,
    type: appContext.type,
    inputs: appContext.numberInpContext,
    values: {
      columnA: appContext.columnAvalue,
      columnB: appContext.columnBvalue,
      // columnA: appContext.columnA,
      // columnB: appContext.columnB,
    },
    result: result,
    date: new Date().toLocaleString(),
  };
  const notify = (type) => {
    const typeAlert = {
      empty: t('body.alert-empty'),
      name: t('body.alert-name'),
      column: t('body.alert-column'),
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
  const videoId = 'qJGHhb2A54M';
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const youtubeAppUrl = `vnd.youtube://${videoId}`;
  const clickLink = () => {
    let url = youtubeUrl;
    if (navigator.userAgent.match(/Android/i)) {
      url = youtubeAppUrl;
    } else if (navigator.userAgent.match(/iPad|iPhone|iPod/i)) {
      url = youtubeAppUrl;
    }
    window.open(url);
  };
  const handleStart = async () => {
    if (appContext.type === 1 || appContext.type === 2) {
      if (appContext.columnA.length < 2) {
        notify('empty');
        return;
      // } else if (appContext.name === '') {
      //   notify('name');
      //   return;
      } else {
        try {
          setAppContext({ ...appContext, state: 'loading', });
          window.scrollTo(0, 0);
          const url = `${REACT_APP_SERVER_HOST}/api/counter`;
          const codeData = await ajaxMethod(url, 'GET');
          if (codeData.data.status === 'success') {
            const newBody = { ...body, codeId: codeData.data.data + 1 };
            const { data } = await ajaxMethod(URI, 'POST', newBody);
            if (data.status === "success") {
              setTimeout(() => {
                setAppContext({ ...appContext, state: 'result', });
                appContext.nav('/result/' + data.data);
              }, 1000);
              return;
            } else {
              setAppContext({ ...appContext, state: 'initial', });
              return;
            };
          } else {
            setAppContext({ ...appContext, state: 'initial', });
            return;
          };
        } catch (err) {
          console.log(err)
          return;
        };
      };
    } else if (appContext.type === 3) {
      if (appContext.columnA.length < 4) {
        notify('empty');
        return;
      // } else if (appContext.name === '') {
      //   notify('name');
      //   return;
      } else {
        try {
          setAppContext({ ...appContext, state: 'loading', });
          window.scrollTo(0, 0);
          const url = `${REACT_APP_SERVER_HOST}/api/counter`;
          const codeData = await ajaxMethod(url, 'GET');
          if (codeData.data.status === 'success') {
            const newBody = { ...body, codeId: codeData.data.data + 1 };
            const { data } = await ajaxMethod(URI, 'POST', newBody);
            if (data.status === "success") {
              setTimeout(() => {
                setAppContext({ ...appContext, state: 'result', });
                appContext.nav('/result/' + data.data);
              }, 2000);
              return;
            } else {
              setAppContext({ ...appContext, state: 'initial', });
              return;
            };
          } else {
            setAppContext({ ...appContext, state: 'initial', });
            return;
          };
        } catch (err) {
          console.log(err)
          return;
        };
      };
    } else if (appContext.type === 4) {
      if (appContext.columnA.length < 2) {
        notify('empty');
        return;
      } else if (appContext.columnA.length !== appContext.columnB.length) {
        notify('column');
        return;
      // } else if (appContext.name === '') {
      //   notify('name');
      //   return;
      } else {
        try {
          setAppContext({ ...appContext, state: 'loading', });
          window.scrollTo(0, 0);
          const url = `${REACT_APP_SERVER_HOST}/api/counter`;
          const codeData = await ajaxMethod(url, 'GET');
          if (codeData.data.status === 'success') {
            const newBody = { ...body, codeId: codeData.data.data + 1 };
            const { data } = await ajaxMethod(URI, 'POST', newBody);
            if (data.status === "success") {
              setTimeout(() => {
                setAppContext({ ...appContext, state: 'result', });
                appContext.nav('/result/' + data.data);
              }, 2000);
              return;
            } else {
              setAppContext({ ...appContext, state: 'initial', });
              return;
            };
          } else {
            setAppContext({ ...appContext, state: 'initial', });
            return;
          };
        } catch (err) {
          console.log(err)
          return;
        };
      };
    } else {
      return;
    }
  };
  return (
    <>
    <div
      style={{ height: (width <= 600) ? '220px' : '100px', }}
      className='bar-start__container'
    >
      <button
        style={{
          width: (((appContext.type === 1) && (appContext.columnA.length > 1)) || ((appContext.type === 3) && (appContext.columnA.length > 3))) ? ((width <= 600) ? '65%' : '60%') : '100%',
          backgroundColor: color.button,
          color: color.text,
        }}
        className={color.activeButton}
        onClick={handleStart}
      >
        {t('body.start-button')}
      </button>
    {
      ((appContext.type === 1) && (appContext.columnA.length > 1)) && (
        <div
          style={{
            width: (width <= 600) ? '32.2%' : '37.2%',
            flexDirection: (width <= 600) ? 'column-reverse' : 'row',
            border: `10px solid ${color.button}`,
          }}
          className={color.activeCounter}
        >
          <p
            style={{ color: color.button }}
            className='bar-start__icons-substract'
            onClick={() => setNumberItems(numberItems - ((numberItems > 1) ? 1 : 0))}
          >-</p>
          <p
            style={{ color: color.button }}
            className='bar-start__number'
          >
            {(numberItems > (appContext.columnA.length - 1)) ? (() => {
              setNumberItems(numberItems - 1);
              return numberItems - 1;
              })() : numberItems}
          </p>
          <p
            style={{ color: color.button }}
            className='bar-start__icons-add'
            onClick={() => setNumberItems(numberItems + ((numberItems < (appContext.columnA.length - 1)) ? 1 : 0))}
          >+</p>
        </div>
      )
    }
    {
      ((appContext.type === 3) && (appContext.columnA.length > 3)) && (
        <div
          style={{
            width: (width <= 600) ? '32.2%' : '37.2%',
            flexDirection: (width <= 600) ? 'column-reverse' : 'row',
            border: `10px solid ${color.button}`,
          }}
          className={color.activeCounter}
        >
          <p
            style={{ color: color.button }}
            className='bar-start__icons-substract'
            onClick={() => setNumberItems(numberItems - ((numberItems > 2) ? 1 : 0))}
          >-</p>
          <p
            style={{ color: color.button }}
            className='bar-start__number'
          >
            {(numberItems > (appContext.columnA.length - 2)) ? (() => {
              setNumberItems(numberItems - 1);
              return numberItems - 1;
              })() : ((numberItems === 1) ? (() => {
                setNumberItems(numberItems + 1);
                return numberItems + 1;
              })() : numberItems)}
          </p>
          <p
            style={{ color: color.button }}
            className='bar-start__icons-add'
            onClick={() => setNumberItems(numberItems + ((numberItems < (appContext.columnA.length - 2)) ? 1 : 0))}
          >+</p>
        </div>
      )
    }
    <Toaster />
    </div>
    <div onClick={clickLink} className='text-tutorial' style={{
      position: 'absolute',
      left: (width <= 600) ? '10px' : 'calc(50% + 100px)',
      top: '70px',
      padding: '7px 10px',
      backgroundColor: color.button,
      fontWeight: '700',
      fontSize: '14px',
      textTransform: 'uppercase',
      color: color.text,
      borderRadius: '0px 0px 13px 13px',
      cursor: 'pointer',
    }}>
      {t('body.text-tutorial')}
    </div>
    </>
  );
};

export default BarStart;