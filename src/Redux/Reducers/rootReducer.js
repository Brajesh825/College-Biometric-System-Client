import { combineReducers } from "@reduxjs/toolkit";
import appInfoSlice from "./appInfoSlice";
import attendanceInfoSlice from "./attendanceInfoSlice";
import studentInfoSlice from "./studentInfoSlice";


const rootReducer=combineReducers({
    appInfo:appInfoSlice,
    attendance:attendanceInfoSlice,
    student:studentInfoSlice
})

export default rootReducer