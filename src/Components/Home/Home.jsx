import { useCallback, useContext, useEffect } from "react";
import {
  Avatar,
  Button,
  ButtonActive,
  Context,
  DefaultLink,
  LoadTitle,
  LoadingBox,
  TextSettings,
  setFollowingRepos,
} from "../../Settings";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { StarBtn } from "../StarBtn";
import { Link } from "react-router-dom";
import { Footer } from "../Footer";

export const Home = () => {
  const { followinRandom, followingRepos } = useSelector(
    ({ Reducer }) => Reducer
  );
  
  return (
    <div className="dashboard__home">
      <div className="container__fluid">
        <div className="dashboard__home_infos">
          <h1>Home</h1>
          <div className="dashboard__home_filter">
            <DefaultLink to={"/send-feedBack"}>Send feedback</DefaultLink>
            <ButtonActive>
              <svg
                fill="#6e7781"
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-filter mr-2"
              >
                <path d="M.75 3h14.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1 0-1.5ZM3 7.75A.75.75 0 0 1 3.75 7h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 7.75Zm3 4a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path>
              </svg>
              Filter
              <span className="message__count">{followingRepos?.length}</span>
            </ButtonActive>
          </div>
        </div>
        {followingRepos?.length ? (
          <ul className="dashboard__inner_list">
            {followingRepos?.map((item) => {
              return (
                <li className="dashboard__home_item">
                  <div className="dashboard__home_item_header">
                    <div className="dashboard__home_item_header_child">
                      <div>
                        <Avatar
                          width={40}
                          height={40}
                          src={item.owner.avatar_url}
                        />
                      </div>
                      <div>
                        <div className="text-box">
                          <Link to={`/user/${item.owner.id}`}>{item.owner.login}</Link>
                          <TextSettings styledType={true}>
                            Followed
                          </TextSettings>
                        </div>
                        {(function (item) {
                          const date = new Date();
                          const year = item.updated_at.slice(0, 4);
                          if (year - 0 === date.getFullYear()) {
                            let oldYear = new Date(item.updated_at);
                            let day = Math.floor(
                              (date - oldYear) / (1000 * 60 ** 2 * 24)
                            );
                            return (
                              <TextSettings>
                                {day} kun oldin yangilangan
                              </TextSettings>
                            );
                          } else {
                            return (
                              <TextSettings>
                                Ancha oldin yangilangan ...
                              </TextSettings>
                            );
                          }
                        })(item)}
                      </div>
                    </div>
                    <Button>...</Button>
                  </div>
                  <div className="dashboard__home_item_body">
                    <div className="dashboard__home_item_body--child">
                      <Avatar
                        width={20}
                        height={20}
                        src={item.owner.avatar_url}
                      />
                      <h4>{item.name}</h4>
                    </div>
                    <div className="dashboard__home_item--child-box">
                      <StarBtn active={false} repo={item}/>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <LoadingBox>
            <LoadTitle>Yuklanmoqda ...</LoadTitle>
          </LoadingBox>
        )}
      </div>
      <Footer/>
    </div>
  );
};
