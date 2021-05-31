const currencyLayer = require('../services/currencylayer');

module.exports.CurrencyExchange = async ({ destinationCurrency, sourceCurrency, cache }) => {
  let rate = 1; // Intialise exchange rate;

  // if client currency differs from talent currency get exchange rate
  if (destinationCurrency !== sourceCurrency) {
    const currencyMarker = `${sourceCurrency}${destinationCurrency}`;
    // check if there is rate in cache
    // Otherwise pull from currency layer
    if (cache[currencyMarker]) rate = cache[currencyMarker];
    else {
      const conversions = await currencyLayer.getRate(destinationCurrency, sourceCurrency);
      if (!conversions) return null;

      rate = conversions[currencyMarker];
      // eslint-disable-next-line no-param-reassign
      cache[currencyMarker] = rate;
    }
  }

  return { rate, cache };
};
