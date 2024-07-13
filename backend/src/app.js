import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: 'http://localhost:3001', // your frontend URL
    credentials: true
  }));

app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended:true , limit: " 16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//routes import
// import studentRouter from './routes/student.routes.js'
import adminRouter from './routes/admin.routes.js'

//routes declaration
// app.use("/api/v1/student" , studentRouter)
app.use("/api/v1/admin" , adminRouter)


export {app}