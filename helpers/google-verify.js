const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token = '') {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const { name, picture, email } = ticket.getPayload();
  
      return { 
        nombre: name, 
        img: picture, 
        correo: email
      };
    } catch (error) {
      console.error('Error en googleVerify:', error); // Agrega este registro
      throw new Error('Token de Google no válido');
    }
  }
  

module.exports = { 
  googleVerify
};
