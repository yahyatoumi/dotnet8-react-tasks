import { createSlice } from "@reduxjs/toolkit";



const initialState: Ticket[] = []

const searchTicketsSlice = createSlice({
    name: 'searchTickets',
    initialState,
    reducers: {
        setSearchTickets: (state, action) => {
            return action.payload;
        },
    }
})

export const {
    setSearchTickets,
} = searchTicketsSlice.actions
export default searchTicketsSlice.reducer