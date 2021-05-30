import patients from "./images/patients.jpg";
import list from "./images/list.jpg";
import comunication from "./images/comunication.png";
import call from "./images/call.jpg";
import profile from "./images/profile.png";

const CardData = [
    {
        imgsrc: patients,
        title: "Current Cases",
        navigate: '/Current_Cases/'
    },
    {
        imgsrc: list,
        title: "Confirmed Patients" ,
        navigate: "/Confirmed_Patients/"
    },
    {
        imgsrc: comunication,
        title: "Communication",
        navigate: "/"
    },
    {
        imgsrc: list,
        title: "Report An Issue",
        navigate: "/Report_Issue/"
    },
    
    {
        imgsrc: patients,
        title: "View Reports" ,
        navigate: "/Complaints/"
    },
];

export const Admin_CardData = [
    {
        imgsrc: patients,
        title: "Register New Member",
        navigate: '/Register_Member/'
    },
    {
        imgsrc: list,
        title: "Delete Member" ,
        navigate: "/Delete_Member/"
    },
    {
        imgsrc: patients,
        title: "Register New Hospital/Dispensary",
        navigate: '/Add_Hospital/'
    },
    {
        imgsrc: list,
        title: "Delete Hospital/Dispensary" ,
        navigate: "/Delete_Hospital/"
    },
    {
        imgsrc: comunication,
        title: "View Details",
        navigate: "/View_Details/"
    },
    {
        imgsrc: patients,
        title: "Complaints" ,
        navigate: "/Complaints/"
    },
    {
        imgsrc: call,
        title: "Compaign Requests",
        navigate: "/Compaign_Request/"
    },
];

export const Researcher_CardData = [
    {
        imgsrc: patients,
        title: "....",
        navigate: '/Current_Cases/'
    },
    {
        imgsrc: list,
        title: "Message" ,
        navigate: "/"
    },
    {
        imgsrc: patients,
        title: "Call",
        navigate: '/Current_Cases/'
    },
    {
        imgsrc: list,
        title: "" ,
        navigate: "/"
    },
    {
        imgsrc: comunication,
        title: "",
        navigate: "/"
    },
    {
        imgsrc: list,
        title: "" ,
        navigate: "/"
    },
];


export default CardData;


