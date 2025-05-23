const Model = require('./Model');
const View = require('./View');
const { EOL } = require('os');


class Controller {
  constructor(model) {
    this.model = model;
  }

  async start() {
    const arr = await this.model.getArrayQuestion()

    
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        const query = Model.getNextQuery(arr, i)

        const receivedAnswer = await View.askQuestion(query.question, query.answers)
        if (Model.checkAnswer(query.correctAnswer.trim(), receivedAnswer.answer.trim())) {
            Model.apendGameInfo(`${query.question}${EOL}✅ Выбран правильный ответ -- ${receivedAnswer.answer.trim()}${EOL}${EOL}`)
            View.render(Model.getCorrect())
            count ++
        } else {
            Model.apendGameInfo(`${query.question}${EOL}❌ Выбран не верный ответ -- ${receivedAnswer.answer.trim()}${EOL}✅ Правильный ответ -- ${query.correctAnswer.trim()}${EOL}${EOL}`)
            View.render(Model.getIncorrect())
            View.render(`Правильный ответ: ${query.correctAnswer}`)
        }
    } View.render(`Ты ответил на ${count} вопроса(-ов) из ${arr.length}! ${EOL}Заработано ${count * 10} баллов из ${arr.length * 10}!`)
      Model.apendGameInfo(`Игрок ответил на ${count} вопроса(-ов) из ${arr.length}! ${EOL}Заработано ${count * 10} баллов из ${arr.length * 10}!${EOL}${EOL}${EOL}`)
  }
}

module.exports = Controller