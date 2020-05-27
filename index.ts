import * as express from 'express';
import {Request, Response} from 'express';
import LoginRegister from './routes/login-register';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());


app.use('/',LoginRegister.Route())


app.listen(process.env.PORT || 3000, ()=>{
console.log('Sever running on port 3000');
});