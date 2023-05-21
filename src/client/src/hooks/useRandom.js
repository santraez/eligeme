const useRandom = ({ type=1, number=1, columnA, columnB }) => {
  let newColumnA = [...columnA];
  let newColumnB = [...columnB];
  let result = [];
  for (let i = newColumnA.length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const endSlot = newColumnA[i - 1];
    newColumnA[i - 1] = newColumnA[randomIndex];
    newColumnA[randomIndex] = endSlot;
  };
  switch (type) {
    case 1:
      result = [...newColumnA.slice(0, number)];
      break;
    case 2:
      result = [...newColumnA];
      break;
    case 3:
      for (let i = 0; i < newColumnA.length; i+=number) {
        result.push(newColumnA.slice(i, i + number));
      };
      if (result.length > 2 && result[result.length - 1].length === 1) {
        result[result.length - 2] = [...result[result.length - 2], ...result[result.length - 1]];
        result.pop();
      };
      break;
    case 4:
      for (let i = newColumnB.length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const endSlot = newColumnB[i - 1];
        newColumnB[i - 1] = newColumnB[randomIndex];
        newColumnB[randomIndex] = endSlot;
      };
      for (let i = 0; i < newColumnA.length; i++) {
        result.push([newColumnA[i], newColumnB[i]]);
      };
      break;
    default:
      break;
  };
  return {
    result,
  };
};
  
export default useRandom;