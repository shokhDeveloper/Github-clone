import { Route, Routes } from "react-router";
import {
  Context,
  GlobalStyle,
  setFollowingRandom,
  setProfileData,
} from "./Settings";
import { Header, Loader, SearchBox } from "./Components";
import { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Dashboard, HomeBar } from "./Private";
function App() {
  const { profileData, searchbox, loader } = useSelector(
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
            <Route path="/user/:id" element={<h1>Hello world</h1>} />
          </Routes>
          {searchbox ? <SearchBox /> : null}
        </>
      )}
      <GlobalStyle />
    </>
  );
}

export default App;
