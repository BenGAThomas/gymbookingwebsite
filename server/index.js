import express from 'express';
import dotenv from 'dotenv';
import { UserRouter } from './routes/userroute.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './database/connectionDatabase.js';

dotenv.config();

const app = express();

connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/api/auth', UserRouter);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'"], // or use 'unsafe-inline' or hash/nonce
      objectSrc: ["'none'"],
    },
  })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// mongoose.connect('mongodb://127.0.0.1:27017/authentication')

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
    console.log(`"Server is running on port 3000"`)
})
