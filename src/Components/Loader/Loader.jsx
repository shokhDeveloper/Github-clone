import "./load.scss";
import {TailSpin} from "react-loader-spinner"
import { useSelector } from "react-redux"
import { useLoader } from "../../Settings"
export const Loader = () => {
    const {loader} = useSelector(({Reducer}) =>  Reducer)
    const {openLoader} = useLoader()
    
    openLoader()
    return(
        <div className="load overlay" style={{display: loader ? "flex": "none"}}>
            <TailSpin  color="#6e7781" height={80} width={80} />
        </div>
    )
}