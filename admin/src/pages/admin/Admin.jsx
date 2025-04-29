// import { Routes, Route } from "react-router-dom";
 
// import Sidebar from "../../components/Sidebar/Sidebar";
// import "./Admin.css";
// import Addproduct from "../../components/Addproduct/Addproduct.jsx";
// import Listproduct from "../../components/Listproduct/Listproduct.jsx";
// import Orderlist from "../../components/Orderlist/Orderlist.jsx";
// import EditProduct from "../../components/Addproduct/EditProduct.jsx";
// import EditProductImages from "../../components/Addproduct/EditProductImages.jsx";
// import Login from "../../components/Login/Login.jsx";
// import Register from "../../components/Register/Register.jsx";

// function Admin() {
//   return (
//     <div className="admin">
//       <Sidebar/>
//       <Routes>
//         <Route path={'/addproduct'} element={<Addproduct/>}/>
//         <Route path={'/edit/:productId'}element={<EditProduct/>}/>
//         <Route path={'/listproduct'}element={<Listproduct/>}/>
//         <Route path={'/orderlist'}element={<Orderlist/>}/>
//         <Route path={'/edit-images/:productId'}element={<EditProductImages/>}/>
//         <Route path={'/login'} element={<Login/>}/>
//         <Route path={'/register'} element={<Register/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default Admin




import { Routes, Route } from "react-router-dom";
 
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Admin.css";
import Addproduct from "../../components/Addproduct/Addproduct.jsx";
import Listproduct from "../../components/Listproduct/Listproduct.jsx";
import Orderlist from "../../components/Orderlist/Orderlist.jsx";
import EditProduct from "../../components/Addproduct/EditProduct.jsx";
import EditProductImages from "../../components/Addproduct/EditProductImages.jsx";
import Login from "../../components/Login/Login.jsx";
import Register from "../../components/Register/Register.jsx";
import ProtectedRoute from "../../components/ProtectedRoutes/ProtectedRoute.jsx";
import Delivery from "../../components/Delivery/Delivery.jsx";
import AssignDelivery from "../../components/AssignDelivery/AssignDelivery.jsx";
import UserManagement from "../../components/UserManagement/UserManagement.jsx";
import Home from "../../components/Home/Home.jsx";

function Admin() {
  return (
    <div className="admin">
      {/* <Sidebar/> */}
      <Routes>
        <Route path={'/'} element={<ProtectedRoute element={<Home/>} roles={['manager','admin']}/>}/>
        <Route path={'/addproduct'}  element={<ProtectedRoute element={<Addproduct/>}  roles={['manager','admin']} /> } />
        <Route path={'/edit/:productId'}element={<ProtectedRoute element={<EditProduct/>} roles={['clerk','manager','admin']}/>}/>
        <Route path={'/listproduct'}element={<Listproduct/>}/>
        <Route path={'/orderlist'}element={<Orderlist/>}/>
        <Route path={'/edit-images/:productId'}element={<EditProductImages/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        <Route path={'/delivery-dashboard'} element={<ProtectedRoute element={<Delivery/>} roles={['manager','delivery boy','admin']}/>}/>
        <Route path={'/assigndelivery'} element={<ProtectedRoute element={<AssignDelivery/>} roles={['manager','clerk','admin']}/>}/> 
        <Route path={'/userManagement'} element={<ProtectedRoute element={<UserManagement/>} roles={['manager','admin']}/>}/>
      </Routes>
    </div>
  )
}

export default Admin
