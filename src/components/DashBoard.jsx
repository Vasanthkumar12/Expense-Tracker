import React from 'react'
import { SetBudget } from './Budget/SetBudget'
import { AddExpense } from './Budget/AddExpense'

export const DashBoard = () => {
  return (
    <div>
        <SetBudget />
        <AddExpense />
    </div>
  )
}
