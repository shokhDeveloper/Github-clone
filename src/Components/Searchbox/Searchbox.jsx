import "./searchbox.scss";
import { Button, Input, setFilterData, setSearchBox, setSearchData } from "../../Settings";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const SearchBox = () => {
  const { searchbox, searchData } = useSelector(({ Reducer }) => Reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGetUsers = useCallback(() => {
    if (!searchData?.length) {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (response.status === 200) {
            dispatch(setSearchData(response.data));
          }
        });
    }
  }, [searchData]);
  const handleClick = (event) => {
    if (
      !event.target.closest(".searchbox__input") &&
      !event.target.closest(".searchbox__inner_list")
    ) {
      dispatch(setSearchBox(false));
    } else {
    }
  };
  const handleKey = async (event) => {
    if(event.target.value.length){
        const rejex = new RegExp(event.target.value, "gi")
        let filter = searchData.filter(item => item.name.match(rejex))
        dispatch(setSearchData(filter))
        if(event.keyCode === 13){
          navigate(`/filter/${event.target.value}`)   
          event.target.value = null
          dispatch(setSearchBox(false))
        }
    }else{
        dispatch(setSearchData([]))
    }
  }
  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);
  return (
    <div
      onClick={handleClick}
      className="searchbox__overlay overlay"
      style={{ display: searchbox ? "flex" : "none" }}
    >
      <div className="searchbox__inner">
          <Input autoComplete="off" onKeyUp={handleKey} className="searchbox__input" placeholder="Search user" />
        {searchData?.length ? (
          <ul className="searchbox__inner_list">
            {searchData?.map((item) => {
              return (
                <li className="searchbox__item">
                  <p>{item.name}</p>
                  <Button onClick={() => {
                    axios.delete(`https://jsonplaceholder.typicode.com/users/${item.id}`).then(response =>{
                        if(response.status === 200){
                            let filter = searchData?.filter(user => user.id !== item.id)
                            dispatch(setSearchData(filter))
                        }
                    })
                  }}>&times;</Button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
