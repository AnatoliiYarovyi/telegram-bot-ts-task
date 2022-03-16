import getSymbolCoin from '../coin/getSymbolCoin';
import startCommand from './startCommand';
import helpCommand from './helpCommand';
import listRecentCommand from './listRecentCommand';
import currencySymbolCommand from './currencySymbolCommand';
import listFavouriteCommand from './listFavouriteCommand';
import updateDataCoin from './updateDataCoin';
import addDataCoin from './addDataCoin';
import deleteDataCoin from './deleteDataCoin';

import ResReqObj from '../interface/interface';

const main = async (req: ResReqObj, res: ResReqObj, next: void) => {
  if (!req.body.callback_query) {
    const { id: chatId, username } = req.body.message.chat;
    const { text } = req.body.message;
    const textArr: string = text.replace(/ +/g, ' ').trim().split(' ');
    const comand: string = textArr[0];
    const symbolCoin: string = textArr[1];

    switch (comand) {
      case '/start':
        await startCommand(res, chatId, username);
        break;

      case '/help':
        await helpCommand(res, chatId);
        break;

      case '/listRecent':
        await listRecentCommand(res, chatId);
        break;

      case `/listFavorite`:
        await listFavouriteCommand(res, chatId);
        break;

      case `/addToFavorite`:
        await addDataCoin(res, chatId, symbolCoin);
        break;

      case `/deleteFavorite`:
        await deleteDataCoin(res, chatId, symbolCoin);
        break;

      case `/${await getSymbolCoin(text)}`:
        await currencySymbolCommand(res, chatId, text);
        break;

      default:
        console.log('Invalid command');
        await helpCommand(res, chatId);
    }
  } else if (req.body.callback_query) {
    const { id: chatId } = req.body.callback_query.from;
    const symbolCoin: string = req.body.callback_query.data;
    const callback_query_id: string = req.body.callback_query.id;
    const message_id: number = req.body.callback_query.message.message_id;

    await updateDataCoin(
      res,
      chatId,
      symbolCoin,
      message_id,
      callback_query_id,
    );
  }
};

export default main;
