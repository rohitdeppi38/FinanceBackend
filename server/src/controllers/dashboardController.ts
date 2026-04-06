import {Response} from 'express'
import Transaction from '../models/transaction';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getSummary = async(req:AuthRequest,res:Response)=>{
    try {
    const userId = req.user.id;

    const transactions = await Transaction.find({ userId });

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryWise: any = {};

    transactions.forEach((t) => {
      if (t.type === "income") totalIncome += t.amount ?? 0;
      else totalExpense += t.amount ?? 0;

      // category-wise
      const category = t.category ?? "Uncategorized";
      if (!categoryWise[category]) {
        categoryWise[category] = 0;
      }
      categoryWise[category] += t.amount;
    });

    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryWise,
      totalTransactions: transactions.length
    });

  }catch(error){
        console.log("error in getsummary",error);
        return  res.status(500).json({ message: "Server error" });
    }
}