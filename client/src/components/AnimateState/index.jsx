import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const AnimateState = ({children, initOpen=false}) => {
    const [state, setState] = useState('unmounted');
    const ref = useRef(false)

    useClickOutside(ref, () => {
      close();
    });
    
    useEffect(() => {
      if(initOpen) {
        open()
      }
    }, [])

    const open = () => {
      setState('entering');
      setTimeout(() => {
        setState('entered');
      }, 300);
    };

    const toggle = () => {
      if(state == 'entered') {
        close()
      } else {
        open()
      }
    };
  
    const close = () => {
      setState('leaving');
      setTimeout(() => {
        setState('unmounted');
      }, 300);


    };

    return children({open, close, toggle, ref, state})
      

};

export default AnimateState;
