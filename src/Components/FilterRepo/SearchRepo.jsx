import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Avatar, setRepos } from "../../Settings";

export const SearchRepo = ({ reposData, profileData }) => { 
  const {value} = useParams()
  const dispatch = useDispatch()
  const handleSearchRepo = useCallback(async () => {
    let rejex = new RegExp(value, "gi")
    const filter = reposData.filter(item => item.name.match(rejex))
    dispatch(setRepos(filter))
  },[value])
  useEffect(() => {
    handleSearchRepo()
  },[handleSearchRepo])
  return (
    <ul className="dashboard__list">
      {reposData?.map((item) => {
        return (
          <li className="dashboard__item">
            <div className="dashboard__item_image_box">
              <Avatar
                className="dashboard__image"
                src={profileData[0]?.avatar_url}
                width={20}
                height={20}
                alt="Git-image"
              />
            </div>
            <p>{item.full_name}</p>
          </li>
        );
      })}
    </ul>
  );
};
