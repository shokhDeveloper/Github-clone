import "./filterSearchPage.scss";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { LoadTitle, LoadingBox, setFilterData } from "../../Settings";
import { NavLink } from "react-router-dom";
import { PiUsersThin } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";

export const FilterSearchPage = () => {
  const { filterData } = useSelector(({ Reducer }) => Reducer);
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
          dispatch(setFilterData(response?.items));
        }
      } catch (error) {
        return error;
      }
    } else {
      return false;
    }
  }, [value, filterData]);
  useEffect(() => {
    handleGetSearchResult();
  }, [handleGetSearchResult]);
  return (
    <section className="filterPage">
      <div className="container">
        {filterData?.length ? (
          <div className="filterPage__inner">
            <div className="filterPage__bar">
            <h3>Filter by</h3>
            <ul className="filter_bar__list">
              <li className="filter_bar__item">
                <NavLink className={({isActive}) => isActive ? "link active__link": "link"} to={`/filter/${value}/settings-by-filter`}>
                  <CiSettings />
                  Settings by filter
                </NavLink>
              </li>
              <li className="filter_bar__item">
                <NavLink to={"users"}>
                  <PiUsersThin />
                  Users
                </NavLink>
              </li>
            </ul>
            </div>
            <div className="filter__result">
              <h1>Helo</h1>
            </div>
          </div>
        ) : (
          <LoadingBox>
            <LoadTitle>Yuklanmoqda</LoadTitle>
          </LoadingBox>
        )}
      </div>
    </section>
  );
};
