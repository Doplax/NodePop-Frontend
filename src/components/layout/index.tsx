import Footer from "./Footer";
import { Header } from "./Header";
import { useIsLogged } from '../../auth/AuthContextProvider'
import { Navigate } from "react-router-dom";


export default function Index({ children }) {
  const IsLogged = useIsLogged()
  return (
    <>
      {IsLogged 
        ?
          <div className="flex flex-col">
            <Header />
              {children}
            <Footer></Footer>
          </div>
        :
          <Navigate to='/login'/>
      }
    </>
  )
}
