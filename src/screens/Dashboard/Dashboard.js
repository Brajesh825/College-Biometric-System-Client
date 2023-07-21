import React from 'react';
import Leftbar from '../../components/Leftbar/Leftbar';
import DashboardContent from '../../components/DashboardContent/DashboardContent';
import './Dashboard.css'
import AddStudentModal from '../../components/AddStudentModal/AddStudentModal';
import SuccessAlert from '../../components/SuccessAlert/SuccessAlert';
import { useSelector } from 'react-redux';



const Dashboard = () => {

  const {successAlert}= useSelector(state=>state.appInfo)

  const {uploadedStudentsDetails}=useSelector(state=>state.attendance)

  return (
    <div className='dashboard'>
        <Leftbar/>
      
        <DashboardContent/>
        <AddStudentModal/>
        {/* {successAlert && <SuccessAlert/>} */}
        <SuccessAlert title={uploadedStudentsDetails.length + "Students has been registered"}/>
    </div>
  )
}

export default Dashboard