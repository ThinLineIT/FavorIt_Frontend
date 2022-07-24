export const checkFirstNum = (value: string) => {
  if (typeof value === 'string' && value[0] === '0') {
    if (value[1] === '0') {
      value = value.slice(2);
    } else {
      value = value.slice(1);
    }
  }

  return value;
};

export const numericOnly = (value: string) => {
  value = checkFirstNum(value);

  const regex = /[^0-9]/g;
  return value.replaceAll(regex, '');
};

export const numericOnlyWithComma = (value: string) => {
  value = convertNumberToString(value);
  value = numericOnly(value);

  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

const convertNumberToString = (value: number | string) => {
  if (typeof value === 'number') {
    value = value.toString();
  }
  return value;
};

export const deleteComma = (value: string) => {
  return String(value).replaceAll(',', '');
};

export const deleteHyphen = (value: string) => {
  return value.replaceAll('-', '');
};

export const handlePriceType = (watch: string) => {
  const comma = (str: string) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  };

  const unComma = (str: string) => {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  };

  const pureString = watch && comma(unComma(watch));
  return pureString;
};
