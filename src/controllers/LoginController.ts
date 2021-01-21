import { NextFunction, Request, Response } from 'express';
import { get, controller, use } from './decorators';

function logger (req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!');
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
}