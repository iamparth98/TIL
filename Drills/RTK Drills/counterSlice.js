import {createSlice} from "@reduxjs/Toolkit"

const counterSlice = createSlice({
    name: 'counter',
    initialState : {
        count : 0  
    },
    reducers: {
        increment: (state, action)=>{
            state.count = state.count + 1;
        }
    },
})

export const {increment} = counterSlice.actions;
export default counterSlice.reducer;