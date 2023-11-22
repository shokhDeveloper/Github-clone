import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { Avatar } from "../../Settings";
import { StarBtn } from "../StarBtn";
import axios from "axios";
export const RenderUsers = ({ users }) => {
  const [dataUsers, setDataUsers] = useState([]);
  useEffect(() => {
    if (users?.length) {
      setTimeout(() => {
        setDataUsers(users);
      }, 3000);
    }
  }, [users]);
  return (
    <div className="filter__render_user">
      {dataUsers?.length
        ? (function () {
            return dataUsers?.map((item) => {
              return (
                <div className="filter__user">
                  <div className="filter_user__top">
                    <div className="filter_user__data">
                    <Avatar width={30} height={30} src={item.avatar_url} />
                    <p>{item.login}</p>
                    </div>
                    <StarBtn active={true} repo={item}></StarBtn>
                  </div>
                </div>
              );
            });
          })()
        : (function () {
            return users?.slice(0, 15).map(() => {
              return (
                <ContentLoader
                  className="loader-plac"
                  speed={2}
                  style={{ width: "100%" }}
                  width={700}
                  height={160}
                  viewBox="0 0 700 160"
                  backgroundColor="#6e77815e"
                  foregroundColor="grey"
                >
                  <rect x="48" y="8" rx="3" ry="3" width="350" height="6" />
                  <rect x="48" y="26" rx="3" ry="3" width="300" height="6" />
                  <rect x="0" y="56" rx="3" ry="3" width="700" height="6" />
                  <rect x="0" y="72" rx="3" ry="3" width="700" height="6" />
                  <rect x="0" y="88" rx="3" ry="3" width="300" height="6" />
                  <circle cx="20" cy="20" r="20" />
                </ContentLoader>
              );
            });
          })()}
    </div>
  );
};
