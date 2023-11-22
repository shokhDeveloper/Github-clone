import { Route, Routes } from "react-router";
import {
  Context,
  GlobalStyle,
  setFollowingRandom,
  setFollowingRepos,
  setProfileData,
} from "./Settings";
import { ErrorPage, FilterSearchPage, Header, Loader, ProfileBar, SearchBox } from "./Components";
import { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Dashboard, HomeBar } from "./Private";
function App() {
  const { profileData, searchbox, loader, profileBar, followinRandom } = useSelector(
    ({ Reducer }) => Reducer
  );
  const { setMaxPage, homeBar } = useContext(Context);
  const dispatch = useDispatch();

  const handleGetProfileData = useCallback(async () => {
    if (!profileData?.length) {
      try {
        const request = await axios
          .get("https://api.github.com/users/ShokhDeveloper")
          .catch((error) => console.log(error));
        if (request.status === 200) {
          const response = await request.data;
          let repos = response.public_repos;
          let limit = 30;
          setMaxPage(Math.floor(repos / limit));
          dispatch(setProfileData([response]));
        }
      } catch (error) {
        return error;
      }
    }
  }, [profileData]);
  useEffect(() => {
    handleGetProfileData();
  }, [handleGetProfileData]);
  useEffect(() => {
    axios
      .get("https://api.github.com/repos/ShokhDeveloper/Amazon-clone", {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN} `,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get("https://api.github.com/users/shokhDeveloper/following", {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.length) {
            let result = [];
            response?.data?.map((item) => {
              result = [...result, item.login];
            });
            dispatch(setFollowingRandom(result));
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);
  let result = []
  const handleGetRepo = useCallback(async () => {
    if (followinRandom.length) {
      Promise.all(
        followinRandom?.map((item) => {
          return axios
            .get(process.env.REACT_APP_BASE_URL + `/users/${item}/repos`)
            .then((response) => {
              if (response?.data?.length) {
                return response.data;
              }
            });
        })
      ).then((response) => {
        response.map((item) => {
          let repo = item.slice(item.length - 1);
          result = [...result, ...repo];
          dispatch(setFollowingRepos(result));
        });
      });
    }
  }, [followinRandom]);
  useEffect(() => {
    handleGetRepo();
  }, [handleGetRepo]);
  useEffect(() => {
    axios.get("https://api.github.com/users/matheuscainelli42").then(response => {
      console.log(response.data)
    })
  },[])
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header />
          {homeBar? (
            <HomeBar/>
          ): null}
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/filter/:value/*" element={<FilterSearchPage/>} /> 
            <Route path="/not-found" element={<ErrorPage/>}/>
          </Routes>
          {searchbox ? <SearchBox /> : null}
            <ProfileBar profileBar={profileBar}/>
        </>
      )}
      <GlobalStyle />
    </>
  );
}

export default App;
