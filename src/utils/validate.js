export function validatValueMoney(dataInput) {
  let dataClean = dataInput;
  const checkCurPos = dataInput.indexOf('Rp');
  const checkCurOccurenceRp = dataInput.split('Rp');
  const checkCurOccurenceComma = dataInput.split(',');
  if (dataInput.length < 1) return {
    text: 'Please input number',
    value: dataInput
  };
  if (checkCurPos > 0) return {
    text: 'Error Currency Symbol',
    value: dataInput
  };
  if (checkCurOccurenceRp.length > 2) return {
    text: 'Error Currency Symbol',
    value: dataInput
  };
  if (checkCurOccurenceComma.length > 2) return {
    text: 'Only 00 after comma',
    value: dataInput
  };
  if (checkCurOccurenceComma[1] && checkCurOccurenceComma[1].length !== 2 && checkCurOccurenceComma[1] !== '00') return {
    text: 'Only 00 after comma',
    value: dataInput
  };
  if (checkCurPos === 0) dataClean = checkCurOccurenceRp[1].trim();
  if (dataClean.length < 1) return {
    text: 'Please input number',
    value: dataInput
  };
  if (checkCurOccurenceComma[1]) dataClean = dataClean.split(',')[0];
  if (/^[a-zA-Z]+$/.test(dataClean)) return {
    text: 'Please input number',
    value: dataInput
  };
  const dataDot = dataClean.split('.');
  const countDot = dataDot.length - 1;
  if (countDot > 0) {
    for (let index = 1; index < dataDot.length; index++) {
      const element = dataDot[index];
      if (element.length !== 3) return {
        text: 'Please use . as thousand separator and , as last 00',
        value: dataInput
      };
    }
  }
  if (!(/^[0-9.]+$/.test(dataClean))) return {
    text: 'Please use proper separator (.)',
    value: dataInput
  }
  const noDotValue = dataClean.replace('.', '');
  if (noDotValue < 1) return {
    text: 'Please use input number at least 1',
    value: dataInput
  }
  return {
    text: 'valid',
    value: parseInt(noDotValue)
  };
}