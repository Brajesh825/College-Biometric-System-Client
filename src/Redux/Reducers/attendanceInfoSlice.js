import { createSlice } from "@reduxjs/toolkit";

const attendanceInfoSlice = createSlice({
  name: "attendanceInfoSlice",
  initialState: { attendanceReport: [], uploadedStudentsDetails:[] },
  reducers: {
    addAttendance(state, { payload }) {
      state.attendanceReport.push(payload);
    },
    setUploadedStudentsDetails (state, {payload}) {
      state.uploadedStudentsDetails=payload
    }
  },
});

export const { addAttendance, setUploadedStudentsDetails } = attendanceInfoSlice.actions;
export default attendanceInfoSlice.reducer;
