import { useSelector } from "react-redux";
import { Avatar, LinkActive, TextSettings } from "../../Settings";
import { useEffect, useState } from "react";
import { StarBtn } from "../StarBtn";
import Star from "../../assets/images/STAR-WHITE.png";
export const Latest = () => {
  const {followingRepos} = useSelector(({Reducer}) => Reducer)
  const [repos, setRepos] = useState([])
  useEffect(() => {
    if(followingRepos?.length){
        let json = JSON.stringify(followingRepos)
        let data = JSON.parse(json) 
        setRepos(data.reverse())
    }
  },[followingRepos])
  return (
    <div className="dashboard__latest">
      <div className="container__fluid">
        <div className="dashboard_latest__inner">
          <div className="dashboard_latest__item">
            <h4 className="dashboard_latest__title">Latest changes</h4>
            <div className="dashboard_latest__inner_box">
              <svg
                fill="#6e77818a"
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-dot-fill mb-2"
              >
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
              </svg>
              <ul className="dashboard_latest_item__list">
                <li>
                  <TextSettings>15 hours ago</TextSettings>
                  <LinkActive styledType={"white"}>
                    Copilot content exclusions – Temporary rollback and upcoming
                    fix
                  </LinkActive>
                </li>
              </ul>
              <svg
                fill="#6e77818a"
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-dot-fill mb-2"
              >
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
              </svg>
            </div>

            <div className="dashboard_latest__inner_box">
              <svg
                fill="#6e77818a"
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-dot-fill mb-2"
              >
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
              </svg>
              <ul className="dashboard_latest_item__list">
                <li>
                  <TextSettings>3 days ago</TextSettings>
                  <LinkActive styledType={"white"}>
                  Dependabot auto-triage rules support CVE IDs and GHSA IDs
                  </LinkActive>
                </li>
              </ul>
              <svg
                fill="#6e77818a"
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-dot-fill mb-2"
              >
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
              </svg>
            </div>
            <div className="dashboard_latest__inner_box">
              <svg
                fill="#6e77818a"
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-dot-fill mb-2"
              >
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
              </svg>
              <ul className="dashboard_latest_item__list">
                <li>
                  <TextSettings>5 days ago</TextSettings>
                  <LinkActive styledType={"white"}>
                  Custom Organization Roles are now GA
                  </LinkActive>
                </li>
              </ul>
              <svg
                fill="#6e77818a"
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-dot-fill mb-2"
              >
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
              </svg>
            </div>
            <div className="dashboard_latest__inner_box">
              <svg
                fill="#6e77818a"
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-dot-fill mb-2"
              >
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
              </svg>
              <ul className="dashboard_latest_item__list">
                <li>
                  <TextSettings>Last week</TextSettings>
                  <LinkActive styledType={"white"}>
                  The GitHub Enterprise Server 3.11 Release Candidate is available
                  </LinkActive>
                <LinkActive onClick={() => window.open("https://github.blog/changelog/", "blank")} style={{display: "block"}}>View changelog</LinkActive>
                </li>
              </ul>
            </div>
          </div>
          <div className="dashboard_latest__item">
            <h4 className="dashboard_latest_item__title">
                Explore repositories
            </h4>
            {repos.slice(0, 4)?.map(item => {
                return(
                    <div className="dashboard_latest_item__repo repo">
                        <div className="repo__inner">
                            <div>
                        <Avatar width={40} height={40} src={item.owner.avatar_url}/>
                        <p> {item.owner.login} / {item.name.split("").length > 4 ? `${item.name.split(" ").slice(0, 4).join(" ")} ...`: item.name}</p>
                            </div>
                        <StarBtn active={true} repo={item}/>
                        </div>
                        <div className="repo__bottom">
                            <div className="repo_bottom__star">
                            <img width={20} height={20} src={Star} alt="" />
                            <p>286</p>
                            </div>
                            <p className={`language ${item.language  === "C#" ? "C": item.language}`} >{item.language}</p>
                        </div>
                    </div>
                )
            })}
        </div>  
        </div>
      </div>
    </div>
  );
};
