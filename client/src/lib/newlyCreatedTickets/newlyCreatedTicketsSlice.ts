import { createSlice } from "@reduxjs/toolkit";



const initialState: Ticket[] = []

const newlyCreatedTicketsSlice = createSlice({
    name: 'newlyCreatedTickets',
    initialState,
    reducers: {
        setNewlyCreatedTickets: (state, action) => {
            return action.payload;
        },
        addNewlyCreatedTicket: (state, action) => {
            const newwlyCreatedTicket: Ticket = {
                ...action.payload,
                newlyCreated: true,
            }
            return [...state, newwlyCreatedTicket];
        },
        removeFromNewlyCreated: (state, action) => {
            const newState = state.filter((ticket: Ticket) => ticket.id !== action.payload.id)
            return newState;
        },
        updateSingleTicket: (state, action) => {
            const newState = state.map((ticket: Ticket) => ticket.id === action.payload.id ? action.payload : ticket)
            return newState;
        }
    }
})

export const {
    setNewlyCreatedTickets,
    addNewlyCreatedTicket,
    removeFromNewlyCreated,
    updateSingleTicket
} = newlyCreatedTicketsSlice.actions
export default newlyCreatedTicketsSlice.reducer