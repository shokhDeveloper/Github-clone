import { useCallback, useEffect } from "react";
import { ErrorBox, ErrorTitle, Input, LoadTitle, LoadingBox, setRepos, setReposType } from "../../Settings";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { SearchRepo } from "./SearchRepo";
import { DefaultFilter } from "./DefaultFilter";

export const FilterRepo = () => {
  const { reposData, profileData, reposType } = useSelector(({ Reducer }) => Reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleGetRepo = useCallback(async () => {
    try {
      if (!reposData.length && !reposType ) {
        const request = await axios.get(
          process.env.REACT_APP_BASE_URL + "/users/shokhDeveloper/repos"
        );
        if (request.status === 200) {
          const response = await request.data;
          dispatch(setRepos(response));
        }
      }
    } catch (error) {
      return error;
    }
  }, [reposData]);
  const handleKey = (event) => {
    if(event.target.value.length){
        navigate(`/search-repositories/${event.target.value}`)
    }else{
        dispatch(setRepos([]))
        navigate("/")
    }
  }
  useEffect(() => {
    handleGetRepo();
  }, [handleGetRepo]);
  return (
    <div className="dashboard__filter">
      <div className="container__fluid">
        <div className="dashboard__search">
          <h4>Top Repositories</h4>
          <button
            className="border-transparent"
            form="form-repositories"
            type="submit"
          >
            <svg
              fill="#fff"
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              class="octicon octicon-repo"
            >
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
            New
          </button>
        </div>
            <div className="dashboard__form_box">
              <form id="form-repositories">
                <Input onKeyUp={handleKey} name="repos-input" placeholder="Find a repository ..." />
              </form>
            </div>
        {reposData?.length ? (
          <>
            <Routes>
                <Route path="/search-repositories/:value" element={<SearchRepo reposData={reposData} profileData={profileData}/>}/>
                <Route path="/" element={<DefaultFilter reposData={reposData} profileData={profileData}/>}/>
            </Routes>
          </>
        ) : (
          <LoadingBox>
            <LoadTitle>Yuklanmoqda ...</LoadTitle>
          </LoadingBox>
        )}
      </div>
    </div>
  );
};
