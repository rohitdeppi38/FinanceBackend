import { Request, Response } from "express";
import Transaction from "../models/transaction.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

//Create 
export const createTransaction = async (req: AuthRequest, res: Response) => {
    try {
        const { amount, type, category, note } = req.body;

        const transaction = await Transaction.create({
            userId: req.user.id,
            amount,
            type,
            category,
            note,
        });

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        if (!type || !["income", "expense"].includes(type)) {
            return res.status(400).json({ message: "Invalid type" });
        }

        res.status(201).json(transaction);
    } catch (error) {
        console.log("error in createTransaction controller ", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

//GET
export const getTransaction = async (req: AuthRequest, res: Response) => {
    try {
        const { type, category } = req.query;

        const filter: any = { userId: req.user.id };

        if (type) filter.type = type;
        if (category) filter.category = category;

        const transactions = await Transaction.find(filter);

        res.json(transactions);
    } catch (error) {
        console.log("error in get all transaction controller", error);
        return res.status(500).json({ message: "Internal server Error" });
    }
};

//UPDATE 

export const updateTransaction = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const updated = await Transaction.findOneAndUpdate({ _id: id, userId: req.user.id },
            req.body,
            { new: true }
        )
        res.json(updated);

    } catch (error) {
        console.log("error in the update controller", error);
        res.status(500).json({ message: "Server Error" });
    }
}

//DELETE
export const deleteTransaction = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        await Transaction.findOneAndDelete({
            _id: id,
            userId: req.user.id
        })
    } catch (error) {
        console.log("error in the delete controller", error);
        res.status(500).json({ message: "Server errror" });
    }
}