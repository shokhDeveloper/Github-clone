import "./notFound.scss";
import NotFoundImage from "../../assets/images/NotFoundGit.png";
import { Footer } from "../Footer";
export const NotFound = ({children}) => {
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