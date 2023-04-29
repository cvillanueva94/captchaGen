const generateQuestion = (type) => {
    switch (type) {
      case 'math':
        return generateMathQuestion();
      case 'english':
        return generateEnglishQuestion();
      // Agregar más tipos de preguntas aquí
      default:
        throw new Error('Tipo de pregunta no válido');
    }
  };
  
  const generateMathQuestion = () => {
    // Genera una nueva pregunta de CAPTCHA y su respuesta
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const question = `${num1}${operator}${num2}`;
    const answer = eval(`${num1} ${operator} ${num2}`);
    return { question, answer };
  };
  
  const generateEnglishQuestion = () => {
    const words = [
      'apple',
      'banana',
      'cherry',
      'orange',
      'pear',
      'grape',
      'pineapple',
      'watermelon',
      'mango',
      'kiwi'
    ];
    const index = Math.floor(Math.random() * words.length);
    const scrambled = scrambleWord(words[index]);
    const answer = words[index];
    const question = `Unscramble the word: ${scrambled}`;
    return { question, answer };
  };
  
  const scrambleWord = (word) => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  };
  
  module.exports = {
    generateQuestion
  };