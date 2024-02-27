import { useState } from 'react';

// Custom hook definition
const useEnterLeaveState = (initState="hidden") => {
  const [state, setState] = useState(initState); // Initial state is 'enter'

  // Function to set the state to 'enter'
  const setEnter = () => {
    setState('enter');
    setTimeout(() => {
      setState('show');
    }, 1000)
  };

  // Function to set the state to 'leave'
  const setLeave = () => {
    setState('leave');
    setTimeout(() => {
      setState('hidden');
    }, 1000)
  };

  return { state, setEnter, setLeave };
};

export default useEnterLeaveState;