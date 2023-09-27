

import { Routes, Route } from "react-router-dom";
import Register  from "../pages/register";
import Login from "../pages/login";

// import PrivateRoute from "../routes/privateRoute";
// import PublicRoute from "../services/routes/publicRoute";
//import SharedLayout from "./SharedLayout/SharedLayout";


//const RegisterPage = lazy(() => import("../pages/Register"));
//const LoginPage = lazy(() => import("../pages/Login"));

const App = () => {
  return (
    
      
    
    <>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
       
        {/* <Route path="/dashboard" element={<DashBoard />}></Route> */}
        <Route path="*" element={<Register />} />
      </Routes>
    </>
  );   
      
    
};

export default App;
