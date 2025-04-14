import { Link } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

function Navbar(){
    // const { user, dispatch } = useAuth();

    const handleLogout = ()=>{
        // dispatch({ type: 'LOGOUT'});  
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
							<h6 className="font-weight-bolder">Welcome to DDDP Reporting Tool Dashboard</h6>
						</div>
						{/* Custom search end */}

						{/* Header actions start */}
						<ul className="header-actions">
							{/* <li className="dropdown">
								<a href="#" id="notifications" data-toggle="dropdown" aria-haspopup="true">
									<i className="icon-box"></i>
								</a>
								<div className="dropdown-menu dropdown-menu-right lrg" aria-labelledby="notifications">
									<div className="dropdown-menu-header">
										Tasks (05)
									</div>	
									<ul className="header-tasks">
										<li>
											<p>#20 - Dashboard UI<span>90%</span></p>
											<div className="progress">
												<div className="progress-bar bg-primary" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{"width": "90%"}}>
													<span className="sr-only">90% Complete (success)</span>
												</div>
											</div>
										</li>
										<li>
											<p>#35 - Alignment Fix<span>60%</span></p>
											<div className="progress">
												<div className="progress-bar bg-primary" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{"width": "60%"}}>
													<span className="sr-only">60% Complete (success)</span>
												</div>
											</div>
										</li>
										<li>
											<p>#50 - Broken Button<span>40%</span></p>
											<div className="progress">
												<div className="progress-bar bg-secondary" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{"width": "40%"}}>
													<span className="sr-only">40% Complete (success)</span>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</li>
							<li className="dropdown">
								<a href="#" id="notifications" data-toggle="dropdown" aria-haspopup="true">
									<i className="icon-bell"></i>
									<span className="count-label">8</span>
								</a>
								<div className="dropdown-menu dropdown-menu-right lrg" aria-labelledby="notifications">
									<div className="dropdown-menu-header">
										Notifications (40)
									</div>
									<ul className="header-notifications">
										<li>
											<a href="#">
												<div className="user-img away">
													<img src="assets/img/user.png" alt="User"/>
												</div>
												<div className="details">
													<div className="user-title">Abbott</div>
													<div className="noti-details">Membership has been ended.</div>
													<div className="noti-date">Oct 20, 07:30 pm</div>
												</div>
											</a>
										</li>
										<li>
											<a href="#">
												<div className="user-img busy">
													<img src="assets/img/user.png" alt="User"/>
												</div>
												<div className="details">
													<div className="user-title">Braxten</div>
													<div className="noti-details">Approved new design.</div>
													<div className="noti-date">Oct 10, 12:00 am</div>
												</div>
											</a>
										</li>
										<li>
											<a href="#">
												<div className="user-img online">
													<img src="assets/img/user.png" alt="User"/>
												</div>
												<div className="details">
													<div className="user-title">Larkyn</div>
													<div className="noti-details">Check out every table in detail.</div>
													<div className="noti-date">Oct 15, 04:00 pm</div>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</li> */}
							<li className="dropdown">
								<a href="#" id="userSettings" className="user-settings" data-toggle="dropdown" aria-haspopup="true">
									<span className="user-name">
                                        {/* {user?.user?.fullName} */}
                                        {/* {user?.currentUser?.lastName} */}
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
											{/* <h5>{user?.user?.username}</h5> */}
											<p>Admin DACF</p>
										</div>
										{/* <a href="user-profile.html"><i className="icon-user1"></i> My Profile</a> */}
										{/* <a href="account-settings.html"><i className="icon-settings1"></i> Account Settings</a> */}
                                        <Link onClick={()=>{handleLogout()}}>
											Sign Out
                                           {/* <a> */}
												<i className="icon-log-out1"></i>
										    	{/* <input 
													type="button" 
													className="btn btn-light"  
													value="Sign Out"
													onClick={()=>{handleLogout()}}
													/>  */}
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