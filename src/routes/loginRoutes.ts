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

router.get('/login', (req: Request, res: Response) => {
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
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  //type guard
  if(email && password && email === 'admin@admin.com' && password === 'password123' ) {
    // using cookie session
    req.session = { loggedIn: true }
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

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

