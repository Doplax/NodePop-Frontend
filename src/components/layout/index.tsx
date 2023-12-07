import Footer from "./Footer";
import {Header} from "./Header";

export default function Index({children}) {
  return (
    <div className="flex flex-col">
        <Header/>
        {children}      
        <Footer></Footer>
    </div>
  )
}
