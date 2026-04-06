import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';

import { verifyToken } from './middlewares/authMiddleware.js';
import { allowRoles } from './middlewares/roleMiddleware.js';

//routes
import authRoute from './routes/authRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import dashboardRoute from './routes/dashboardRoute.js';

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
    return res.send("Hello from finance tracker Api");
})


app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})
