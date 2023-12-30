import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from './useGetUserInfo'

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        incoming: 0.0,
        expense: 0.0,
    })

    const transactionCollectionRef = collection(db, 'transactions');
    const { userID } = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;
        try {

            const queryTransactions = query(
                transactionCollectionRef,
                where('userID', '==', userID, orderBy('createdAt')
                ));

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                const docs = [];
                let totalIncome = 0;
                let totalExpense = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id });


                    if (data.transactionType === 'income') {
                        totalIncome += Number(data.transactionAmount);
                    } else {
                        totalExpense += Number(data.transactionAmount);
                    }

                });

                setTransactions(docs);

                let balance = (totalIncome - totalExpense)
                setTransactionTotals({
                    balance: balance,
                    incoming: totalIncome,
                    expense: totalExpense,
                });
            });

        } catch (error) {
            console.error(error);
        }

        return () => unsubscribe();
    };

    useEffect(() => {
        getTransactions();
    }, [])

    return { transactions, transactionTotals };
}
