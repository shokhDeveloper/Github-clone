import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import {RiGitRepositoryLine} from "react-icons/ri"
import { Button, DefaultLink, LinkActive, Repostype } from "../../../Settings"
import { StarBtn } from "../../../Components"
export const Overview = ({user}) => {
    const [overRepos, setOverRepos] = useState([])
    const handleGetUser = useCallback( async() => {
        if(!overRepos?.length){
            try{
                const request = await axios.get(process.env.REACT_APP_BASE_URL + `/users/${user}/repos`,).catch(error => console.log(error))
                if(request.status === 200){
                    const response = await request.data
                   setOverRepos(response)
                }
            }catch(error){
                return error
            }   
        }
    },[user, overRepos])
    useEffect(() => {
        handleGetUser()
    },[handleGetUser])
    return(
        <div className="user__overview">
           <div className="overview__title_box">
            <p>Pinned</p>
           </div>  
            <ul className="overview__inner">
                {overRepos?.slice(0, 4)?.map(item => {
                    
                    return(
                        <li className="overview__repo" key={item.id}>
                            <div className="overview_repo__top">
                            <RiGitRepositoryLine/>
                            <DefaultLink active={true}>{item.name}</DefaultLink>
                            <Repostype>Public</Repostype>
                            </div>
                            <div className="overview_repo__discription_box">
                                <p>{item.description}</p>
                            </div>
                            <div className="overview_repo__bottom">
                                <div className="overview_repo__language_box">
                                    <p className={`repo__langauge ${item.language}`}>{item.language}</p>
                                </div>
                                <StarBtn active={true} repo={item} />
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="user_overview__bottom">
                <p>{user} has no activity yet for this period.</p>
                <Button>Show more activity</Button>
                <small>Seeing something unexpected? <DefaultLink style={{fontSize: "1em"}}>Take a look at the GitHub profile guide.</DefaultLink></small>
            </div>
        </div>    
    )
}