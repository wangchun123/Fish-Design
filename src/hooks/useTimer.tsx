import React, { useEffect, useState, useRef } from 'react';

export const useTimer = (initNum = 10, delayTime = 1000) => {
  const ref = useRef<any>(null);
  const [num, setNum] = useState(initNum);
  const [flag, setFlag] = useState(false);

  const start = () => {
    setNum(initNum);
    setFlag(true);
  };

  const cancle = () => {
    setNum(0);
    setFlag(false);
  };

  const stop = () => {
    clearInterval(ref.current);
  };

  useEffect(() => {
    if (flag) {
      ref.current = setInterval(() => {
        setNum(num => {
          if (num > 0) {
            return num - 1;
          } else {
            return 0;
          }
        });
      }, delayTime);

      return () => clearInterval(ref.current); // 不清除，关闭定时器会出现-1的情况
    }
  }, [flag, num]);

  return {
    num,
    start,
    cancle,
    stop,
  };
};
