const Jimp = require('jimp')

// Genera la imagen de fondo con un color aleatorio
async function generateBackgroundImage(question) {
    const width = 200;
    const height = 80;
    const color = Jimp.rgbaToInt(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      255
    );
    
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const image = await new Jimp(width, height, color);
  
  
    // Imprime la pregunta en la imagen en una posición aleatoria
    const questionWidth = Jimp.measureText(font, question);
    const questionHeight = Jimp.measureTextHeight(font, question, questionWidth);
    const x = Math.floor(Math.random() * (width - questionWidth));
    const y = Math.floor(Math.random() * (height - questionHeight));
    image.print(font, x, y, question, width);
  
    // Imprime letras aleatorias en la imagen
    const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * image.bitmap.width);
        y = Math.floor(Math.random() * image.bitmap.height);
      } while (
        x > (width - questionWidth) / 2 && x < (width + questionWidth) / 2 &&
        y > (height - questionHeight) / 2 && y < (height + questionHeight) / 2
      );
      const letter = randomLetters[Math.floor(Math.random() * randomLetters.length)];
      const color = Jimp.rgbaToInt(
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        255
      );
      if (x > (width - questionWidth) / 2 && x < (width + questionWidth) / 2) {
        if (y < (height - questionHeight) / 2 || y > (height + questionHeight) / 2) {
          image.print(font, x, y, letter, width).color([{ apply: 'mix', params: [color, 0.2] }]);
        } else {
          i--;
        }
      } else if (y > (height - questionHeight) / 2 && y < (height + questionHeight) / 2) {
        if (x < (width - questionWidth) / 2 || x > (width + questionWidth) / 2) {
          image.print(font, x, y, letter, width).color([{ apply: 'mix', params: [color, 0.2] }]);
        } else {
          i--;
        }
      } else {
        image.print(font, x, y, letter, width).color([{ apply: 'mix', params: [color, 0.2] }]);
      }
    }
    
  
    // Agrega un poco de ruido a la imagen
    for (let i = 0; i < 1000; i++) {
      const x = Math.floor(Math.random() * image.bitmap.width);
      const y = Math.floor(Math.random() * image.bitmap.height);
      const color = Jimp.rgbaToInt(
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        255
      );
      image.setPixelColor(color, x, y);
    }
  
    return await image.getBase64Async(Jimp.MIME_PNG);
  }

  module.exports ={
    generateBackgroundImage
  }