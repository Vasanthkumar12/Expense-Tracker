import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseToStore } from '../../redux/actions';
import { MdOutlineDelete } from "react-icons/md";
import { toast } from 'react-toastify';

export const AddExpense = () => {
  const [expense, setExpense] = useState({ description: '', amount: '', category: '' });

  const expenses = useSelector((store) => store.expenses);
  const total_amount = useSelector((store) => store.total_budget);
  const total_expense = useSelector((store) => store.total_expense);
  const remaining_amount = total_amount - total_expense;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const addExpense = (e) => {
    e.preventDefault();

    if ((expense.amount === '' || Number(expense.amount) === 0) && expense.description === '') {
      toast.error('Amount and Description fields are Empty.');
      return;
    }
    if (expense.amount === '' || Number(expense.amount) === 0) {
      toast.error('Please enter a valid expense amount.');
      return;
    }
    if (expense.description === '') {
      toast.error('Please enter a description.');
      return;
    }
    if (remaining_amount === 0) {
      toast.error(`No remaining budget to add expenses.`);
      return;
    }
    if (Number(total_expense) + Number(expense.amount) > total_amount) {
      toast.error(`Budget exceeded. Only $${remaining_amount} remaining.`);
      return;
    }

    dispatch(addExpenseToStore(expense));
    setExpense({ description: '', amount: '', category: '' });
    toast.success(`Expense for '${expense.description}' added successfully.`);
  };

  const categories = [
    "Mutton", "Chicken", "Fruits", "Vegetables", "Seafood",
    "Dairy Products", "Bakery Items", "Beverages", "Snacks", "Grains & Pulses",
    "Spices & Condiments", "Personal Care", "Household Supplies", "Frozen Foods",
    "Pet Supplies", "Other"
  ];

  return (
    <>
      {/* Form Section */}
      <div className='shadow-md p-4 m-4 mt-10 bg-white rounded-md'>
        <form onSubmit={addExpense} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <input
            type="text"
            name='description'
            value={expense.description}
            onChange={handleChange}
            placeholder='Enter description'
            className='border p-2 text-base rounded-md w-full'
          />
          <input
            type="number"
            name='amount'
            value={expense.amount}
            onChange={handleChange}
            placeholder='Enter amount'
            className='border p-2 text-base rounded-md w-full'
          />
          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
            className='border p-2 text-base rounded-md w-full'
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="submit"
            value='Add Expense'
            className='bg-green-600 text-white p-2 rounded-md font-semibold hover:bg-green-700 transition-all duration-200 w-full cursor-pointer'
          />
        </form>
      </div>

      {/* Expense Table Section */}
      <div className='m-4 shadow-md p-4 mt-10 bg-white rounded-md overflow-x-auto'>
        <table className='w-full min-w-[600px] border text-sm sm:text-base'>
          <thead>
            <tr className='bg-lime-200 text-lime-700'>
              <th className='border p-2'>DESCRIPTION</th>
              <th className='border p-2'>CATEGORY</th>
              <th className='border p-2'>AMOUNT</th>
              <th className='border p-2'>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {expenses && expenses.map((exp, index) => (
              <tr key={index} className='hover:bg-lime-50'>
                <td className='border p-2 text-center'>{exp.description}</td>
                <td className='border p-2 text-center'>{exp.category}</td>
                <td className='border p-2 text-center'>${exp.amount}</td>
                <td className='border p-2'>
                  <div className='flex justify-center'>
                    <MdOutlineDelete className='h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer' />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
