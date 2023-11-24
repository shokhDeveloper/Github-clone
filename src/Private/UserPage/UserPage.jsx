import "./userPage.scss";
import axios from "axios";
import { useCallback,  useContext,  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useParams } from "react-router";
import {
  Avatar,
  Button,
  Context,
  LinkActive,
  LoadTitle,
  LoadingBox,
  setUserData,
  setUserMaxPage,
  setUserValue,
  useBack,
} from "../../Settings";
import { PiUsers } from "react-icons/pi";
import { Overview, Projects, Repositories, Star, Stars } from "./Pages";
import { Footer } from "../../Components";

export const UserPage = () => {
  const { userData, myFollowings, userPage, userMaxPage } = useSelector(({ Reducer }) => Reducer);
  const {userPageDisabled, setUserPageDisabled} = useContext(Context)
  const { back } = useBack(true);
  const dispatch = useDispatch();
  const { value } = useParams();
  const handleGetUser = useCallback(async () => {
      try {
        const request = await axios
          .get(process.env.REACT_APP_BASE_URL + `/users/${value}`)
          .catch((error) => console.log(error));
        if (request.status === 200) {
          const response = await request.data;
          dispatch(setUserData([response]));
          dispatch(setUserMaxPage(response.public_repos))
        }
      } catch (error) {
        return error;
      }
    
  }, [value]);
  const handleClick = (event) => {
    if(!event.target.matches(".sort_details") && !event.target.matches(".filter_language")){
      const details = event.target.querySelectorAll("details")
      if(details?.length){
        details?.forEach(item => {
          item.open = false
        })
      }
    }
  }
  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);
  useEffect(() => {
    dispatch(setUserValue(value));
  }, [value]);
  useEffect(() => {
    if(userPage === userMaxPage){
      setUserPageDisabled("next")
    }else if(userPage == 1){
      setUserPageDisabled("prev")
    }
  },[userPage])
  back();
  return (
    <div className="user__page" onClick={handleClick}>
      <div className="container">
        {userData?.length ? (
          <div className="user_page__inner">
            {userData?.map((item) => {
              return (
              <div className="user_page__data">
                <div className="user_page__image_box">
                <Avatar width={300} height={300} src={item.avatar_url} alt="Git-image"/>
                </div>
                <div className="user_page__info">
                    <h3>{item.name}</h3>
                    <h3>{item.login}</h3>
                </div>
                <Button active={true} >
                    {(function(){
                       if(myFollowings?.some(user => user.id === item.id)){
                        return "Unfollow"
                       }else{
                        return "Follow"
                       }
                    }())}
                </Button>    
                <p className="user_page__bio">{item?.bio?.replace("/", "")}</p>
                <div className="user_page__follow_box">
                    <LinkActive styledType={true}> <PiUsers color="#6e7781be"/> {item.followers} followers</LinkActive>
                    <LinkActive styledType={true}> {item.following} following</LinkActive>
                </div>
                <div className="user_page__blog">
                    <LinkActive styledType={true} href={item.blog}>{item.blog}</LinkActive>
                </div>
              </div>
              )
            })}
            <div className="user_page__result">
              <Routes>
                <Route index element={<Overview user={value}/>} />
                <Route path="/overview" element={<Overview user={value}/>} />
                <Route
                  path="/repositories"
                  element={<Repositories user={value}/>}
                />
                <Route path="/projects" element={<Projects/>} />
                <Route path="/star" element={<Stars/>} />
              </Routes>
            </div>
          </div>
        ) : (
          <LoadingBox>
            <LoadTitle>Yuklanmoqda ...</LoadTitle>
          </LoadingBox>
        )}
        <div className="fluid">
      <Footer active={true}/>
        </div>
      </div>
    </div>
  );
};
