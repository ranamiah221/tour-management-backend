import express, { Application, Request, Response } from 'express'

const app:Application = express();

app.get('/', async(req:Request, res:Response)=>{
  res.send("Welcome to tour management system")
})

export default app;