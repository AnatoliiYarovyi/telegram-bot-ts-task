import getSymbolCoin from '../coin/getSymbolCoin';
import startCommand from './startCommand';
import helpCommand from './helpCommand';
import listRecentCommand from './listRecentCommand';
import currencySymbolCommand from './currencySymbolCommand';
import listFavouriteCommand from './listFavouriteCommand';
import updateDataCoin from './updateDataCoin';

import ResReqObj from '../interface/interface';

const main = async (req: ResReqObj, res: ResReqObj, next: void) => {
  if (!req.body.callback_query) {
    const startTime: any = new Date();

    const { id: chatId, username } = req.body.message.chat;
    const { text } = req.body.message;

    // console.log('req.body: ', req.body);
    console.log('text: ', text);

    switch (text) {
      case '/start':
        await startCommand(res, chatId, username);
        break;

      case '/help':
        await helpCommand(res, chatId);
        break;

      case '/listRecent':
        await listRecentCommand(res, chatId);
        break;

      case `/listFavourite`:
        await listFavouriteCommand(res, chatId);
        break;

      case `/${await getSymbolCoin(text)}`:
        await currencySymbolCommand(res, chatId, text);
        break;

      default:
        console.log('Invalid command');
        await helpCommand(res, chatId);
    }

    const endTime: any = new Date();
    console.log('startTimeAllName: ', startTime);
    console.log('endTimeAllNam: ', endTime);
  } else if (req.body.callback_query) {
    const { id: chatId } = req.body.callback_query.from;
    const symbolCoin: string = req.body.callback_query.data;
    const callback_query_id: string = req.body.callback_query.id;
    const message_id: number = req.body.callback_query.message.message_id;

    updateDataCoin(res, chatId, symbolCoin, callback_query_id, message_id);
  }
};

export default main;
