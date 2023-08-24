import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName:"",
    lastName:"",
    email:"",
    image:"",
    _id:"",

     
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.email = action.payload.data.email;
      state.image = action.payload.data.image;
        },
        logout: (state, action) => {
            state._id = '';
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.image = '';
        }

    }
})

export default userSlice.reducer;
export const { login,logout } = userSlice.actions;