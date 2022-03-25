function useCheckBox(state, setState, data) {
  const stateKey = Object.keys(state)[0];
  const stateValue = state[stateKey];

  const isChecked = property => {
    return stateValue.includes(property);
  };

  const isCheckedAll = () => {
    return data.every(obj => stateValue.includes(obj.name));
  };

  const handleCheckedAll = () => {
    let updatedList = [];

    if (!isCheckedAll()) {
      data.forEach(obj => {
        updatedList.push(obj.name);
      });
    }

    const updatedState = {
      [stateKey]: updatedList,
    };

    setState(updatedState);
  };
  return { isChecked, isCheckedAll, handleCheckedAll };
}

export default useCheckBox;
