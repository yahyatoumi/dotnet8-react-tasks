import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    page: 0,
    pageSize: 10
}

const currentProjectSlice = createSlice({
    name: 'paginationParams',
    initialState,
    reducers: {
        setPaginationParams: (state, action) => {
            console.log("TATEEEE", action.payload)
            return action.payload;
        },
    }
})

export const { setPaginationParams } = currentProjectSlice.actions
export default currentProjectSlice.reducer