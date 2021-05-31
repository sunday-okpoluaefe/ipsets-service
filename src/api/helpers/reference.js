module.exports.reference = (length = 12) => {
  const timestamp = +new Date();

  const ts = timestamp.toString();
  const parts = ts.split('').reverse();
  let id = '';

  for (let i = 0; i < length; ++i) {
      // eslint-disable-next-line max-len
    const index = Math.floor(Math.random() * ((parts.length - 1) + 1));// _getRandomInt(0, parts.length - 1);
    id += parts[index];
  }

  return id;
};
