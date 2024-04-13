import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("auth_token") || null,
    userId: localStorage.getItem("userId") || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    }
  },
})

export const { setToken, setUserId } = authSlice.actions
export default authSlice.reducer