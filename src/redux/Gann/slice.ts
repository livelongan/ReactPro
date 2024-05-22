import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import initialState from './initialState'
import { GannField } from './type'
import { RootState } from '../reducer'

export const gannSlice = createSlice({
  name: 'gann',
  initialState,
  reducers: {
    setGannField: (state, action: PayloadAction<{ key: keyof GannField, value: number }>) => {
      const key = action.payload.key
      const value = action.payload.value
      switch (key) {
        case 'price':
          state.gannField.price = value
          break;
        case 'step':
          state.gannField.step = value
          break;
      }
    },
  }
})

export const selectGannField = (state: RootState) => state.gann.gannField
export const { setGannField } = gannSlice.actions
export default gannSlice.reducer