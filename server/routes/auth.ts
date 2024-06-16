import express, { Request, Response } from 'express';
const authRouter = express.Router();
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import { authenticateJWT } from '../middleware/authMiddleware';

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

authRouter.get('/api/user', authenticateJWT, (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(user);
});

authRouter.get(
  '/api/logout',
  authenticateJWT,
  (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) console.error(`Error logging out the user: ${err}`);
      res.redirect(`${process.env.CLIENT_URL}/typescript-todo`);
    });
  },
);

export default authRouter;
