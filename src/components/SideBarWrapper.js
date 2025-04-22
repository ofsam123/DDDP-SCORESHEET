import { Link } from "react-router-dom";
import SideBarMenu from "../layout/SidebarMenu";


function SideBarWrapper(){
    return(
        <nav id="sidebar" className="sidebar-wrapper">

					{/* Sidebar brand start  */}
					<div className="sidebar-brand p-21">
  <Link to="/" className="1">
    <img
      src="assets/img/logo3.png"
      alt="DACF Support App"
      style={{ width: '100%', height: '99%', objectFit: 'cover' }}
    />
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