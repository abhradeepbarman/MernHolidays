import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import searchReducer from "../slices/SearchSlice";
import signupReducer from "../slices/SignupSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    signup: signupReducer,
})

export default rootReducer