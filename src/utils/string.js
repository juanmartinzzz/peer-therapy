const formatAsInstagramUrl = ({value}) => {
  const valueWithoutStartingAtSign = value.startsWith('@') ? value.slice(1) : value;
  const valueWithoutProtocolAndSlashes = removeProtocolAndTrailingSlashes({value: valueWithoutStartingAtSign});
  const valueWithoutStartingWww = valueWithoutProtocolAndSlashes.replace(/^www\./i, '');

  return valueWithoutStartingWww;
}

const removeProtocolAndTrailingSlashes = ({value}) => value.replace(/^https?:\/\//i, '').replace(/\/$/, '');

const generateAlphaNumericCode = ({digits = 6}) => {
  const allowedCharactersList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return Array.from({ length: digits }, () => allowedCharactersList[Math.floor(Math.random() * allowedCharactersList.length)]).join('');
}

const string = {
  formatAsInstagramUrl,
  generateAlphaNumericCode,
  removeProtocolAndTrailingSlashes,
};

export default string;