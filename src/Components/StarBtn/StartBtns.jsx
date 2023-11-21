import { useContext, useEffect, useRef } from "react";
import { Button, Context, setBackStar, setStar } from "../../Settings";
import { useDispatch, useSelector } from "react-redux";
import STARWHITE from "../../assets/images/STAR-WHITE.png"
import STAR from "../../assets/images/STAR.png"
export const StarBtn = ({ repo , active}) => {
  const { starReposAndProfile } = useSelector(({ Reducer }) => Reducer);
  const dispatch = useDispatch();
  const handleIncludeRepos = () => {
    if (starReposAndProfile.some((item) => item.id === repo.id)) {
      return true;
    } else {
      return false;
    }
  };
  const handleAddRepos = () => {
    if(handleIncludeRepos()){
        dispatch(setBackStar(repo))
        handleIncludeRepos()
    }else{
        dispatch(setStar(repo))
        handleIncludeRepos()
    }
  };
  useEffect(() => {
    handleIncludeRepos();
  }, [repo.id]);
  return (
    <div className="dashboard__home_item--btn">
      <Button className="star__btn" active={true} onClick={handleAddRepos} style={{backgroundImage: handleIncludeRepos() ? `url(${STAR})` : `url(${STARWHITE})`, borderRadius: active && "10px"}}>
        Star
      </Button>
      {!active ? (
      <Button
        active={true}
        onClick={(event) => {
          let details = event.target.parentNode.querySelector("details");
          if (details) {
            details.open = true;
          }
        }}
      >
        <details>
          <summary style={{ listStyle: "none" }}>
            <svg
              fill="#6e77815e"
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
          <div className="dashboard__home_btn--bar">
            <div className="bar__header">
              <h3>Git hub clone</h3>
              <button
                onClick={({ target }) => {
                  let details = target.parentNode.parentNode.parentNode;
                  if (details) {
                    details.open = false;
                  }
                }}
                className="border-transparent"
              >
                &times;
              </button>
            </div>
            <p>
              This is a git hub clone version of ShokhDeveloper and you can't
              put a repository in it!
            </p>
          </div>
        </details>
      </Button>
      ): null}
    </div>
  );
};
