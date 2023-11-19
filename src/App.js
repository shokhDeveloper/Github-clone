import { Route, Routes } from "react-router";
import {  GlobalStyle, setFollowingRandom, setProfileData } from "./Settings";
import { Header } from "./Components";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Dashboard } from "./Private";
function App() {
  const {profileData, followinRandom} = useSelector(({Reducer}) => Reducer)
  const dispatch = useDispatch()
  const handleGetProfileData = useCallback(async () => {
    if(!profileData?.length){
      try{
        const request = await  axios.get("https://api.github.com/users/ShokhDeveloper").catch(error => console.log(error))
        if(request.status === 200){
          const response = await request.data
          dispatch(setProfileData([response]))
        }
      }catch(error) {
        return error
      }
    }
  },[profileData])
  useEffect(() => {
    handleGetProfileData()
  },[handleGetProfileData])
  useEffect(() => {
    axios.get("https://api.github.com/repos/ShokhDeveloper/Amazon-clone", {
  headers: {
    Authorization: "Bearer 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"
  }
}).then(response => {
  return response
}).catch(error => console.log(error))
  },[])
  useEffect(() => {
    axios.get("https://api.github.com/users/shokhDeveloper/following", {
      headers: {
        Authorization: "Bearer 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"
      }
    }).then(response => { 
      if(response?.data?.length){
        let result = []
        response?.data?.map(item => {
          result = [...result, item.login]
        })
        dispatch(setFollowingRandom(result))
      }
    }).catch(error => console.log(error))
  },[])
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Dashboard/>} />
      </Routes>
      <GlobalStyle />
    </>
  );
}

export default App;
