import { legacy_createStore } from "redux";
import { expenseReducer } from "./expenseReducer";

export const expensesStore = legacy_createStore(expenseReducer)