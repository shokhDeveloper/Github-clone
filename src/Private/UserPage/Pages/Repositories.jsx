import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonActive,
  Context,
  DefaultLink,
  ErrorBox,
  ErrorTitle,
  Input,
  Repostype,
  TextSettings,
  setUserPageDec,
  setUserPageInc,
} from "../../../Settings";
import { StarBtn } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";

export const Repositories = ({ user }) => {
  const {maxFilterPage, userPage} = useSelector(({Reducer}) => Reducer)
  const {userPageDisabled, setUserPageDisabled} = useContext(Context)
  const dispatch = useDispatch()
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState("");
  const handleGetRepos = useCallback(async () => {
    try {
      const request = await axios
        .get(process.env.REACT_APP_BASE_URL + `/users/${user}/repos`,{
          params:{
            page: userPage ? userPage: 1
          }
        })
        .catch((error) => console.log(error));
      if (request.status === 200) {
        const response = await request.data;
        setRepos(response);
        return response;
      }
    } catch (error) {
      return error;
    }
  }, [user, userPage]);
  const handleFilter = (_, id) => {
    switch (id) {
      case "name":
        {
          handleGetRepos()?.then((response) =>
            response?.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              } else {
                return 1;
              }
            })
          );
        }
        break;
      case "date":
        {
          handleGetRepos().then((response) =>
            response?.sort((a, b) => {
              if (new Date(a.updated_at) < new Date(b.updated_at)) {
                return 1;
              } else {
                return -1;
              }
            })
          );
        }
        break;
      default:
        return false;
    }
  };
  const handleFilterLanguage = (event) => {
    if (event.target.matches("#All")) {
      handleGetRepos();
    } else {
      let result = repos.filter((item) => item.language === event.target.id);
      console.log(result);
      setRepos(result);
    }
  };
  const handleKey = (event) => {
    let filter = [];
    if (event.keyCode === 13 && event.target.value?.length) {
      const rejex = new RegExp(event.target.value, "gi");
      filter = repos.filter((item) => item.name.match(rejex));
      setRepos(filter);
    } else if (event.keyCode === 13) {
      handleGetRepos();
    }
  };
  useEffect(() => {
    handleGetRepos();
  }, [handleGetRepos]);
  return (
    <div className="user__repositories">
      <div className="container">
        <div className="user_repo__search">
          {/* <form id="form-repo"></form> */}
          <Input
            onKeyUp={handleKey}
            styledType={true}
            form="form-repo"
            placeholder="Find a repository..."
          />
          <div className="search__btns">
            <details
              className="user_repo__btn sort_details"
              onClick={() => setDetails("sort")}
              open={details === "sort" ? true : false}
            >
              <summary>
                Sort{" "}
                <svg
                  fill="#ffffff8d"
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                  class="octicon octicon-triangle-down"
                >
                  <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
                </svg>
              </summary>
              <div className="user_repo__filter">
                <div className="user_repo_filter__top">
                  <small>Sort type</small>
                  <button
                    onClick={() => {
                      let details = document.querySelector(".sort_details");
                      details.open = false;
                    }}
                    className="user_filter_x border-transparent"
                  >
                    &times;
                  </button>
                </div>
                <div className="user_repo_filter__labels">
                  <label htmlFor="name">
                    <p>Sort by name</p>
                    <input
                      onChange={(event) => handleFilter(event, event.target.id)}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="name"
                    />
                  </label>
                  <label htmlFor="date">
                    <p>Sort by date</p>
                    <input
                      onChange={(event) => handleFilter(event, event.target.id)}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="date"
                    />
                  </label>
                </div>
              </div>
            </details>
            <details
              className="user_repo__btn filter_language"
              onClick={() => setDetails("language")}
              open={details === "language" ? true : false}
            >
              <summary>
                Language{" "}
                <svg
                  fill="#ffffff8d"
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                  class="octicon octicon-triangle-down"
                >
                  <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
                </svg>
              </summary>
              <div className="user_repo__filter">
                <div className="user_repo_filter__top">
                  <small>Sort type</small>
                  <button
                    onClick={() => {
                      let details = document.querySelector(".filter_language");
                      details.open = false;
                    }}
                    className="user_filter_x border-transparent"
                  >
                    &times;
                  </button>
                </div>
                <div className="user_repo_filter__labels">
                  <label htmlFor="All">
                    <p>All</p>
                    <input
                      onChange={handleFilterLanguage}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="All"
                    />
                  </label>
                  <label htmlFor="JavaScript">
                    <p> Javascript</p>
                    <input
                      onChange={handleFilterLanguage}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="JavaScript"
                    />
                  </label>
                  <label htmlFor="JAVA">
                    <p>Java</p>
                    <input
                      onChange={handleFilterLanguage}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="Java"
                    />
                  </label>
                  <label htmlFor="Phyton">
                    <p>Phyton</p>
                    <input
                      onChange={handleFilterLanguage}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="Phyton"
                    />
                  </label>
                  <label htmlFor="C++">
                    <p>C++</p>
                    <input
                      onChange={handleFilterLanguage}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="C++"
                    />
                  </label>
                  <label htmlFor="C#">
                    <p>C#</p>
                    <input
                      onChange={handleFilterLanguage}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="C#"
                    />
                  </label>
                  <label htmlFor="Svift">
                    <p>Svift</p>
                    <input
                      onChange={handleFilterLanguage}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="Svift"
                    />
                  </label>
                  <label htmlFor="TypeScript">
                    <p>TypeScript</p>
                    <input
                      onChange={handleFilterLanguage}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="TypeScript"
                    />
                  </label>
                  <label htmlFor="HTML">
                    <p>HTML</p>
                    <input
                      onChange={handleFilterLanguage}
                      className="visually-hidden"
                      type="radio"
                      name="filter"
                      id="HTML"
                    />
                  </label>
                </div>
              </div>
            </details>
          </div>
        </div>
        {repos?.length ? (
          <ul className="user_repo__inner">
            {repos?.map((item) => {
              return (
                <div className="user__repo" key={item.id}>
                  <div className="user_repo__top">
                    <div>
                      <DefaultLink>{item.name}</DefaultLink>
                      <Repostype> Public </Repostype>
                    </div>
                    <StarBtn active={true} repo={item} />
                  </div>
                  <div className="user_repo__bottom">
                    <p className={`repo__language ${item.language}`}>
                      {item.language}
                    </p>
                    <TextSettings>
                      {(function () {
                        const reposDate = new Date(item.updated_at);
                        const date = new Date();
                        if (
                          item.updated_at.slice(0, 4) - 0 <
                          date.getFullYear()
                        ) {
                          return `The update was ${
                            item.updated_at.slice(0, 4) - 0 - date.getFullYear()
                          } year ago `;
                        } else if (
                          item.updated_at.slice(0, 4) - 0 ===
                          date.getFullYear()
                        ) {
                          const day = Math.floor(
                            (date - reposDate) / (1000 * 60 ** 2 * 24)
                          );
                          return `${day} Oldin yangilangan`;
                        } else {
                          return "Xato";
                        }
                      })()}
                    </TextSettings>
                  </div>
                </div>
              );
            })}
          </ul>
        ) : (
          <ErrorBox>
            <ErrorTitle>No such repository exists</ErrorTitle>
          </ErrorBox>
        )}
        {repos?.length ? (
          <div className="user_page__pagination">
            <ButtonActive onClick={() => {
              
              dispatch(setUserPageDec(1))
            }} disabled={userPageDisabled === "prev" ? true: false} styledTypePagination={userPageDisabled === "prev" ? true: false}>Previous</ButtonActive>
            <h1>{userPage}</h1>
            <ButtonActive onClick={() => {
             dispatch(setUserPageInc(1))
            }} disabled={userPageDisabled === "next" ? true: false} styledTypePagination={userPageDisabled === "next" ? true: false} >Next</ButtonActive>
          </div>
        ): null }
      </div>
    
    </div>
  );
};
