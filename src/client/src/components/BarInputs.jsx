import { useTranslation } from "react-i18next";
import { useAppContext } from '../context/AppContext';
import useDarkValue from "../hooks/useDarkValue";
import useScreenSize from "../hooks/useScreenSize";
import { FaHandPointUp } from "react-icons/fa";
import { TbListNumbers } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi";
import { TbArrowsRightLeft } from "react-icons/tb";

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

const BarInputs = () => {
  const { appContext, setAppContext } = useAppContext();
  const color = useDarkValue(colors.light, colors.dark);
  const { width } = useScreenSize();
  const { t } = useTranslation('global');
  return (
    <>
    {/* {
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
    } */}
    <div 
      style={{ marginTop: (width <= 600) ? '0px' : '40px', }}
      className='bar-inputs__container'>
      <div
        className='bar-inputs__button-box'
      >
        <div
          style={{ color: color.button, }}
          className="bar-inputs__text"
        >
          {(appContext.type === 1) && <p>{t('body.choose-button')}</p>}
        </div>
        <button 
          onClick={() => setAppContext({ ...appContext, type: 1, row: 1 })}
          style={{ backgroundColor: color.button, color: color.text, }}
        >
          {(width > 600) && t('body.choose-button')}
          {(width <= 600) && <FaHandPointUp className='bar-inputs__icons' />}
        </button>
        {
          (appContext.type === 1) && (
            <div
              style={{ backgroundColor: color.shadow, }}
              className='bar-inputs__button--active'
            />
          )
        }
      </div>
      <div className='bar-inputs__button-box'>
        <div
          style={{ color: color.button, }}
          className="bar-inputs__text"
        >
          {((width <= 600) && (appContext.type === 2)) && <p>{t('body.order-button')}</p>}
        </div>
        <button
          onClick={() => setAppContext({ ...appContext, type: 2, row: 1 })}
          style={{ backgroundColor: color.button, color: color.text, }}
        >
          {(width > 600) && t('body.order-button')}
          {(width <= 600) && <TbListNumbers className='bar-inputs__icons' />}
        </button>
        {
          (appContext.type === 2) && (
            <div
              style={{ backgroundColor: color.shadow, }}
              className='bar-inputs__button--active'
            />
          )
        }
      </div>
      <div className='bar-inputs__button-box'>
        <div
          style={{ color: color.button, }}
          className="bar-inputs__text"
        >
          {((width <= 600) && (appContext.type === 3)) && <p>{t('body.group-button')}</p>}
        </div>
        <button
          onClick={() => setAppContext({ ...appContext, type: 3, row: 1 })}
          style={{ backgroundColor: color.button, color: color.text, }}
        >
          {(width > 600) && t('body.group-button')}
          {(width <= 600) && <HiUserGroup className='bar-inputs__icons' />}
        </button>
        {
          (appContext.type === 3) && (
            <div
              style={{ backgroundColor: color.shadow, }}
              className='bar-inputs__button--active'
            />
          )
        }
      </div>
      <div className='bar-inputs__button-box'>
        <div
          style={{ color: color.button, }}
          className="bar-inputs__text"
        >
          {((width <= 600) && (appContext.type === 4)) && <p>{t('body.assign-button')}</p>}
        </div>
        <button
          onClick={() => setAppContext({ ...appContext, type: 4 })}
          style={{ backgroundColor: color.button, color: color.text, }}
        >
          {(width > 600) && t('body.assign-button')}
          {(width <= 600) && <TbArrowsRightLeft className='bar-inputs__icons' />}
        </button>
        {
          (appContext.type === 4) && (
            <div
              style={{ backgroundColor: color.shadow, }}
              className='bar-inputs__button--active'
            />
          )
        }
      </div>
    </div>
    </>
  );
};

export default BarInputs;