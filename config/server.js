const dev = process.env.NODE_ENV ? process.env.NODE_ENV !== 'production' : false;

const urlServer = dev ? 'http://localhost:3000' : 'https://milka-projekt-api.vercel.app/';

export default urlServer;