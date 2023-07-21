import { createSlice } from "@reduxjs/toolkit";

const studentInfoSlice = createSlice({
    name: "attendanceInfoSlice",
    initialState: { allStudentsDetails:[] },
    reducers: {
      getAllStudentsDetails (state,{payload}){
        state.allStudentsDetails=payload
      }
    },
  });
  
  export const {getAllStudentsDetails } = studentInfoSlice.actions;
  export default studentInfoSlice.reducer;