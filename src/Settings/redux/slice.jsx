import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Utils";
const initialState = {
  profileData: [],
  reposData: [],
  reposType: false,
  followinRandom: [],
  followingRepos: [],
  starReposAndProfile: getItem("starReposAndUser") ? JSON.parse(getItem("starReposAndUser")) : [],
  searchbox: false,
  searchData: [],
  loader: getItem("loader") ? false : true,
  profileBar: false,
  filterData: []
};
export const slice = createSlice({
  name: "git-hub-clone",
  initialState,
  reducers: {
    setOpenLoader(state){
      state.loader = true
      removeItem("loader")
    },
    setCloseLoader(state){
      state.loader = false 
      setItem("loader", "loader-end")
    },
    setProfileData(state, action) {
      state.profileData = action.payload;
    },
    setRepos(state, action) {
      state.reposData = action.payload;
    },
    setReposType(state, action) {
      state.reposType = action.payload;
    },
    setFollowingRandom(state, action) {
      let result = [];
      if (typeof action.payload === "object") {
        action.payload.map((_) => {
          let random = parseInt(Math.random() * action.payload.length);
          if (!result?.includes(action.payload[random])) {
            result = [...result, action.payload[random]];
          }
        });
      }
      console.log(result)
      state.followinRandom = result;
    },
    setFollowingRepos(state, action) {
      if (typeof action.payload === "object") {
        action.payload?.map((repos) => {
          if (!state.followingRepos?.some((item) => item.id === repos.id)) {
            state.followingRepos = [...state.followingRepos, repos];
          }
        });
      }
    },
    setStar(state, action){
        if(state.starReposAndProfile?.length){
            if(!state.starReposAndProfile.some(item => item.id === action.payload.id)){
                state.starReposAndProfile = [...state.starReposAndProfile, action.payload]
                setItem("starReposAndUser", state.starReposAndProfile)
            }else{
                state.starReposAndProfile = state.starReposAndProfile
            }
        }else{
            state.starReposAndProfile = [...state.starReposAndProfile, action.payload]
            setItem("starReposAndUser", state.starReposAndProfile)
        }
    },
    setBackStar(state, action){
        try{
            if(action.payload.id){
                let idx = state.starReposAndProfile.findIndex(item => item.id === action.payload.id)
                let starReposJSON = JSON.stringify(state.starReposAndProfile)
                let starReposClone = JSON.parse(starReposJSON)
                starReposClone.splice(idx, 1)
                state.starReposAndProfile = starReposClone
                setItem("starReposAndUser", state.starReposAndProfile)
            }
        }catch(error){
            return error
        }
    },
    setSearchBox(state, action){
      state.searchbox = action.payload
    },
    setSearchData(state, action){
      state.searchData = action.payload
    },
    setProfileBar(state, action){
      state.profileBar = action.payload
    },
    setFilterData(state, action){
      state.filterData = action.payload
    }
  },
});
export const Reducer = slice.reducer;
export const {
  setProfileData,
  setRepos,
  setReposType,
  setFollowingRandom,
  setFollowingRepos,
  setStar,
  setBackStar,
  setSearchBox,
  setSearchData,
  setCloseLoader,
  setOpenLoader,
  setProfileBar,
  setFilterData
} = slice.actions;
