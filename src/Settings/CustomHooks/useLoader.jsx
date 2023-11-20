import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCloseLoader, setOpenLoader } from "../redux"

export const useLoader = () => {
    const {loader} = useSelector(({Reducer}) => Reducer)
    const dispatch = useDispatch()
    const openLoader = () => {
        dispatch(setOpenLoader(true))
    }
    const closeLoader = () => {
        setTimeout(() => {
            dispatch(setCloseLoader())
        },1500)
    }
    useEffect(() => {
        if(loader){
            closeLoader()   
        }
    },[loader])
    return {openLoader}
}