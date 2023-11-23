import "./renderuser.scss";
import { useContext, useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import {
  Avatar,
  Button,
  ButtonActive,
  Context,
  LinkActive,
  LoadTitle,
  setFilterData,
  setMaxFilterPage,
  setPageDec,
  setPageInc,
} from "../../Settings";
import { StarBtn } from "../StarBtn";
import { useDispatch, useSelector } from "react-redux";
export const RenderUsers = ({ users }) => {
  const { filterPage, maxFilterPage } = useSelector(({ Reducer }) => Reducer);
  const { filterAllData } = useContext(Context);
  const [dataUsers, setDataUsers] = useState([]);
  const [disabled, setDisabled] = useState("prev");
  const dispatch = useDispatch();
  useEffect(() => {
    if (users?.length) {
      setTimeout(() => {
        setDataUsers(users);
      }, 1000);
    }
  }, [users]);
  const handlePagination = (event) => {
    switch (event.target.id) {
      case "next": {
        setDisabled(null)
        dispatch(setPageInc(1));
        dispatch(setFilterData([]))
      }break;
      case "prev":{
        setDisabled(null)
        dispatch(setPageDec(1))
        dispatch(setFilterData([]))
      }
    }
  };
  useEffect(() => {
    console.log(maxFilterPage);
    if(filterPage === maxFilterPage){
      setDisabled("next")
    }else if(filterPage === 1){
      setDisabled("prev")
    
    }
  }, [maxFilterPage, filterPage, filterAllData]);
  useEffect(() => {
    if (filterAllData?.total_count) {
      let max = Math.ceil(filterAllData?.total_count / 30)
      dispatch(setMaxFilterPage(max))
    }
  }, [filterAllData]);
  return (
    <div className="filter__render_user">
      {dataUsers?.length
        ? (function () {
            return dataUsers?.map((item) => {
              return (
                <div className="filter__user" key={item.id}>
                  <div className="filter_user__top">
                    <div className="filter_user__data">
                      <Avatar width={30} height={30} src={item.avatar_url} />
                      <LinkActive
                        styledType={"white"}
                        to={`/user/${item.login}`}
                      >
                        {item.login}
                      </LinkActive>
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
      {dataUsers?.length ? (
        <div className="pagination">
          <ButtonActive
            onClick={handlePagination}
            styledTypePagination={disabled === "prev" ? true : false}
            disabled={disabled === "prev" ? true : false}
            id="prev"
          >
            Previous
          </ButtonActive>
          <LoadTitle>{filterPage}</LoadTitle>
          <ButtonActive
            onClick={handlePagination}
            styledTypePagination={disabled === "next" ? true : false}
            disabled={disabled === "next" ? true : false}
            id="next"
          >
            Next
          </ButtonActive>
        </div>
      ) : null}
    </div>
  );
};
