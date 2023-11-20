import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, setRepos, setReposType } from "../../Settings"

export const DefaultFilter = ({reposData, profileData, handleGetRepo}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(setRepos([]))
    // dispatch(setReposType(false)) 
    handleGetRepo()
  },[])  
  return(
        <ul className="dashboard__list">
      {reposData?.map((item) => {
        return (
          <li className="dashboard__item">
            <div className="dashboard__item_image_box">
              <Avatar
              width={20} height={20}
                className="dashboard__image"
                src={profileData[0]?.avatar_url}
                alt="Git-image"
              />
            </div>
            <p>{item.full_name}</p>
          </li>
        );
      })}
    </ul>
    )
}