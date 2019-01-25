import app from './config/express';
import config from './config/config';

app.listen(config.port, () => {
  console.log('Server is running on '.concat(config.port));
});
