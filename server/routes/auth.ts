import express, { Request, Response } from 'express';
const authRouter = express.Router();
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

// Google auth
authRouter.get(
  '/api/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  }),
);

authRouter.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/typescript-todo`,
  }),
  (req: Request, res: Response) => {
    const user = req.user as IUser;
    const token = jwt.sign(
      {
        _id: user._id,
        displayName: user.displayName,
        googleId: user.googleId,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    );
    res.redirect(`${process.env.CLIENT_URL}/typescript-todo?token=${token}`);
  },
);

authRouter.get('/api/user', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token is invalid or expired' });
    }
    res.json(decoded);
  });
});

authRouter.get('/api/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) console.error(`Error logging out the user: ${err}`);
    res.redirect(`${process.env.CLIENT_URL}/typescript-todo`);
  });
});

export default authRouter;
