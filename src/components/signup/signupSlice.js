import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: '',
    successMsg: ''
}
const register = createSlice({
    name: 'register',
    initialState: {
        name: "",
        phone: "",
        email: "ali@gmail.com",
        company: "",
        address: "",
        password: "123456789",
        rpassword: ""
    },
    reducers:{
        updateVal:(state, {payload: {val, key}})=>{
            state[key] = val
        },
    },
});

export const { updateVal } = register.actions;

export default register.reducer;