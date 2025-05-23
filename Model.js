const fs = require('fs/promises');
const { EOL } = require('os');

class Model {
  constructor(topicName, userName) {
    this.topicName = topicName;
    this.userName = userName;
  }

  static async getTopicList() {
    const arrFileName = await fs.readdir('./topics');
    const objTopic = {};
    arrFileName.forEach((filePath) => {
      const key = filePath.replace(/\.txt$/, '').replace(/_/g, ' ');
      objTopic[key] = `./topics/${filePath}`;
      
    });
 

    return objTopic;
  }

  async getArrayQuestion() {
    const objFilesPath = await Model.getTopicList();
    
    const choiseTopicPath = objFilesPath[this.topicName.trim()];


    const getCards = (await fs.readFile(choiseTopicPath, 'utf-8'))
      .split(EOL + EOL)
      .map((card) => card.split(EOL));

    const arrCardObjects = [];

    getCards.forEach((card) => {
      const cardObj = {};
      [cardObj.question, cardObj.answers, cardObj.correctAnswer] = [
        card[0],
        card[1].split('/').map((el) => el.trim()),
        card[2],
      ];
      arrCardObjects.push(cardObj);
    });
    
    return arrCardObjects;
  }

  static async apendGameInfo(data) {    
  await fs.appendFile(`./gameStats.txt`, data)
  }

  static getNextQuery(arr, num = 0) {
    return arr[num];
  }

  static checkAnswer(correctAnswer, selectAnswer) {
    return correctAnswer === selectAnswer
  }

  static getCorrect() {
    const arr = ['Точно в цель!', 'Бинго!', 'Угадал(а)!', 'Так держать!', 'Попал(а) в точку!', 'Вот это да, красава!', 'Всё чётко!', 'Да ты гений!', 'Ай, молодца!'];
    return `${arr[Math.floor(Math.random() * arr.length)]} лови 10 балоов `;
  }

  static getIncorrect() {
    const arr = ['Мимо кассы!', 'Увы, не так.', 'Промахнулся(ась)!', 'Не угадал(а)!', 'Ошибочка вышла.', 'Хмм… не то.', 'Упс, нет!', 'Попробуй ещё раз!', 'Это был ложный след.', 'Ну почти… но нет.'];
    return arr[Math.floor(Math.random() * arr.length)];
  }

}


module.exports = Model;


