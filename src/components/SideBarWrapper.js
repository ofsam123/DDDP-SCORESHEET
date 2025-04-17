import { Link } from "react-router-dom";
import SideBarMenu from "../layout/SidebarMenu";


function SideBarWrapper(){
    return(
        <nav id="sidebar" className="sidebar-wrapper">

					{/* Sidebar brand start  */}
					<div className="sidebar-brand p-2">
						<Link to="/" className="logo">
							<img src="assets/img/logodddp2.png" alt="DACF Support App" width={100} height={200} />
						</Link>
					</div>
					{/* Sidebar brand end  */}

					{/* Sidebar content start */}
					<div className="sidebar-content">

						{/* sidebar menu start */}
						<SideBarMenu />
						{/* sidebar menu end */}

					</div>
					{/* Sidebar content end */}

				</nav>
    );
}

export default SideBarWrapper;