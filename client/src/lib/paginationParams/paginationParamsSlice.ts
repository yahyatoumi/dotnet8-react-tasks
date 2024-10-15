import { createSlice } from "@reduxjs/toolkit";

interface PaginationParamsType {
    page: number,
    pageSize: number
}

const initialState: PaginationParamsType = {
    page: 0,
    pageSize: 10
}

const paginationParamsSlice = createSlice({
    name: 'paginationParams',
    initialState,
    reducers: {
        setPaginationParams: (state, action) => {
            return action.payload;
        },
    }
})

export const { setPaginationParams } = paginationParamsSlice.actions
export default paginationParamsSlice.reducer