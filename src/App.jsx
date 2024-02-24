import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import Address from "./Components/Address/Address";
import Cart from "./Components/Cart/Cart";
import Orders from "./Components/Orders/Orders";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectedRoute2 from "./Components/ProtectedRoute/ProtectedRoute2";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";

function App() {

  const router = createBrowserRouter([
    {path:'' , element:<Layout/> , children:[

      {path:'*' , element:<NotFound/>},

      {path:'register' , element:<ProtectedRoute2> <Register/> </ProtectedRoute2>},
      {path:'login' , element:<ProtectedRoute2> <Login/> </ProtectedRoute2>},


      {path:'' , element:<Navigate to={'home'}/>},
      {path:'home' , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path:'products' , element:<ProtectedRoute> <Products/> </ProtectedRoute>},
      {path:'productDetails/:id' , element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
      {path:'categories' , element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
      {path:'brands' , element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
      {path:'address/:cartId' , element:<ProtectedRoute> <Address/> </ProtectedRoute>},
      {path:'cart' , element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
      {path:'allorders' , element:<ProtectedRoute> <Orders/> </ProtectedRoute>},
      
    ]}
  ])

  return (

    <>
    <AuthContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
    <ToastContainer />
    </>

);
}
export default App;





    //     ده لو عايز اعمل شير ل داتا بين اخوات
    //     <CounterContextProvider>
    //     <Home/>
    //     <About/>
    //     <Services/>
    //     </CounterContextProvider>
    
  

