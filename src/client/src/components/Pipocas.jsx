import { useEffect, useRef, useState } from 'react';

const Pipocas = ({ color, time, sizeMin, sizeMax }) => {
  const [sizeObj, setSizeObj] = useState({});
  const [positionObj, setPositionObj] = useState({});
  const startObj = useRef(true);
  const divRef = useRef(undefined);
  // useEffect(() => {
  //    setTimeout(() => {
  //      startObj.current = false;
  //    }, time);
  // }, [time]);
  useEffect(() => {
    const random = () => {
      let width, height;
      if (divRef.current) {
        width = divRef.current.getBoundingClientRect().width;
        height = divRef.current.getBoundingClientRect().height;
      } else {
        width = 0;
        height = 0;
      };
      const size = Math.floor(Math.random() * (sizeMax - sizeMin + 1)) + sizeMin;
      const bottom = Math.floor(Math.random() * (height - size + 1));
      const left = Math.floor(Math.random() * (width - size + 1));
      setSizeObj({ width: `${size}px`, height: `${size}px`, });
      setPositionObj({ top: `${bottom}px`, left: `${left}px`, });
      if (startObj.current) {
        requestAnimationFrame(random);
      } else {
        return;
      };
    };
    random();
    cancelAnimationFrame(random);
  }, [sizeMax, sizeMin]);
  return (
    <div ref={divRef} style={{ width: '100%', height: '100%', }}>
      <div style={{ ...positionObj, position: 'relative', }}>
        <div style={{ ...sizeObj, borderRadius: '50%', backgroundColor: color, }} />
      </div>
    </div>
  );
};

export default Pipocas;