import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("auth_token") || null,
    userId: localStorage.getItem("userId") || null,
    isLoading: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
})

export const { setToken, setUserId, setIsLoading } = authSlice.actions
export default authSlice.reducer