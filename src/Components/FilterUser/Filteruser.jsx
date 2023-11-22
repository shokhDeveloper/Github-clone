import { useSelector } from "react-redux"
import { RenderUsers } from "../RenderUser"

export const FilterUser = () => {
    const {filterData} = useSelector(({Reducer}) => Reducer)
    return(
        <div className="filter__user">
            <div className="container__fluid">
                <h2>Users</h2>
               <RenderUsers users={filterData}/>
            </div>
        </div>
    )
}