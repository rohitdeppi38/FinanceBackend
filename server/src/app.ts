import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db';

import { verifyToken } from './middlewares/authMiddleware';
import { allowRoles } from './middlewares/roleMiddleware';

//routes
import authRoute from './routes/authRoute';
import transactionRoute from './routes/transactionRoute';
import dashboardRoute from './routes/dashboardRoute';

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

//api route's
app.use('/api/auth',authRoute);         
app.use('/admin',verifyToken,allowRoles("admin"),(req,res)=>{
    res.json({message:"Admin access granted"});
})

app.use('/api/transactions',transactionRoute);

app.use('/api/dashboard',dashboardRoute);

app.get('/',(req,res)=>{
    return res.send("server is on typeScript");
})


app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})
