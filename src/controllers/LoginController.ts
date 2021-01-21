import { NextFunction, Request, Response } from 'express';
import { get, controller, use , validatorKey, post} from './decorators';

function logger (req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!');
  next();
}

@controller('/auth') // decorator that take all the routing info and merge it altogether on some route 
class Logincontroller {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `)
  };

  @post('/login')
  @validatorKey('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
  
    //type guard
    if(email === 'admin@admin.com' && password === 'password123' ) {
      // using cookie session
      req.session = { loggedIn: true }
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}

