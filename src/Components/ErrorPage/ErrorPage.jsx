import { useParams } from "react-router"
import { NotFound } from "../NotFound"

export const ErrorPage = () => {
  const {value} = useParams()
    return(
        <NotFound>
            <div className="error__text">
                <h3>{value} is not found</h3>
            </div>
        </NotFound>    
    )
}