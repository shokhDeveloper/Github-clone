import "./filterSearchPage.scss";
import axios from "axios";
import { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useParams } from "react-router";
import { Context, LoadTitle, LoadingBox, setFilterData } from "../../Settings";
import { NavLink } from "react-router-dom";
import { PiUsersThin } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { FilterSettings } from "../FilterSettings";
import { FilterUser } from "../FilterUser";
import { Latest } from "../Latest";

export const FilterSearchPage = () => {
  const { filterData } = useSelector(({ Reducer }) => Reducer);
  const {filterAllData, setFilterAllData} = useContext(Context)
  const dispatch = useDispatch();
  const { value } = useParams();
  const handleGetSearchResult = useCallback(async () => {
    if (!filterData?.length) {
      try {
        const request = await axios
          .get(process.env.REACT_APP_BASE_URL + `/search/users?q=${value}`)
          .catch((error) => console.log(error));
        if (request.status === 200) {
          const response = await request.data;
          setFilterAllData(response)
          dispatch(setFilterData(response?.items));
        }
      } catch (error) {
        return error;
      }
    } else {
      return false;
    }
  }, [value, filterData]);
  const handleResultCount = () => {
    return filterAllData?.total_count?.toString().length === 4 ? filterAllData?.total_count?.toString()?.substring(0, 1).concat(".k"):  filterAllData?.total_count?.toString().length === 5 ? filterAllData?.total_count?.toString().substring(0,3).concat(".k"):  filterAllData?.total_count?.toString().length === 6 ? filterAllData?.total_count.toString().substring(0, 3).concat(".k") : filterAllData?.total_count?.toString().length === 9 ? filterAllData?.total_count?.toString().substring(0,3).concat(".m"): filterAllData.total_count
  }
  useEffect(() => {
    console.log(filterAllData)
    handleGetSearchResult();
  }, [handleGetSearchResult]);
  return (
    <section className="filterPage">
        {filterData?.length ? (
          <div className="filterPage__inner">
            <div className="filterPage__bar">
            <div className="container__fluid">
            <h3>Filter by</h3>
            <ul className="filter_bar__list">
              <li className="filter_bar__item">
                <NavLink className={({isActive}) => isActive ? "link active__link": "link"} to={`/filter/${value}/settings-by-filter`}>
                  <CiSettings />
                  Settings by filter
                <span className="result__count">{handleResultCount()}</span>
                </NavLink>
              </li>
              <li className="filter_bar__item">
                <NavLink className={({isActive}) => isActive ? "link active__link": "link"} to={`/filter/${value}/users`}>
                  <PiUsersThin />
                  Users
                <span className="result__count">{filterAllData?.items?.length}</span>
                </NavLink> 
              </li>
            </ul>
            </div>
            </div>
            <div className="filter__result">
              <div className="container__fluid">
              <Routes>
                <Route path={`settings-by-filter`} element={<FilterSettings count={handleResultCount()}/>}/>
                <Route path={`users`} element={<FilterUser/>}/>
              </Routes>
              </div>
            </div>
            <Latest/>
          </div>
        ) : (
          <LoadingBox>
            <LoadTitle>Yuklanmoqda</LoadTitle>
          </LoadingBox>
        )}
    </section>
  );
};
