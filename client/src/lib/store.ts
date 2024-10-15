import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter/counterSlice"
import paginationParamsReducer from "./paginationParams/paginationParamsSlice";
import newlyCreatedTicketsReducer from './newlyCreatedTickets/newlyCreatedTicketsSlice';
import searchTicketsReducer from './searchTickets/searchTicketsSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            paginationParams: paginationParamsReducer,
            newlyCreatedTickets: newlyCreatedTicketsReducer,
            searchTickets: searchTicketsReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']