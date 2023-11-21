import "./profileBar.scss";
import { useDispatch, useSelector } from "react-redux"
import { Avatar, Button, Context, TextSettings, setProfileBar } from "../../Settings"
import { useContext, useEffect } from "react";
import { FaRegSmile } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FiUser, FiUserPlus } from "react-icons/fi";
import { RiGitRepositoryLine } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
import { GoOrganization, GoHeart } from "react-icons/go";
import { AiOutlineGlobal } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { BsCodeSquare } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

export const ProfileBar = ({profileBar}) => {
    const {profileData} = useSelector(({Reducer}) => Reducer)
    const {profileBarActive, setProfileBarActive} = useContext(Context)
    const dispatch = useDispatch()
    const handleProfileBar = (type) => {
        if(type){
            setTimeout(() => {
                setProfileBarActive(true)
            }, 200) 
        }else{
            setProfileBarActive(false)
        }
    }
    const handleClick = (event) => {
        if(!event.target.matches(".child")){
            dispatch(setProfileBar(false))
        }else{
            return false
        }
    }
    useEffect(() => {
        if(profileBar){
            handleProfileBar(true)
        }else{
            handleProfileBar(false)
        }
    },[profileBar])
    return(
        <div className="profileBar__overlay bar__overlay " onClick={handleClick} style={{display: profileBar ? "flex": "none"}}>
        <div className={`profileBar child ${profileBarActive ? "profileBar__active": ""}`}>
            <div className="container__fluid child">
                <div className="profileBar__top child">
                    <div className="child">
                    <Avatar className="child" width={40} height={40} src={profileBar ?  profileData[0].avatar_url: null}/>
                    <div className="profile_top__info child">
                    <h4 className="child">{profileBar ?  profileData[0].login: null}</h4>
                    <TextSettings className="child">{ profileBar ?  profileData[0].name: null}</TextSettings>
                    </div>
                    </div >
                    <Button  onClick={() => dispatch(setProfileBar(false))}>&times;</Button>
                </div>
                <div className="profileBar__body child">
                <ul className="profileBar__list child">
                    <li className="child">
                        <NavLink className="child">
                            <FaRegSmile className="child"/>
                            Set status
                        </NavLink>
                    </li>
                </ul>
                <ul className="profileBar__list child">
                    <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                            <FiUser className="child"/>
                            Your profile
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                            <FiUserPlus className="child"/>   
                            Add account
                        </NavLink>
                    </li>
                </ul>
                <ul className="profileBar__list child">
                <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                            <RiGitRepositoryLine className="child"/>
                            Your repositories
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                          <GrProjects className="child"/>
                            Your projects
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                            <GoOrganization className="child"/>
                            Your organizations
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                            <AiOutlineGlobal className="child"/>   
                            Your enterprises
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                            <CiStar className="child"/>   
                            Your stars
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child">
                            <GoHeart className="child"/>
                            Your sponsors
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child">
                            <BsCodeSquare className="child"/>
                            Your gists
                        </NavLink>
                    </li>
                </ul>
                <ul className="profileBar__list child">
                <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                            <RiGitRepositoryLine className="child"/>
                            Your repositories
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                          <GrProjects className="child"/>
                            Your projects
                        </NavLink>
                    </li>
                    <li className="child" >
                        <NavLink className="child" to={"/my-profile"}>
                            <GoOrganization className="child"/>
                            Your organizations
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                            <AiOutlineGlobal className="child"/>   
                            Your enterprises
                        </NavLink>
                    </li>
                    <li className="child">
                        <NavLink className="child" to={"/my-profile"}>
                            <CiStar className="child"/>   
                            Your stars
                        </NavLink>
                    </li>
                </ul>
                <div className="profileBar__list child">
                    <li className="child">
                        <NavLink className="child">
                            <IoIosLogOut className="child"/>
                            Sign out</NavLink>
                    </li>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}