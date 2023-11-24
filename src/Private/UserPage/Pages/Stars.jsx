import { BtnGreen, DefaultLink } from "../../../Settings";

export const Stars = () => {
  return (
    <div className="user__star">
      <div className="user_star__top">
        <h4>Lists {"(0)"}</h4>
        <div>
          <details className="user_repo__btn sort_details">
            <summary>
              Sort{" "}
              <svg
                fill="#ffffff8d"
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
          </details>
          <BtnGreen className="border-transparent">Create list</BtnGreen>
        </div>
      </div>
      <div className="user_star__box">
        <div>
        <svg
          fill="#6e7681"  
          aria-hidden="true"
          height="24"
          viewBox="0 0 24 24"
          version="1.1"
          width="24"
          data-view-component="true"
          class="octicon octicon-star blankslate-icon"
        >
          <path d="M12 .25a.75.75 0 0 1 .673.418l3.058 6.197 6.839.994a.75.75 0 0 1 .415 1.279l-4.948 4.823 1.168 6.811a.751.751 0 0 1-1.088.791L12 18.347l-6.117 3.216a.75.75 0 0 1-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 0 1 .416-1.28l6.838-.993L11.328.668A.75.75 0 0 1 12 .25Zm0 2.445L9.44 7.882a.75.75 0 0 1-.565.41l-5.725.832 4.143 4.038a.748.748 0 0 1 .215.664l-.978 5.702 5.121-2.692a.75.75 0 0 1 .698 0l5.12 2.692-.977-5.702a.748.748 0 0 1 .215-.664l4.143-4.038-5.725-.831a.75.75 0 0 1-.565-.41L12 2.694Z"></path>
        </svg>
        <h3>Create your first list</h3>
        <p>Lists make it easier to organize and curate repositories that you have starred. <DefaultLink style={{fontSize: "1em"}}>Create your first list. </DefaultLink></p>
        </div>
      </div>
    </div>
  );
};
