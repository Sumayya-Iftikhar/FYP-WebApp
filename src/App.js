import './App.css';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from './DOCTOR_SCREENS/SocketContext';

import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";


import Add_Person from "./ADMIN_SCREENS/Add_Person";
import Add_Institute from './ADMIN_SCREENS/Add_Institute';
import Admin_Dashboard from './ADMIN_SCREENS/Admin_Dashboard';

import Communication from './DOCTOR_SCREENS/Communication';

import Delete_Record from './ADMIN_SCREENS/Delete_Record';
import Display_All_Records from './ADMIN_SCREENS/Display_All_Records';
import Data_Visualization from './RESEARCHER_SCREENS/Data_Visualization';
import Display_Record_Details from './ADMIN_SCREENS/Display_Record_Details';
import Doctor_Complaint_Details from './DOCTOR_SCREENS/Doctor_Complaint_Details';


import Forgot_Password_Screen from './COMMON_SCREENS/Forgot_Password_Screen';

import Home from './COMMON_SCREENS/Home';

import Login from './COMMON_SCREENS/Login';

import Report_Details_Screen from './ADMIN_SCREENS/Report_Details_Screen';
import Request_Details_Screen from './ADMIN_SCREENS/Request_Details_Screen';
import Researcher_All_Camplaints from './RESEARCHER_SCREENS/Researcher_All_Camplaints';

import UserProfile from './COMMON_SCREENS/UserProfile';
import Update_Record from './ADMIN_SCREENS/Update_Record';

import View_All_Reports from './ADMIN_SCREENS/View_All_Reports';
import View_All_Campaign_Requests from './ADMIN_SCREENS/View_All_Campaign_Requests';


import Doctor_Dashboard from './DOCTOR_SCREENS/Doctor_Dashboard';
import Display_All_Cases from './DOCTOR_SCREENS/Display_All_Cases';
import Display_Current_Cases from './DOCTOR_SCREENS/Display_Current_Cases';
import View_All_Camplaints from './DOCTOR_SCREENS/View_All_Camplaints';
import New_Complaint from './DOCTOR_SCREENS/New_Complaint';
import Patient_Details from './DOCTOR_SCREENS/Patient_Details';

import Researcher_Dashboard from './RESEARCHER_SCREENS/Researcher_Dashboard';
import Researcher_New_Complaint from './RESEARCHER_SCREENS/Researcher_New_Complaint';
import Researcher_Complaint_Details from './RESEARCHER_SCREENS/Researcher_Complaint_Details';

import Confirmed_Patients from './Confirmed_Patients';
import Current_Cases from './Current_Cases';
import Delete_Hospital from './Delete_Hospital';
import View_Details from './View_Details';
import Hospital_List from './Hospital_List';
import Complaints from './Complaints';
import Report_Issue from './Report_Issue';
import View_Edit from "./View_Edit";
import Compaign_Request from "./Compaign_Request";


const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/Admin_Dashboard/' component={Admin_Dashboard} />
        <Route exact path='/Add_Person/' component={Add_Person} />
        <Route exact path='/Add_Institute/' component={Add_Institute} />

        <Route exact path='/Compaign_Request/' component={Compaign_Request} />
        <Route exact path='/Complaints/' component={Complaints} />
        <Route exact path='/Confirmed_Patients/' component={Confirmed_Patients} />
        <Route exact path='/Current_Cases/' component={Current_Cases} />
        <Route exact path='/Communication/' component={Communication} />

        <Route exact path='/Delete_Record/' component={Delete_Record} />
        <Route exact path='/Doctor_Dashboard/' component={Doctor_Dashboard} />
        <Route exact path='/Doctor_New_Complaint/' component={New_Complaint} />
        <Route exact path='/Display_All_Cases/' component={Display_All_Cases} />
        <Route exact path='/Data_Visualization/' component={Data_Visualization} />
        <Route exact path='/Display_All_Records/' component={Display_All_Records} />
        <Route exact path='/Display_Current_Cases/' component={Display_Current_Cases} />
        <Route exact path='/Display_Record_Details/' component={Display_Record_Details} />
        <Route exact path='/Doctor_Complaint_Details/' component={Doctor_Complaint_Details} />

        <Route exact path='/Forgot_Password_Screen/' component={Forgot_Password_Screen} />

        <Route exact path='/Login/' component={Login} />

        <Route exact path='/Patient_Details/' component={Patient_Details} />

        <Route exact path='/Researcher_Dashboard/' component={Researcher_Dashboard} />
        <Route exact path='/Report_Details_Screen/' component={Report_Details_Screen} />
        <Route exact path='/Request_Details_Screen/' component={Request_Details_Screen} />
        <Route exact path='/Researcher_New_Complaint/' component={Researcher_New_Complaint} />
        <Route exact path='/Researcher_All_Camplaints/' component={Researcher_All_Camplaints} />
        <Route exact path='/Researcher_Complaint_Details/' component={Researcher_Complaint_Details} />

        <Route exact path='/UserProfile/' component={UserProfile} />
        <Route exact path='/Update_Record/' component={Update_Record} />

        <Route exact path='/View_All_Camplaints/' component={View_All_Camplaints} />
        <Route exact path='/View_All_Reports/' component={View_All_Reports} />
        <Route exact path='/View_All_Campaign_Requests/' component={View_All_Campaign_Requests} />

        <Route exact path='/Delete_Hospital/' component={Delete_Hospital} />
        <Route exact path='/View_Details/' component={View_Details} />
        <Route exact path='/Hospital_List/' component={Hospital_List} />
        <Route exact path='/View_Edit/' component={View_Edit} />


        <Route exact path='/Report_Issue/' component={Report_Issue} />
      </Switch>
      <ScrollUpButton style={{ backgroundColor: "white" }} />
    </>
  );
};

export default App;
