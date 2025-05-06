import { Link } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

function SideBarMenu(){
	// const { user } = useAuth();
    return(
        <div className="sidebar-menu">
						<ul>
							<li className="header-menu">General</li>	
								
							<li>
								<Link to="/">
									<i className="icon-home"></i>
									<span className="menu-text">Dashboard</span>
								</Link>
							</li>
							<li>
								<Link to="/dpat-assessment-sheet">
									<i className="icon-phonelink"></i>
									<span className="menu-text">DPAT Assessment Sheet</span>
								</Link>
							</li>
							<li>
								<Link to="/dpat-regional-analytics">
									<i className="icon-area-graph"></i>
									<span className="menu-text">Regional Analysis</span>
								</Link>
							</li>
							<li>
								<Link to="/dpat-district-analytics">
									<i className="icon-pie-chart"></i>
									<span className="menu-text">District Analysis</span>
								</Link>
							</li>
							
							<li>
							<Link to="/aap-analytics">
									<i className="icon-view_module"></i>
									<span className="menu-text">Annual Action Plan</span>
								</Link>
							</li>
							<li>
								<Link to="/project-and-program-analytics">
									<i className="icon-view_stream"></i>
									<span className="menu-text">Projects & Program</span>
								</Link>
							</li>
							{/* <li>
								<Link to="/real">
									<i className="icon-check_circle"></i>
									<span className="menu-text">Development Dimension</span>
								</Link>
							</li> */}
							<li>
								<Link to="/meetings">
									<i className="icon-broken_image"></i>
									<span className="menu-text">Meetings</span>
								</Link>
							</li>
							
						</ul>
					</div>
    );
}

export default SideBarMenu;