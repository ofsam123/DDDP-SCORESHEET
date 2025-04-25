import { Link } from "react-router-dom";
 import useAuth from "../hooks/useAuth";

function Navbar(){
     const { user, dispatch } = useAuth();

    const handleLogout = ()=>{
         dispatch({ type: 'LOGOUT'});  
    }

    return(
        <header className="header">
					<div className="toggle-btns">
						<a id="toggle-sidebar" href="#">
							<i className="icon-list"></i>
						</a>
						<a id="pin-sidebar" href="#">
							<i className="icon-list"></i>
						</a>
					</div>
					<div className="header-items">
						{/* Custom search start */}
						<div className="custom-search">
							{/* <input type="text" className="search-query" placeholder="Search here ..."/>
							<i className="icon-search1"></i> */}
							<h6 className="font-weight-bolder">Welcome to DDDP Reporting Tool </h6>
						</div>
						{/* Custom search end */}

						{/* Header actions start */}
						<ul className="header-actions">
						
							<li className="dropdown">
								<a href="#" id="userSettings" className="user-settings" data-toggle="dropdown" aria-haspopup="true">
									<span className="user-name">
                                        {user?.user?.fullName}
                                        
                                    </span>
									<span className="avatar">
										<img src="assets/img/user.png" alt="avatar"/>
										<span className="status busy"></span>
									</span>
								</a>
								<div className="dropdown-menu dropdown-menu-right" aria-labelledby="userSettings">
									<div className="header-profile-actions">
										<div className="header-user-profile">
											<div className="header-user">
												<img src="assets/img/user.png" alt="Admin Template"/>
											</div>
											<h5>{user?.user?.username}</h5>
											<p>{user?.user?.email}</p>
										</div>
										{/* <a href="user-profile.html"><i className="icon-user1"></i> My Profile</a> */}
										{/* <a href="account-settings.html"><i className="icon-settings1"></i> Account Settings</a> */}
                                        <Link onClick={()=>{handleLogout()}}>
											Sign Out
                                           {/* <a> */}
												<i className="icon-log-out1"></i>
										    	<input 
													type="button" 
													className="btn btn-light"  
													value="Sign Out"
													onClick={()=>{handleLogout()}}
													/> 
											{/* </a> */}
                                        </Link>
										
									</div>
								</div>
							</li>
						</ul>						
						{/* Header actions end */}
					</div>
				</header>
    );
}

export default Navbar;