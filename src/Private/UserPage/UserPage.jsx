import "./userPage.scss";
import axios from "axios";
import { useCallback,  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useParams } from "react-router";
import {
  Avatar,
  Button,
  LinkActive,
  LoadTitle,
  LoadingBox,
  setUserData,
  setUserValue,
  useBack,
} from "../../Settings";
import { PiUsers } from "react-icons/pi";
import { Overview, Projects, Repositories, Star, Stars } from "./Pages";

export const UserPage = () => {
  const { userData, myFollowings } = useSelector(({ Reducer }) => Reducer);
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
        }
      } catch (error) {
        return error;
      }
    
  }, [value]);
  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);
  useEffect(() => {
    dispatch(setUserValue(value));
  }, [value]);
  back();
  return (
    <div className="user__page">
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
                  element={<Repositories/>}
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
      </div>
    </div>
  );
};
