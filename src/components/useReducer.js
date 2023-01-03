import { createReducer, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { updateAge, updateName, updateStatus } from "./action";
const initialState = {
    fakeApidata: [],
}

const useReducer = createSlice({
    name: "person",
    initialState,
    reducers: {
        updateData(state, action) {
            // console.log("ACTIONPAYLOAD",action)
            // state.fakeApidata = state.fakeApidata.concat(action.payload.fakeApidata)
            // state.fakeApidata = [...state.fakeApidata, ...action.payload]
            state.fakeApidata = action.payload
            // state.error = action.error.message
        },
        onEndUpdateData(state, action) {
            // console.log("ACTIONPAYLOAD",action)
            // state.fakeApidata = [...state.fakeApidata,...action.payload]
            state.fakeApidata = state.fakeApidata.concat(action.payload)
            // console.log("state.fakeApidata before splice",state.fakeApidata)
            state.fakeApidata = state.fakeApidata.splice(1)
            // console.log("state.fakeApidata after splice",state.fakeApidata)
        },
        onPullUpdateData(state, action) {
            // console.log("ACTIONPAYLOAD",action)
            state.fakeApidata = [action.payload].concat(state.fakeApidata)
            // console.log("state.fakeApidata before splice",state.fakeApidata)
            state.fakeApidata = state.fakeApidata.splice(0, state.fakeApidata.length - 1)
            // console.log("state.fakeApidata after splice",state.fakeApidata)
        }
    },
})

export const { updateData, onEndUpdateData, onPullUpdateData } = useReducer.actions
export default useReducer.reducer