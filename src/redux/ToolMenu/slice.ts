import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import initialState from './initialState'
import { RootState } from '../reducer'

export const toolMenuSlice = createSlice({
  name: 'toolMenu',
  initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload
    },
  }
})

export const selectCollapsed = (state: RootState) => state.toolMenu.collapsed
export const { setCollapsed } = toolMenuSlice.actions
export default toolMenuSlice.reducer