import app from './app.js';
import dotenv from './config/config.env';


dotenv.config({path:'config/config.env'});

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on localhost:${process.env.PORT}`);
})