const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require ('./options')
const token = '5328660522:AAFFLtuE17LBq4qIYyrrCFyLnoSUEBvu1wo';

const bot = new TelegramApi(token, { polling: true });

const chats = {}


bot.setMyCommands([
  {command: '/start ', description: 'Приветствие'},
  {command: '/info', description: 'Информация' },
  {command: '/game', description: 'Игра' }
])

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Угадай какое число я загадал от 0 до 9')
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}


const start = () => {
  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    
    if (text === '/start') {
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/f97/508/f975088d-f6d2-3b71-81ff-bc927c550347/3.webp')  
    return bot.sendMessage(chatId, `Добро пожаловать ${msg.from.first_name}, в бот гениального Аяза`)}
    if (text === '/info') {
    return bot.sendMessage(chatId, 'Информация отсутствует')
    }
    if (text === '/game') {
      return startGame(chatId);
    }
  return bot.sendMessage(chatId, 'Аяз меня еще такому не научил')
})

  bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again') {
      return startGame(chatId)
    }
    if(data === chats[chatId]) {
      return bot.sendMessage(chatId, `Поздравляю ты отгадал цифру ${chats[chatId]}`, againOptions)
    } 
    if(data !== chats[chatId] ) {
      return bot.sendMessage(chatId, `К сожаления ты не угадал, я загадал цифру ${chats[chatId]}`, againOptions )
    }

  })

}

start()
