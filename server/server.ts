import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { connectDB } from './config/db';
import './config/passport.js';
import router from './routes';
import authRouter from './routes/auth';

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET!,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

connectDB();
app.use(router);
app.use(authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
