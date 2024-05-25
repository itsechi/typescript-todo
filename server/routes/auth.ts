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
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL,
    session: true,
  }),
);

authRouter.get(
  '/auth/google/callback/success',
  (req: Request, res: Response) => {
    if (req.user) {
      res.json(req.user);
    }
  },
);

authRouter.get('/loggedOut', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) console.error(`Error logging out the user: ${err}`);
    res.redirect(process.env.CLIENT_URL!);
  });
});

export default authRouter;
