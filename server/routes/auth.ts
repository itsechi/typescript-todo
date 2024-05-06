import express, { Request, Response } from 'express';
const authRouter = express.Router();
import passport from 'passport';

// Google auth
authRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] }),
);

authRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect home
    res.redirect(process.env.CLIENT_URL!);
  },
);

authRouter.get(
  '/auth/google/callback/success',
  (req: Request, res: Response) => {
    if (req.user) {
      res.send(req.user);
    }
  },
);

authRouter.get('/loggedOut', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) console.error(err);
    res.redirect(process.env.CLIENT_URL!);
  });
});

export default authRouter;
