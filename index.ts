import * as express from 'express';
import {Request, Response} from 'express';
import LoginRegister from './routes/login-register';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());


app.use('/',LoginRegister.Route())


app.listen(process.env.DEFAULT_PORT, ()=>{
console.log('Sever running on port '+process.env.DEFAULT_PORT);
});