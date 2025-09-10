import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../Firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addExpense } from '../redux/expenesSlice'



const AddExpenseForm = () => {

   const dispatch = useDispatch();
    
    const [FormData, setFormData] = useState({
        amount: "",
        category: "",
        date: "",
        description: ""
    });

    const [User, setUser] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (CurrentUser) => {
            setUser(CurrentUser)
        })
        return () => unsub();
    }, [])

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (!User) return;

        dispatch(addExpense({
            ...FormData,
            amount: FormData.amount,
            createdAt: new Date(),
        }));


        try {
            await addDoc(
                collection(db, "users", User.uid, "expenses"),
                {
                    ...FormData,
                    amount: FormData.amount,
                    createdAt: new Date(),
                }
            );

            setFormData({
                amount: "",
                category: "",
                date: "",
                description: ""
            })  

        } catch (error) {
            alert("something went wrong")
            console.log("something went wrong", error)
        }
    };


    return (
        <div className="max-w-md  p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={HandleSubmit} className="space-y-4">

                <input
                    type="number"
                    placeholder="Amount"
                    value={FormData.amount}
                    onChange={(e) => setFormData({ ...FormData, amount: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    type="text"
                    placeholder="Category"
                    value={FormData.category}
                    onChange={(e) => setFormData({ ...FormData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="-1">select</option>
                    <option value="food">food</option>
                    <option value="transport">transport</option>
                    <option value="entertainment">entertainment</option>
                    <option value="bills">bills</option>
                    <option value="other">other</option>
                </select>

                <input
                    type="date"
                    placeholder="Date"
                    value={FormData.date}
                    onChange={(e) => setFormData({ ...FormData, date: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={FormData.description}
                    onChange={(e) => setFormData({ ...FormData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add Expense
                </button>
            </form>
        </div>
    )
}

export default AddExpenseForm
