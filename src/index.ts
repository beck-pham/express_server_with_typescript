import express , { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';




const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [''] })); 
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('App is listening on port 3000')
});