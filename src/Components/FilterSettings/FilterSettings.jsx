import { useDispatch, useSelector } from "react-redux";
import { Button, Context, setFilter } from "../../Settings";
import { RenderUsers } from "../RenderUser";
import { useContext, useEffect } from "react";

export const FilterSettings = ({ }) => {
  const {filterData} = useSelector(({Reducer}) => Reducer)
  const {filterAllData} = useContext(Context);
  const dispatch = useDispatch()
  const handleFilter = (event) => {
    let parent = event.target.parentNode.parentNode.parentNode.parentNode;
    switch (event.target.id) {
      case "name":
        {
          parent.open = false;
          dispatch(setFilter("name"))
        }
        break;
        default:
        return false;
    }
  };
  useEffect(() => {
    console.log(filterData)
  },[filterData])

  return (
    <div className="filter__settings">
      <div className="container__fluid">
        <div className="filter_settings__infos">
          <h2>
           Result = {filterAllData?.total_count}  {"(252 ms)"}{" "}
          </h2>
          <div className="filter_settings__sort">
            <Button>
              Sort by :
              <span>
                <details>
                  <summary>
                    Least recently updated
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                      className="octicon octicon-triangle-down"
                      viewBox="0 0 16 16"
                      width={20}
                      height={20}
                      fill="currentColor"
                      style={{
                        display: "inline-block",
                        userSelect: "none",
                        verticalAlign: "text-bottom",
                        overflow: "visible",
                      }}
                    >
                      <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z" />
                    </svg>
                  </summary>
                  <div className="filter_settings__bar">
                    <form>
                      <label htmlFor="name">
                        <p>Sort by name</p>
                        <input
                          onChange={handleFilter}
                          name="filter"
                          className="visually-hidden"
                          value={"name"}
                          type="radio"
                          id="name"
                        />
                      </label>
                    </form>
                  </div>
                </details>
              </span>
            </Button>
          </div>
        </div>
        <RenderUsers users={filterData}/>
      </div>
    </div>
  );
};
