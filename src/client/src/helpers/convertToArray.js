const convertToArray = (obj) => {
  const objValues = Object.values(obj);
  const objFiltered = objValues.filter(slot => slot !== '');
  return {
    result: objFiltered
  };
};

export default convertToArray;