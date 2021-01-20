import { Request, Response } from 'express';
import { get, controller } from './decorators';


@controller('/auth') // decorator that take all the routing info and merge it altogether on some route 
class Logincontroller {
  @get('/login')
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