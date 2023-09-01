import { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {

  /* useEffect 처음에는 실행안되도록 하는 함수 */
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;