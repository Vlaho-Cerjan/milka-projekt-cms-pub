const dev = process.env.NODE_ENV ? process.env.NODE_ENV === 'development' : false;

const urlServer = dev ? 'http://localhost:3000' : 'https://milka-projekt-api.vercel.app/';

export default urlServer;