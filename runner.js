const View = require('./view');
const Model = require('./Model')
const Controller = require('./Controller')
const {EOL} = require('os')

async function startGame() {
    const name = await View.askName('Укажите ваше имя: ');
    Model.apendGameInfo(`🙋🏻‍♂️ Имя игрока: ${name.answer}${EOL}${EOL}`)

    const arrayTopics = await Model.getTopicList();
    const arrTopicName = Object.keys(arrayTopics)

    const topic = await View.askQuestion('Выберите тему: ', arrTopicName);
    
    const model = new Model(topic.answer, name);
    const controller = new Controller(model)
    controller.start()
}
startGame()