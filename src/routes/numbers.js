export const numberFormat1 = (value) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'DKK',
  }).format(value);

export const numberFormat2 = (value) => new Intl.NumberFormat('de-DE', {}).format(value);

export const numberFormat3 = (value) =>
  new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const numberFormat4 = (value) =>
  new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(value);

export const numberFormat5 = (value) =>
  new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 12,
  }).format(value);

export const numberFormat6 = (value) =>
  new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
    useGrouping: false,
  }).format(value);
