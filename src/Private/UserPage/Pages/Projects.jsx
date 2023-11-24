import { BtnGreen, Button } from "../../../Settings";

export const Projects = () => {
  return (
    <div className="user_page__projects">
      <div className="user_page_projects__inner">
        <div className="user_page__dashboard">
            <div className="user_page_dashboard__info">
          <h4>Welcome to the all-new projects</h4>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
            rem repellendus architecto blanditiis illum, totam iure placeat
            molestiae voluptatem quos? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Rem, in.
          </p>
          <Button>Learn more</Button>
            </div>
        </div>
        <div className="user_page__create_project">
          <svg
            fill="#6e768173"
            aria-hidden="true"
            height="24"
            viewBox="0 0 24 24"
            version="1.1"
            width="24"
            data-view-component="true"
            class="octicon octicon-table blankslate-icon"
          >
            <path d="M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 20.25 22H3.75A1.75 1.75 0 0 1 2 20.25ZM9 9v11.5h11.25a.25.25 0 0 0 .25-.25V9Zm11.5-1.5V3.75a.25.25 0 0 0-.25-.25H9v4ZM3.5 9v11.25c0 .138.112.25.25.25H7.5V9Zm4-1.5v-4H3.75a.25.25 0 0 0-.25.25V7.5Z"></path>
          </svg>
          <h3>Create your first GitHub project</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit laboriosam .</p>
        <BtnGreen className="border-transparent">New project</BtnGreen>
        </div>
      </div>
    </div>
  );
};
