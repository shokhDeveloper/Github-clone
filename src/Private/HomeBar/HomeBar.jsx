import "./homebar.scss";
import { CiHome } from "react-icons/ci";
import { VscIssues } from "react-icons/vsc";
import { GoGitPullRequest } from "react-icons/go";
import { RxDimensions } from "react-icons/rx";
import { GrCodeSandbox, GrGift } from "react-icons/gr";
import { SiAzuredataexplorer } from "react-icons/si";
import { useContext, useEffect, useState } from "react";
import { Button, Context, DefaultLink, Link } from "../../Settings";
import { NavLink } from "react-router-dom";

export const HomeBar = () => {
  const { setHomeBar, homeBar } = useContext(Context);
  const [homeBarActive, setHomeBarActive ] = useState(false)
  const handleActiveBar = (type) => {
    if(type){
        setTimeout(() => {
            setHomeBarActive(true)
        }, 200)    
    }else{
        setTimeout(() => {
            setHomeBarActive(false)
        }, 200)        
    }
  }
  const handleClick = (event) => {
    if(!event.target.matches(".child")){
        setHomeBar(false)
    }else{
        return false
    }
}
  useEffect(() => {
    if(homeBar){
        handleActiveBar(true)
    }else{
        handleActiveBar(false)
    }
  },[homeBar])
  return (
    <div className="bar__overlay" onClick={handleClick}>
      <div className={`home__bar child site__bar ${homeBarActive ? "site__bar--active": ""}`}>
        <div className="container__fluid child">
          <div className="home_bar__header site_bar__header child">
            <a  href="">
              <svg className="child"
                fill="#fff"
                width={30}
                height={30}
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                data-view-component="true"
                class="octicon octicon-mark-github"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </a>
            <Button className="child" onClick={() => setHomeBar(false)}>&times;</Button>
          </div>
          <nav className="home_bar__nav site__nav child">
            <ul className="home_bar__list child">
              <li className="home_bar__item child">
                <NavLink className={"child"} to={"/"}>
                  <CiHome />
                  Home  
                </NavLink>
              </li>
              <li className="home_bar__item child">
                <NavLink className={"child"} to={"/"}>
                  <VscIssues/>  
                  Issues
                </NavLink>
              </li>
              <li className="home_bar__item child">
                <NavLink className={"child"} to={"/"}>
                 <GoGitPullRequest/>
                  Pull requets  
                </NavLink>
              </li>
              <li className="home_bar__item child">
                <NavLink className={"child"} to={"/"}>
                  <RxDimensions/>  
                  Discussions
                </NavLink>
              </li>
              <li className="home_bar__item child">
                <NavLink className={"child"} to={"/"}>
                  <GrCodeSandbox/>  
                  Codespaces
                </NavLink>
              </li>
            </ul>
            <ul className="home_bar__list child">
                <li  className="home_bar__item child">
                    <NavLink className={"child"} to={"/"}> 
                        <SiAzuredataexplorer/>
                    Explore</NavLink>
                </li>
                <li className="home_bar__item child">
                    <NavLink className={"child"} to={"/"}> 
                        <GrGift/>
                    Marketplace</NavLink>
                </li>
            </ul>
          </nav>
        </div>
        <div className="home_bar__bottom">
        <p>&copy; {new Date().getFullYear()} GitHub, Inc</p>
        <div className="home_bar__links">
            <DefaultLink>About</DefaultLink>
            <DefaultLink>Blog</DefaultLink>
            <DefaultLink>Terms</DefaultLink>
            <DefaultLink>Privacy</DefaultLink>
            <DefaultLink>Security</DefaultLink>
            <DefaultLink>Status</DefaultLink>
        </div>
        </div>
      </div>
    </div>
  );
};
