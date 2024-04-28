import { createSlice } from "@reduxjs/toolkit";

export const SignupSlice = createSlice({
    name: "signup",
    initialState: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    },
    reducers: {
        setSignupData: (state, action) => {
            const { firstName, lastName, email, password, confirmPassword} = action.payload;
            
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.password = password;
            state.confirmPassword = confirmPassword;
        }
    }
})

export const { setSignupData } = SignupSlice.actions
export default SignupSlice.reducer