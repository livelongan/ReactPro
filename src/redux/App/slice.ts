import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import initialState from './initialState'
import { RootState } from '../reducer'

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setErrorCatch: (state, action: PayloadAction<unknown>) => {
      state.errorCatch = action.payload
    },
  }
})

export const selectErrorCatch = (state: RootState) => state.app.errorCatch
export const { setErrorCatch } = appSlice.actions
export default appSlice.reducer