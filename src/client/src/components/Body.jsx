import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import useScreenSize from "../hooks/useScreenSize";
import useDarkValue from "../hooks/useDarkValue";
import AppRouter from "../routes/AppRouter";
import PrimaryButtons from "./PrimaryButtons";
import AdSpace from "./AdSpace";
import SecondaryButtons from "./SecondaryButtons";
import useDarkMode from "../hooks/useDarkMode";
import { useEffect, useState } from "react";
import ColumnBar from "./ColumnBar";

const colors = {
  light: {
    message: '#9A1663',
    button: '#2C3333',
    text: '#EBEBEB',
    delete: '#FFDE00',
  },
  dark: {
    message: '#FFDE00',
    button: '#EBEBEB',
    text: '#2C3333',
    delete: '#9A1663',
  },
};

const Body = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const { appContext, setAppContext } = useAppContext();
  //console.log("🚀 ~ file: Body.jsx:31 ~ Body ~ appContext", appContext)
  const { t } = useTranslation('global');
  const { width } = useScreenSize();
  const color = useDarkValue(colors.light, colors.dark);
  const [appRouterState, setAppRouterState] = useState(<AppRouter />);
  const [scrollState, setScrollState] = useState(false);
  // console.log("🚀 ~ file: Body.jsx:37 ~ Body ~ scrollState", scrollState)
  const message = () => {
    switch (appContext.state) {
      case 'initial':
        return t('body.state-hello');
      case 'loading':
        return t('body.state-wow');
      case 'result':
        return t('body.state-ready');
      default:
        return t('body.state-hello');
    };
  };
  useEffect(() => {
    setDarkMode(darkMode);
  }, [darkMode]);
  
  useEffect(() => {
    const flatten = (arr) => {
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          result = result.concat(flatten(arr[i]));
        } else {
          result.push(arr[i]);
        };
      };
      return result;
    }
    const showScroll = () => {
      // console.log('entroooooo');
      if (appContext.state === 'loading') {
        setScrollState(true);
        return;
      } else if (appContext.state === 'initial') {
        if (appContext.numberInpContext < 5) {
          setScrollState(true);
          return;
        } else {
          setScrollState(false);
          return;
        };
      } else if (appContext.state === 'result') {
        if (appContext.type === 1 || appContext.type === 2) {
          if (appContext.numberResult <= 5) {
            setScrollState(true);
            return;
          } else {
            setScrollState(false);
            return;
          };
        } else if (appContext.type === 4) {
          if (appContext.numberResult < 3) {
            setScrollState(true);
            return;
          } else {
            setScrollState(false);
            return;
          };
        } else if (appContext.type === 3) {
          if (appContext.resultData && flatten(appContext.resultData).length <= 5) {
            setScrollState(true);
            return;
          } else {
            setScrollState(false);
            return;
          };
        };
      } else {
        setScrollState(false);
        return;
      };
    };
    showScroll();
  }, [appContext.state, appContext.numberInpContext, appContext.numberResult, appContext.type]);


  useEffect(() => {
    const updateAppRouter = () => {
      if (appContext.deleteAll) {
      setAppRouterState(<></>);
      setAppContext({ ...appContext, deleteAll: false });
      } else {
        setAppRouterState(<AppRouter />);
      }
    };
    updateAppRouter();
  }, [appContext.deleteAll]);
  // window.onhashchange=function(){
  //   alert("hola");
  // };

  // esto es para saber si recargo la pagina
  // useEffect(() => {
  //   const noatras = () => {
  //     var perfEntries = performance.getEntriesByType("navigation");
  //     for (var i = 0; i < perfEntries.length; i++) {
  //         console.log(perfEntries[i].type);
  //     }
  //   }
  //   noatras();
  // }, []);


  // window.history.pushState({page: 1}, "", "");
  // window.onpopstate = function(event) {
  //   console.log('1')
  //   console.log("🚀 ~ file: Body.jsx:40 ~ Body ~ event", event)
  //   // "event" object seems to contain value only when the back button is clicked
  //   // and if the pop state event fires due to clicks on a button
  //   // or a link it comes up as "undefined" 
  //   if(event){
  //     console.log('2')
  //     // Code to handle back button or prevent from navigation
  //   }
  //   else{
  //     console.log('3')
  //     // Continue user action through link or button
  //   }
  // };

  // useEffect(() => {
  //   const noatras = () => {
  //     window.location.hash = "no-back-button";
  //     window.location.hash = "Again-No-back-button"
  //     window.onhashchange = () => {
  //       window.location.hash="no-back-button";
  //     }
  //   }
  //   noatras();
  // }, []);
  const stateButtons = () => {
    switch (appContext.state) {
      case 'initial':
        return (
          <div>
            <PrimaryButtons />
          </div>
        );
      case 'loading':
        return (
          <></>
          // <div
          //   style={{
          //     height: (width <= 600) ? '220px' : '100px',
          //     backgroundColor: color.button,
          //     color: color.text,
          //     fontSize: (width <= 500) ? '32px' : '44px',
          //   }}
          //   className="process-button"
          // >
          //   <span>{t('body.processing-button')}</span>
          // </div>
        );
      case 'result':
        return (
          <div>
            <SecondaryButtons />
          </div>
        );
      default:
        return (
          <div>
            <PrimaryButtons />
          </div>
        );
    };
  };





  return (
    <div className="body__container--back">
      <section className="body__container">
        <article 
          style={{ width: (width > 1000) ? '85%': '100%', }}
          className="body-article"
        >
          <div 
            className="body-article__message"
            style={
              (width <= 600) ? ((appContext.type === 4 ) ? {
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
              } : {
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'column',
              }) : ((appContext.state === 'result') ? {
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              } : {
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              })
            }
          >
            <h3 style={{ color: color.message }}>
              {message()}
            </h3>
            {(appContext.state === 'initial') && <button 
              onClick={() => {
                setAppContext({ ...appContext, row: 1, columnA: [], columnB: [], columnAvalue: '', columnBvalue: '', numberInpContext: 4, deleteAll: !appContext.deleteAll, });
              }}
              style={{
              color: color.button,
              marginTop: (width <= 600) ? '30px' : '0px',
              backgroundColor: color.delete,
            }}>{t('body.delete-all')}</button>}
            {(appContext.state === 'result') && <p style={{
              color: color.button,
              marginTop: (width <= 600) ? '15px' : '0px',
            }}>{appContext.date}</p>}
          </div>
          {/* {
            (width <= 1000) && (
              <div
                style={{ marginBottom: '10px', }}
                className="body-article__ad-container"
              >
                <AdSpace width={300} height={50} />
              </div>
            )
          }
          {
            (width <= 1000 && appContext.state === "result") && (
              <div className="body-article__ad-container">
                <AdSpace width={300} height={50} />
              </div>
            )
          } */}
          {(appContext.state === 'initial') && <ColumnBar />}
          <div
            style={{
              height: (appContext.state === 'loading') ? '520px' : '340px',
              
            }}
            className={scrollState ? "app-router__container app-router__hidden-scroll" : "app-router__container"}
          >
            {appRouterState}
          </div>
          {stateButtons()}
          {/* {
            (width > 1000) && (
              <div style={{ marginBottom: '10px', }}>
                <AdSpace width={728} height={90} />
              </div>
            )
          }
          {
            (width > 1000 && appContext.state === "result") && (
              <div>
                <AdSpace width={728} height={90} />
              </div>
            )
          } */}
        </article>
        {/* <aside className="body-aside">
          {(width > 1000) && <div style={{ marginBottom: '10px', }}><AdSpace width={300} height={600} /></div>}
          {(width > 700 && width <= 1000) && <AdSpace width={300} height={250} />}
          <AdSpace width={300} height={250} dataAdSlot="1978362315" />
        </aside> */}
      </section>
    </div>
  );
};

export default Body;