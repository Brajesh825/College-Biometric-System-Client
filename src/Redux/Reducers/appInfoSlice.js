import { createSlice } from "@reduxjs/toolkit";

const appInfoSlice = createSlice({
  name: "counter",
  initialState: {
    selectedOption: [],
    bulkStudentAddModal: false,
    studentDataUploadingLoader: false,
    successAlert:false,
    studentDetailsModal:false,
    studentDetails:[]
  },
  reducers: {
    selectOptions(state, { payload }) {
      state.selectedOption.push(payload);
    },
    removeOptions(state, { payload }) {
      state.selectedOption = state.selectedOption.filter(
        (option) => option !== payload
      );
    },
    setFilteredStudents(state, { payload }) {
      state.selectedOption = payload;
    },
    openBulkStudentAddModal(state) {
      state.bulkStudentAddModal = true;
    },
    closeBulkStudentAddModal(state) {
      state.bulkStudentAddModal = false;
    },
    openStudentDataUploadingLoader(state) {
      state.studentDataUploadingLoader = true;
    },
    closeStudentDataUploadingLoader(state) {
      state.studentDataUploadingLoader = false;
    },
    openSuccessAlert (state){
      state.successAlert=true;
    },
    closeSuccessAlert (state)  {
      state.successAlert=false;
    },
    openStudentDetailsModal (state){
      state.studentDetailsModal=true;
    },
    closeStudentDetailsModal (state)  {
      state.studentDetailsModal=false;
    },
    setStudentDetails (state,{payload}) {
      state.studentDetails=payload
    }
  },
});

export const {
  selectOptions,
  decrement,
  removeOptions,
  setFilteredStudents,
  closeBulkStudentAddModal,
  openBulkStudentAddModal,
  openStudentDataUploadingLoader,
  closeStudentDataUploadingLoader,
  openSuccessAlert,
  closeSuccessAlert,
  openStudentDetailsModal,
  closeStudentDetailsModal,
  setStudentDetails
} = appInfoSlice.actions;
export default appInfoSlice.reducer;
