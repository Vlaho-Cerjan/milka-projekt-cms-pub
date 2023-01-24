const dev = process.env.NODE_ENV !== 'production';

const urlServer = dev ? 'http://localhost:3000' : 'https://varela-hr.vercel.app';

export default urlServer;