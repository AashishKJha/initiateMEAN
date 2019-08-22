import AppServer from './config/express';
import config from './config/config';

const appServer = new AppServer();
appServer.app.listen(config.port, () => {
  console.log('Server is running on '.concat(config.port));
});

export default appServer;
