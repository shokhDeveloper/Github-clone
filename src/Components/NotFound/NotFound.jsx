import "./notFound.scss";
import NotFoundImage from "../../assets/images/NotFoundGit.png";
import { Footer } from "../Footer";
import { useEffect } from "react";
export const NotFound = ({children}) => {
    useEffect(() => {
        // window.location.reload()
    },[children])
    return(
        <>
        <div className="not__found" style={{backgroundImage: `url(${NotFoundImage})`}}>
            <div className="container">
                {children}
            </div>
        </div>
        <Footer/>
        </>
    )
}