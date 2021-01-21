import { Router, Request, Response, NextFunction } from 'express';


interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if(req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not Permitted');
}



const router = Router();





router.get('/', (req: Request, res: Response) => {
  if(req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <h3>You are logged in </h3>
        <a href="/logout">Log Out</a>
      </div>
    `)
  } else {
    res.send(`
      <div>
        <h3>You are NOT logged in </h3>
        <a href="/login">Log In</a>
      </div>
    `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('You are in the protected route. Welcome users!')
})

export { router };

