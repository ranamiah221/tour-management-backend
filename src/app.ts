import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app:Application = express();
app.use(express.json())
app.use(cors())


app.use('/api/v1', router)

app.get('/', async(req:Request, res:Response)=>{
  res.send("Welcome to tour management system")
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;