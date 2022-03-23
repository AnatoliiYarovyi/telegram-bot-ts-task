import getAllCoins from './getAllCoins';

const getSymbolCoin = async (text: string) => {
  const allCoins: {
    cryptocurrensy_symbol: string;
    price_average: string;
  }[] = await getAllCoins();
  const arrCoin: string[] = allCoins.reduce(
    (acc, { cryptocurrensy_symbol }) => {
      acc.push(cryptocurrensy_symbol);
      return acc;
    },
    [],
  );
  const findCoin: string[] = arrCoin.filter(el => `/${el}` === text);
  return findCoin[0];
};

export default getSymbolCoin;
