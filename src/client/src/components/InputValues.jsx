import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiPlusMedical } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext';
import { useParams } from "react-router-dom";
import useDarkValue from "../hooks/useDarkValue";
import useScreenSize from "../hooks/useScreenSize";
import useForm from "../hooks/useForm";
import convertToArray from "../helpers/convertToArray";
import Pipocas from "./Pipocas";
import { IoTrashBin } from "react-icons/io5";

const colors = {
  light: {
    numberBoxOdd: '#2C3333',
    numberBoxEven: '#596B6B',
    number: '#EBEBEB',
    text: '#2C3333',
    focus: 'inputs__element--input-light',
    pipocas: '#2C3333',
    // pipocas: '#FFDE00',
    delete: '#2C3333',
    add: '#9A1663',
    hover: 'inputs__element--number-light',
  },
  dark: {
    numberBoxOdd: '#EBEBEB',
    numberBoxEven: '#8D8B8B',
    number: '#2C3333',
    text: '#EBEBEB',
    focus: 'inputs__element--input-dark',
    pipocas: '#EBEBEB',
    // pipocas: '#9A1663',
    delete: '#EBEBEB',
    add: '#FFDE00',
    hover: 'inputs__element--number-dark',
  },
};
// const colors = {
//   light: {
//     numberBoxOdd: '#A7A7A7',
//     numberBoxEven: '#CBCBCB',
//     number: '#EBEBEB',
//     text: '#A7A7A7',
//     focus: 'inputs__element--input-light',
//     pipocas: '#FFDE00',
//     delete: '#9A1663',
//   },
//   dark: {
//     numberBoxOdd: '#585858',
//     numberBoxEven: '#424242',
//     number: '#2C3333',
//     text: '#585858',
//     focus: 'inputs__element--input-dark',
//     pipocas: '#9A1663',
//     delete: '#FFDE00',
//   },
// };

const InputValues = () => {
  // const [numberInput, setNumberInput] = useState(4);
  const { appContext, setAppContext } = useAppContext();
  // console.log("🚀 ~ file: InputValues.jsx:64 ~ InputValues ~ appContext", appContext)
  const { id } = useParams();
  const formContextA = useForm();
  const formContextB = useForm();
  const navigate = useNavigate();
  const color = useDarkValue(colors.light, colors.dark);
  const { width } = useScreenSize();
  const [update, setUpdate] = useState(false);
  const [focus, setFocus] = useState(false);
  const { t } = useTranslation('global');
  // const [columnAvalueState, setColumnAvalueState] = useState(appContext.columnAvalue);
  // const [columnBvalueState, setColumnBvalueState] = useState(appContext.columnBvalue);
  useEffect(() => {
    if (appContext.state === 'initial') {
      document.getElementById('0a').focus();
      window.scrollTo(0, 0);
    } else {
      return;
    };
  }, [appContext.state]);



  // useEffect(() => {
  //   setAppContext({ ...appContext, numberInpContext: numberInput, });
  // }, [numberInput]);
  useEffect(() => {
    if (!id) {
      setAppContext({ ...appContext, state: 'initial', });
      return
    } else {
      return;
    };
  }, [update]);





  // Utilizamos useEffect para ejecutar el código una vez que el componente ha sido montado
  // Seleccionamos todos los input del documento
  
  // Iteramos sobre cada input y asignamos el evento keydown a cada uno de ellos
  // const handleKeyDown = (event) => {
  //   const inputs = document.querySelectorAll('input');
  //   console.log("🚀 ~ file: InputValues.jsx:72 ~ handleKeyDown ~ inputs", inputs)
  //   inputs.forEach((input) => {
  //     input.addEventListener('keydown', () => {
  //       // Verificamos si el código de la tecla presionada es el de la tecla Enter (13)
  //       if (event.keyCode === 13) {
  //         // Si es así, evitamos que se ejecute la acción por defecto de la tecla Enter
  //         event.preventDefault();

  //         // Luego, damos el foco al siguiente elemento del DOM
  //         const nextInput = input.nextElementSibling;
  //         if (nextInput) {
  //           nextInput.focus();
  //         }
  //       }
  //     });
  //   });
  // };

  // document.addEventListener('keydown', handleKeyDown);

  // useEffect(() => {
  //   if (update) {
  //     console.log("🚀 ~ file: InputValues.jsx:71 ~ useEffect ~ numberInput", numberInput.current)
  //     console.log('ONFOQUIE');
  //     document.getElementById(`${numberInput.current}`).focus();
  //     setUpdate(false);
  //   };
  //   return
  // }, [update]);
  useEffect(() => {
    const { result } = convertToArray({ ...appContext.columnAvalue, ...formContextA.form });
    return setAppContext({ ...appContext, columnA: result, columnAvalue: { ...appContext.columnAvalue, ...formContextA.form }, nav: navigate, });
  }, [formContextA.form]);
  useEffect(() => {
    const { result } = convertToArray({ ...appContext.columnBvalue, ...formContextB.form });
    return setAppContext({ ...appContext, columnB: result, columnBvalue: { ...appContext.columnBvalue, ...formContextB.form } });
  }, [formContextB.form]);





  const deleteInputValueA = (i) => {
    const e = {
      target: {
        name: 'input'+i,
        value: '',
      },
    };
    document.getElementById(i+'a').value = '';
    setAppContext({ ...appContext, columnAvalue: { ...appContext.columnAvalue, ['input'+i]: '', } });
    return formContextA.changed(e);
  };
  const deleteInputValueB = (i) => {
    const e = {
      target: {
        name: 'input'+i,
        value: '',
      },
    };
    document.getElementById(i+'b').value = '';
    setAppContext({ ...appContext, columnBvalue: { ...appContext.columnBvalue, ['input'+i]: '', } });
    return formContextB.changed(e);
  };





  // useEffect(() => {if (appContext.deleteAll) {
  //   setColumnAvalueState(appContext.columnAvalue);
  //   setColumnBvalueState(appContext.columnBvalue);
  //   setAppContext({ ...appContext, deleteAll: false, });
  // };}, [appContext.deleteAll]);
  


  let inputsA = [];

  let inputsB = [];



  for (let i = 0; i < appContext.numberInpContext; i++) {
    // if (appContext.deleteAll) {
      //   setColumnAvalueState('');
      //   setColumnBvalueState('');
      // };
    inputsA.push(
      <div className="inputs__element" key={i + 'a'}>
        <div
          style={{
            backgroundColor: ((i + 2) % 2 === 0) ? color.numberBoxOdd : color.numberBoxEven,
          }}
          className={`inputs__element--number ${color.hover}`}
          onClick={() => deleteInputValueA(i)}
        >
          <p style={{ color: color.number, }}>
            {i + 1}
          </p>
          <IoTrashBin
            style={{ color: color.delete, }}
            className='inputs__element--number-delete'
          />
        </div>
        <input
          id={i+'a'}
          type="text"
          style={{ color: color.text, }}
          className={color.focus}
          name={`input${i}`}
          defaultValue={appContext.columnAvalue && appContext.columnAvalue[`input${i}`]}
          // defaultValue={appContext.columnAvalue[`input${i + 1}`]}
          // defaultValue={formContextA.form[`input${i + 1}`]}
          onChange={formContextA.changed}
          // onFocus={(i === numberInput - 1) ? () => {
          //   setFocus(true);
          //   setUpdate(false);
          // } : () => {}}
          // onBlur={() => setFocus(false)}
          placeholder={t('body.input-column-a')}
        />
      </div>
    );
    inputsB.push(
      <div className="inputs__element" key={i + 'b'}>
        <div
          style={{
            backgroundColor: ((i + 2) % 2 === 0) ? color.numberBoxOdd : color.numberBoxEven,
          }}
          className={`inputs__element--number ${color.hover}`}
          onClick={e => deleteInputValueB(e)}
        >
          <p style={{ color: color.number, }}>
            {i + 1}
          </p>
          <IoTrashBin
            style={{ color: color.delete, }}
            className='inputs__element--number-delete'
          />
        </div>
        <input
          id={i+'b'}
          type="text"
          style={{ color: color.text, }}
          className={color.focus}
          name={`input${i}`}
          defaultValue={appContext.columnBvalue && appContext.columnBvalue[`input${i}`]}
          onChange={formContextB.changed}
          placeholder={t('body.input-column-b')}
        />
      </div>
    );
  };






  
  // console.log("🚀 ~ file: InputValues.jsx:209 ~ InputValues ~ appContext.deleteAll", appContext.deleteAll)




  if (appContext.state === 'result') {
    return setAppContext({ ...appContext, state: 'initial', name: '',});
    // return setAppContext({ ...appContext, state: 'initial', type: 1, columnA: [], columnB: [], name: '',});
  } else if (appContext.state === 'initial') {
    return (
      <div className="inputs__container">
          <div className="inputs__form">
            {
              (width <= 600 && appContext.row === 1) && (
                <form>
                  {inputsA}
                </form>
              )
            }
            {
              (width > 600) && (
                <form>
                  {inputsA}
                </form>
              )
            }
            {
              (width <= 600 && appContext.type === 4 && appContext.row === 2) && (
                <form>
                  {inputsB}
                </form>
              )
            }
            {
              (width > 600 && appContext.type === 4) && (
                <form>
                  {inputsB}
                </form>
              )
            }
          </div>
          {
            (appContext.row === 1) && (
              <button 
                style={{ backgroundColor: color.add }}
                className="inputs__button--container"
                onClick={() => setAppContext({ ...appContext, numberInpContext: appContext.numberInpContext + (appContext.numberInpContext < 100 ? 1 : 0) })}
                // onClick={() => setNumberInput(numberInput + (numberInput < 100 ? 1 : 0))}
              >
                <BiPlusMedical
                  style={{ color: color.number, }}
                  className="inputs__button"
                />
                <p style={{ color: color.number, }}>
                  {t('body.input-button')}
                </p>
              </button>
            )
          }
        </div>
    );
  } else if (appContext.state === 'loading') {
    return (
      <Pipocas color={color.pipocas} time={2000} sizeMin={30} sizeMax={100} />
    )
  };
};

export default InputValues;