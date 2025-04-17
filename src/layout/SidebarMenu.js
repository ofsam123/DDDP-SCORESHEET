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
								<Link to="/dpat-score-sheet">
									<i className="icon-home2"></i>
									<span className="menu-text">DPAT Score Sheet</span>
								</Link>
							</li>
							
							<li>
							<Link to="/region-report">
									<i className="icon-view_module"></i>
									<span className="menu-text">Annual Action Plan</span>
								</Link>
							</li>
							<li>
								<Link to="/district-report">
									<i className="icon-view_stream"></i>
									<span className="menu-text">Projects & Program</span>
								</Link>
							</li>
							<li>
								<Link to="/real">
									<i className="icon-check_circle"></i>
									<span className="menu-text">Development Dimension</span>
								</Link>
							</li>
							<li>
								<Link to="/trial">
									<i className="icon-broken_image"></i>
									<span className="menu-text">Indicators</span>
								</Link>
							</li>
							
						</ul>
					</div>
    );
}

export default SideBarMenu;