import { CONSTDAT } from './constant';
export function convertValueMoney(dataInput) {
  let valueDenominal = dataInput;
  const populateDenominal = [];
  for (let index = 0; index < CONSTDAT.length; index++) {
    const element = CONSTDAT[index];
    const denominal = element;
    const total = Math.floor(valueDenominal / element);
    if (total > 0) populateDenominal.push(`${total} x Rp${denominal}`);
    valueDenominal = valueDenominal - (total * denominal);
  }
  if (valueDenominal > 0) {
    populateDenominal.push(`left Rp${valueDenominal} (no available fraction)`);
  }
  return populateDenominal;
}