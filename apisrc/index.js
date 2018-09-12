import app from './config/express';
import dotenv from './config/config';

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log('Server is running on '.concat(process.env.PORT));
});
