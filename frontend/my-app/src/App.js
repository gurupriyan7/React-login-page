import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/user/Login/Login'
import Signup from './components/user/Signup/Sighup'
import View from "./components/user/View/View";
import AdminLogin from "./components/admin/Login/AdminLogin"
import AllUsers from "./components/admin/UserMangement/AllUsers";
import EditUser  from "./components/admin/UserMangement/EditUser";
function App() {

  
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/view" element={<View/>}/>
      <Route path="/admin" element={<AllUsers/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path="/admin/edituser/:userId" element={<EditUser/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
