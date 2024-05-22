import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './App/slice'
import toolMenuReducer from './ToolMenu/slice'
import gannReducer from './Gann/slice'

export const reducers = {
    app: appReducer,
    toolMenu: toolMenuReducer,
    gann: gannReducer,
}
const rootReducer = combineReducers({
    ...reducers
})
export type RootState = ReturnType<typeof rootReducer>