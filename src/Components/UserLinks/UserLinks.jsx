import { NavLink } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { RiGitRepositoryLine } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import { GrProjects } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useBack } from "../../Settings";
import { useEffect, useState } from "react";
export const UserLinks = () => {
  const { userValue, userData } = useSelector(({ Reducer }) => Reducer);
  const [repos, setRepos] = useState()
  const { back } = useBack(true);
  useEffect(() => {
    userData?.map(item => setRepos(item.public_repos))
  },[userData])
  back();
  return (
    <div className="container__fluid">
      <ul className="user_links__list">
        <li className="user_link__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? " user__link active_user__link" : "user__link"
            }
            to={`/user/${userValue}/overview`}
          >
            <IoBookOutline />
            Overview
          </NavLink>
        </li>
        <li className="user_link__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? " user__link active_user__link" : "user__link"
            }
            to={`/user/${userValue}/repositories`}
          >
            <RiGitRepositoryLine />
            Repositories
            <span className="repos__count">{repos}</span>
          </NavLink>
        </li>
        <li className="user_link__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? " user__link active_user__link" : "user__link"
            }
            to={`/user/${userValue}/projects`}
          >
            <GrProjects />
            Projects
          </NavLink>
        </li>
        <li className="user_link__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? " user__link active_user__link" : "user__link"
            }
            to={`/user/${userValue}/star`}
          >
            <CiStar />
            CiStar
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
