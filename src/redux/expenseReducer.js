import { ADD_EXPENSE, SET_BUDGET } from "./actionTypes"

const initialState = {
    total_budget: 0,
    total_expense: 0,
    remaining: 0,
    expenses: []
}

export const expenseReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_BUDGET:
            return { ...state, total_budget: action.payload, remaining: action.payload }
        case ADD_EXPENSE:
            return { 
                ...state,
                expenses: [...state.expenses, action.payload],
                total_expense: state.total_expense + Number(action.payload.amount),
                remaining: state.total_budget - state.total_expense
            }
        default:
            return state
    }
}