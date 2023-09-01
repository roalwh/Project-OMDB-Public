import { useState, useEffect } from 'react'

const LoadingTimer = () => {
  const [count, setCount] = useState(1);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    if (count === 0) {
      setTimer(true);
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [count]);

  return { timer, count };
};

export default LoadingTimer;
