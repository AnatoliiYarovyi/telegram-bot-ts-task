import getAllCoins from './getAllCoins';

const getSymbolCoin = async (text: string) => {
  const allCoins: {
    symbol: string;
    price_average: string;
  }[] = await getAllCoins();
  const arrCoin: string[] = allCoins.reduce((acc, { symbol }) => {
    acc.push(symbol);
    return acc;
  }, []);
  const findCoin: string[] = arrCoin.filter(el => `/${el}` === text);
  return findCoin[0];
};

export default getSymbolCoin;
