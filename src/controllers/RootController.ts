import { Request, Response, NextFunction } from 'express';
import { get, controller, use} from './decorators';


function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if(req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not Permitted');
}

@controller('') // empty string, '/' will make the route = '//'
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if(req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <h3>You are logged in </h3>
          <a href="/auth/logout">Log Out</a>
        </div>
      `)
    } else {
      res.send(`
        <div>
          <h3>You are NOT logged in </h3>
          <a href="/auth/login">Log In</a>
        </div>
      `)
    }
  }
  
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('You are in the protected route. Welcome users!')
  }
}