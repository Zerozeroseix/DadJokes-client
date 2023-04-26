import {useCallback, useEffect, useState} from 'react';

const Timer = (props: any) => {
  const [seconds, setSeconds] = useState(props.seconds);

  const reset = useCallback(() => {
    setSeconds(props.seconds);
  }, [props.seconds]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
    }
    if (seconds <= 0) {
      clearInterval(interval);
      reset();
    }
    return () => clearInterval(interval);
  }, [reset, seconds]);

  return <div className='font-semibold text-purple-400'>{seconds}</div>;
};

export default Timer;
