import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';
import "./app/config/passport";
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import expressSession from 'express-session'
import { envVars } from './app/config/env';
const app:Application = express();
app.use(expressSession({
  secret:"Your secret",
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.set("trust proxy", 1)
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: envVars.FRONTEND_URL,
  credentials:true
}))



app.use('/api/v1', router)

app.get('/', async(req:Request, res:Response)=>{
  res.send("Welcome to tour management system")
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;