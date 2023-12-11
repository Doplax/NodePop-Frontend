import Footer from "./Footer";
import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { useIsLogged } from '@auth/AuthContextProvider'



export default function Index() {
  


  const IsLogged = useIsLogged()
  return (
    <>
      {IsLogged 
        ?
          <div className="flex flex-col">
            <Header />
              <Outlet/>
            <Footer/>
          </div>
        :
          <Navigate to='/login'/>
      }
    </>
  )
}
