import './App.css';
import './Static/Css/style.css'
// import './Static/Javascript/main'
import { useSelector,useDispatch } from 'react-redux';
import { updateUTypeAdmin,updateUTypeOwner,resetUType } from './Redux/UserTypeSlice';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Login from './Components/Login';
import { useEffect, useState } from 'react';
import Register from './Components/Register';
import Logout from './Components/Logout';
import AddProperty from './Components/AddProperty';
import Bundle from './Components/Bundle';
import PropertyDetails from './Components/PropertyDetails';
import Booking from './Components/Booking';
import BookingStatus from './Components/BookingStatus';
import Navbar from './Components/Navbar';
import ListProperties from './Components/ListProperties';
import ListUsers from './Components/ListUsers';
import ListFeedback from './Components/ListFeedback';
import ListBookings from './Components/ListBookings';
import ForgetPassword from './Components/ForgetPassword';
import Search from './Components/Search';
import Feedback from './Components/Feedback';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  // const[userType,setUserType]=useState("USER")

  const dispatch=useDispatch();
  useEffect(()=>{
    const loginStaus = localStorage.getItem("isLogin");
    const utyp= localStorage.getItem("userTyp");
    

    if(loginStaus){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }

    if(utyp==="OWNER"){
      dispatch(updateUTypeOwner())
    }
    else if(utyp==="ADMIN"){
      dispatch(updateUTypeAdmin())
    }
    else{
      dispatch(resetUType())
    }

  })

  const changeLoginStatus = (status) => {
    setIsLogin(status);
  }

  
  return (
    isLogin ? (
      <div className="App">
        <Router>
        <Navbar />
          <Routes>
            <Route path='/' element={<Bundle/>}/>
            <Route path='/logout' element = {<Logout/>}/>
            <Route path='/addProperty' element = {<AddProperty/>}/>
            <Route path='/propertyDtails/:id' element = {<PropertyDetails/>}/>
            <Route path='/booking' element = {<Booking/>}/>
            <Route path="/bookingStatus" element = {<BookingStatus/>}/>
            <Route path="/listProps" element = {<ListProperties/>}/>
            <Route path="/listUsers" element = {<ListUsers/>}/>
            <Route path="/listFeedbacks" element = {<ListFeedback/>}/>
            <Route path="/listBookings" element = {<ListBookings/>}/>
            <Route path="/search" element = {<Search/>}/>
            <Route path="/feedback" element = {<Feedback/>}/>
          </Routes>
        </Router>

      </div>)
      : (
        <div className="App">
          <Router>
            <Routes>
              <Route path='/' element={<Login status={changeLoginStatus} />}/>
              <Route path='/register' element={<Register/>}/>
              <Route path="/forgetPassword" element = {<ForgetPassword/>}/>
            </Routes>
          </Router>
          {/* <Login status={changeLoginStatus} /> */}
        </div>
      )
  );
}
export default App;
