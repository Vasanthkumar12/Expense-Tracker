import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTotalBudget } from '../../redux/actions'
import { toast } from 'react-toastify'

export const SetBudget = () => {
    const dispatch = useDispatch()
    const [budget, setBudget] = useState('')

    const total_amount = useSelector((store) => store.total_budget)
    const total_expense = useSelector((store) => store.total_expense)
    const remaining_amount = total_amount - total_expense

    const handleSetBudget = (e) => {
        e.preventDefault()
        if (budget === '') {
            toast.error("Please enter the Budget")
            return
        }
        if (Number(budget) === 0) {
            toast.error("Please enter Budget more than 0")
            return
        }
        dispatch(setTotalBudget(budget))
        setBudget('')
        toast.success("Budget has set successfully. Now you can add your expenses below.")
    }

    return (
        <div className='px-4 md:px-8'>
            <h1 className='text-2xl md:text-3xl font-bold pt-5'>Expense Tracker</h1>

            <div className='shadow-md mt-5 p-4 rounded-md bg-white'>
                <form onSubmit={handleSetBudget} className='flex flex-col md:flex-row gap-3 md:gap-2'>
                    <input
                        type="number"
                        name='budget'
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder='Enter budget amount'
                        className='border p-2 text-base rounded-sm flex-1'
                    />
                    <input
                        type="submit"
                        value='Set Budget'
                        className='bg-blue-600 text-white font-bold px-5 py-2 rounded-sm cursor-pointer'
                    />
                </form>

                <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    <div className='bg-blue-100 p-4 rounded-md'>
                        <h2 className='text-sm text-blue-600'>Total Budget</h2>
                        <h1 className='text-xl font-bold'>${total_amount}</h1>
                    </div>
                    <div className='bg-green-100 p-4 rounded-md'>
                        <h2 className='text-sm text-green-600'>Total Expense</h2>
                        <h1 className='text-xl font-bold'>${total_expense}</h1>
                    </div>
                    <div className='bg-yellow-100 p-4 rounded-md'>
                        <h2 className='text-sm text-yellow-600'>Remaining</h2>
                        <h1 className='text-xl font-bold'>${remaining_amount}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
