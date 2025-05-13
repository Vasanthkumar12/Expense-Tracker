import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addExpenseToStore } from '../../redux/actions'
import { MdOutlineDelete } from "react-icons/md"
import { toast } from 'react-toastify'

export const AddExpense = () => {
    const [expense, setExpense] = useState({ description: '', amount: '', category: '' })

    const expenses = useSelector((store) => store.expenses)
    const total_amount = useSelector((store) => store.total_budget)
    const total_expense = useSelector((store) => store.total_expense)
    const remaining_amount = total_amount - total_expense

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setExpense({ ...expense, [name]: value })
    }

    const addExpense = (e) => {
        e.preventDefault()

        // Validation
        if ((expense.amount === '' || Number(expense.amount) === 0) && expense.description === '') {
            toast.error('Amount and Description fields are Empty, so enter the Expense Amount and Description...')
            return
        }
        if (expense.amount === '' || Number(expense.amount) === 0) {
            toast.error('Amount field is Empty, so enter the Expense Amount...')
            return
        }
        if (expense.description === '') {
            toast.error('Description field is Empty, so enter the Description of your expense...')
            return
        }
        if (remaining_amount === 0) {
            toast.error(`You don't have any remaining amount. So, you are not able to add Expenses.`)
            return
        }
        if (Number(total_expense) + Number(expense.amount) > total_amount) {
            toast.error(`You don't have enough Budget. You have only $${total_amount - total_expense} remaining. Spend lesser than it.`)
            return
        }

        // Dispatch action
        dispatch(addExpenseToStore(expense))

        // Clear form
        setExpense({ description: '', amount: '', category: '' })
        toast.success(`Expense for '${expense.description}' is added successfully.`)
    }

    const categories = [
        "Mutton", "Chicken", "Fruits", "Vegetables", "Seafood",
        "Dairy Products", "Bakery Items", "Beverages", "Snacks", "Grains & Pulses",
        "Spices & Condiments", "Personal Care", "Household Supplies", "Frozen Foods",
        "Pet Supplies", "Other"
    ]

    return (
        <>
            {/* Form Section */}
            <div className='shadow-md p-4 m-4 mt-10'>
                <form onSubmit={addExpense} className='grid grid-cols-4 gap-2'>
                    <input 
                        type="text" 
                        name='description' 
                        value={expense.description} 
                        onChange={handleChange} 
                        placeholder='Enter description' 
                        className='border p-1 pl-2 text-[18px] rounded-sm'
                    />
                    <input 
                        type="number" 
                        name='amount' 
                        value={expense.amount} 
                        onChange={handleChange} 
                        placeholder='Enter amount' 
                        className='border p-1 pl-2 text-[18px] rounded-sm'
                    />
                    <select 
                        name="category" 
                        value={expense.category} 
                        onChange={handleChange} 
                        className='border p-1 pl-2 text-[18px] rounded-sm'
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input 
                        type="submit" 
                        value='Add Expense' 
                        className='border p-2 pl-5 pr-5 text-white bg-green-600 font-bold rounded-sm cursor-pointer'
                    />
                </form>
            </div>

            {/* Expense Table Section */}
            <div className='m-4 shadow-md p-4 mt-10'>
                <table className='border w-full'>
                    <thead>
                        <tr>
                            <th className='border p-2'>DESCRIPTION</th>
                            <th className='border p-2'>CATEGORY</th>
                            <th className='border p-2'>AMOUNT</th>
                            <th className='border p-2'>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses && expenses.map((exp, index) => (
                            <tr key={index}>
                                <td className='border p-2 text-center'>{exp.description}</td>
                                <td className='border p-2 text-center'>{exp.category}</td>
                                <td className='border p-2 text-center'>${exp.amount}</td>
                                <td className='border'>
                                    <div className='flex justify-center items-center h-full'>
                                        <MdOutlineDelete className='h-7 w-7 text-red-500 hover:text-red-700 cursor-pointer' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
