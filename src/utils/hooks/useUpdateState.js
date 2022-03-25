function useUpdateState(state, setState) {
  const stateKey = Object.keys(state)[0];

  const updateState = (value, key = stateKey) => {
    if (Array.isArray(state[key])) {
      let updatedArray = [];
      let updatedState = [];
      if (!state[key].includes(value)) {
        updatedArray = [...state[key], value];
      } else {
        updatedArray = [...state[key]].filter(el => {
          return el !== value;
        });
      }
      updatedState = {
        [key]: updatedArray,
      };
      setState(updatedState);
    } else {
      let updatedState = {};
      updatedState = {
        ...state,
        [key]: value,
      };
      setState(updatedState);
    }
  };
  return { updateState };
}

export default useUpdateState;
