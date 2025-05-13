import { ADD_EXPENSE, SET_BUDGET } from "./actionTypes"

export const setTotalBudget = (budget) => {
    return {
        type: SET_BUDGET, payload: budget
    }
}

export const addExpenseToStore = (expense) => {
    console.log(expense)
    return {
        type: ADD_EXPENSE, payload: expense
    }
}