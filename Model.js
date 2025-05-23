const fsp = require('fs').promises
const { EOL } = require('os');

class Model {
    constructor(topicsName, userName){
        this.topicsName = topicsName;
        this.userName = userName;
    }

    static async getTopicList(){
        const arrFileName = await fsp.readdir('./topics');
        const objTopic = {};
        arrFileName.forEach((path) => {
            const value = path.replace(/\.txt$/, '').replace(/_/g, ' ');
            objTopic[value] = `./topics/${path}`;
        });

    return objTopic
    }
    
    async getArrQuestion(){
        const objFilesPath = await Model.getTopicList();
        const choiseTopic = objFilesPath[this.topicsName.trim()]
        
        const cards = (await fsp.readFile(choiseTopic, 'utf8')).split(EOL + EOL).map(card => card.split(EOL))

        const arrCard = [];

        cards.forEach((card) => {
            const cardObj = {};
            [cardObj.question, cardObj.answers, cardObj.correctAnswer] = [
                card[0],
                card[1].split('/').map(answer => answer.trim()),
                card[2],
            ]
            arrCard.push(cardObj)
        })
        
        console.log(arrCard);
    }   

    static async nextQuestion(arr, count = 0){
        return arr[count]
    }
    

    static checkAnswer(correctAnswer, selectAnswer){
        return correctAnswer === selectAnswer
    }

    static async appendGameInfo(data){
        await fsp.appendFile('./gameStats.txt', data)
    }
}
