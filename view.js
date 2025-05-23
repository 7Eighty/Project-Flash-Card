const inquirer = require('inquirer')
const { EOL } = require('os');

class View{
  static render(arg){
    console.log(arg + EOL);
  }

  static askQuestion(question, answer){
    return inquirer.prompt({
      type: 'rawlist',
      name: 'answer',
      message: question,
      choices: answer
    })
  }

  static askName(question){
    return inquirer.prompt({
      type: 'input',
      name: 'answer',
      message: question
    });
  }

}

module.exports = View