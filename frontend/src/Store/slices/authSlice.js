import { createSlice } from '@reduxjs/toolkit'
import Cookies from "js-cookie"

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get("auth_token") || null,
    userId: localStorage.getItem("userId") || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
  },
})

export const { setToken, setUserId, setIsLoading } = authSlice.actions
export default authSlice.reducer