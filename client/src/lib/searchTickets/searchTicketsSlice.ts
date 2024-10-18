import { createSlice } from "@reduxjs/toolkit";



const initialState: Ticket[] = []

const searchTicketsSlice = createSlice({
    name: 'searchTickets',
    initialState,
    reducers: {
        setSearchTickets: (state, action) => {
            return action.payload;
        },
        removeFromSearchTickets: (state, action) => {
            const newState = state.filter((ticket: Ticket) => ticket.id !== action.payload.id)
            return newState;
        },
        updateSingleSearchTicket: (state, action) => {
            const newState = state.map((ticket: Ticket) => ticket.id === action.payload.id ? action.payload : ticket)
            return newState;
        }
    }
})

export const {
    setSearchTickets,
    removeFromSearchTickets,
    updateSingleSearchTicket
} = searchTicketsSlice.actions
export default searchTicketsSlice.reducer