import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db, 'transactions');

    const { userID } = useGetUserInfo();

    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType
    }) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        });
        console.log('Added transaction to transaction collection!');
        alert(`Added transaction to transaction collection! ${description}: ${transactionAmount}`);
    };
    return { addTransaction };
}
