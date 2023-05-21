import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxMethod from "../helpers/ajaxMethod";
import useDarkValue from "../hooks/useDarkValue";
import { useAppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import convertToArray from "../helpers/convertToArray";

const colors = {
  light: {
    numberBoxOdd: '#2C3333',
    numberBoxEven: '#596B6B',
    number: '#EBEBEB',
    text: '#2C3333',
  },
  dark: {
    numberBoxOdd: '#EBEBEB',
    numberBoxEven: '#8D8B8B',
    number: '#2C3333',
    text: '#EBEBEB',
  },
};

const { REACT_APP_SERVER_HOST } = process.env;

const ResultValues = () => {
  const [itemData, setItemData] = useState();
  console.log("🚀 ~ file: ResultValues.jsx:28 ~ ResultValues ~ itemData", itemData)
  const color = useDarkValue(colors.light, colors.dark);
  const { appContext, setAppContext } = useAppContext();
  console.log("🚀 ~ file: ResultValues.jsx:30 ~ ResultValues ~ appContext", appContext)
  const [darkMode, setDarkMode] = useDarkMode();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setDarkMode(darkMode);
  }, [darkMode]);
  useEffect(() => {
    if (appContext.state === 'result') {
      window.scrollTo(0, 0);
    } else {
      return;
    };
  }, [appContext.state]);
  useEffect(() => {
    const getItemData = async () => {
      try {
        const url = `${REACT_APP_SERVER_HOST}/api/public/${id}`;
        const { data } = await ajaxMethod(url, 'GET');
        console.log(data.data.values);
        if (data.status === 'error') {
          setAppContext({ ...appContext, state: 'initial', type: 1, columnAvalue: '', columnBvalue: '', name: '',});
          navigate('/');
        } else {
          const resultObjA = convertToArray(data.data.values.columnA);
          let resultObjB;
          if (data.data.values.columnB) {
            resultObjB = convertToArray(data.data.values.columnB);
          } else {
            resultObjB = { result: [] };
          };
          setAppContext({ ...appContext, type: parseInt(data.data.type), name: data.data.name, date: data.data.date, numberInpContext: data.data.inputs, code: data.data.codeId, columnAvalue: data.data.values.columnA, columnBvalue: data.data.values.columnB, columnA: resultObjA.result, columnB: resultObjB.result, resultData: data.data.result, idItem: id, nav: navigate, state: 'result', "dark-mode": darkMode, numberResult: data.data.result.length, });
          return setItemData(data.data);
        };
        return;
      } catch (err) {
        console.log(err);
        return
      };
    };
    getItemData();
  }, [id, navigate]);





  let resultData = [];
  if (itemData && (itemData.type == '1' || itemData.type == '2')) {
    for (let i = 0; i < itemData.result.length; i++) {
      resultData.push(
        <div className="results__element" key={i + 'a'}>
          <div
            style={{
              backgroundColor: ((i + 2) % 2 === 0) ? color.numberBoxOdd : color.numberBoxEven,
            }}
            className="results__element--number"
          >
            <p style={{ color: color.number, }}>
              {i + 1}
            </p>
          </div>
          <div className="results__element--text">
            <p style={{ color: color.text, }}>
              {itemData.result[i]}
            </p>
          </div>
        </div>
      );
    };
    return (
      <div className="results-tp1__container">
        {resultData}
      </div>
    );
  };
  if (itemData && (itemData.type == '3' || itemData.type == '4')) {
    for (let i = 0; i < itemData.result.length; i++) {
      resultData.push(
        <div className="results__element" key={i + 'a'}>
          <div
            style={{
              height: itemData.result[i].length * 60 + 'px',
              backgroundColor: ((i + 2) % 2 === 0) ? color.numberBoxOdd : color.numberBoxEven,
            }}
            className="results__element--number"
          >
            <p style={{ color: color.number, }}>
              {i + 1}
            </p>
          </div>
          <div
            style={{ height: itemData.result[i].length * 60 + 'px', }}
            className="results__element--text"
          >
          {
            itemData.result[i].map((item, index) => (
              <p
                key={index}
                style={{
                  color: ((itemData.type == '4') ? ((index === 0) ? color.text : color.numberBoxEven) : color.text),
                  fontSize: ((itemData.type == '4') ? ((index === 0) ? '32px' : '28px') : '32px'),
                }}
              >
                {item}
              </p>
            ))
          }  
          </div>
        </div>
      );
    };
    return (
      <div className="results-tp3__container">
        {resultData}
      </div>
    );
  };
};

export default ResultValues;