class View {
  static getQuestionData(card) {
    return {
      question: card.question,
      options: card.options.map((opt, index) => ({
        number: index + 1,
        text: opt
      }))
    };
  }

  static getResultMessage(isCorrect) {
    return isCorrect ? 'Правильно!' : 'Неправильно.';
  }

  static getFinalScore(score) {
    return `Итоговый счёт: ${score}`;
  }

  static getDeckList(card) {
    return card.map((card, i) => ({
      index: i + 1,
      name: card
    }));
  }
}