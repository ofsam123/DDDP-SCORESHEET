// import { useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// // import useAuth from "../hooks/useAuth";
// import axios from "../api/axios";


// function Login() {
// 	// const { dispatch } = useAuth();

// 	const usernameRef = useRef();
// 	const passwordRef = useRef();
// 	const [error, setError] = useState('');
// 	const [isConnecting, setIsConnecting] = useState(false);
// 	const navigate = useNavigate();
// 	const location = useLocation();
// 	// const from = location?.state?.from.pathname || '/'

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		setIsConnecting(true);
// 		//payload of authentication
// 		const user = {
// 			emailAddress: usernameRef.current.value,
// 			password: passwordRef.current.value
// 		};

// 		// console.log(user);
// 		//submit the form to authentication endpoint
// 		axios.post("/login",
// 			JSON.stringify(user),
// 			{
// 				'headers': { 'Content-Type': 'application/json' }
// 			}
// 		)
// 			.then((resp) => {
// 				setIsConnecting(false);
// 				setError('');
// 				// console.log(resp.data.statusCode);
// 				// if (resp.data.statusCode === 200) {
// 				// 	const currentUser = resp.data?.response[0];

// 				// 	const payload = {
// 				// 		user: {
// 				// 			fullName: currentUser.FullName,
// 				// 			username: currentUser.EmailAddress,
// 				// 			phone: currentUser.PhoneNumber,
// 				// 			token: currentUser.Auth,
// 				// 			role:currentUser.Role
// 				// 		}
// 				// 	};

// 				// 	// dispatch({ type: 'LOGIN_SUCCESS', payload: payload });

// 				// 	navigate(from, { replace: true });
// 				// } else {
// 				// 	// console.log(resp.data.message);
// 				// 	setError(resp.data.message);
// 				// 	setIsConnecting(false);
// 				// }


// 			}).catch(err => {
// 				console.log(err);
// 				setError("Could not login. Please try again!!!");
// 				setIsConnecting(false);
// 			});
// 	}
// 	return (

// 		<div className="container">

// 			<form onSubmit={handleSubmit}>
// 				<div className="row justify-content-md-center">
// 					<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
// 						<div className="login-screen">
// 							<div className="login-box">
// 								{error && <div className="alert alert-danger">
// 									{error}
// 								</div>
// 								}
// 								<a href="#" className="login-logo">
// 									<img src="assets/img/logodddp.png" alt="DACF Support App" width={100} height={70} />
// 								</a>
// 								<h5>Welcome to PWD,<br />DACF Support App Login.</h5>
// 								<div className="form-group">
// 									<input type="email" ref={usernameRef} className="form-control" placeholder="Email Address" required />
// 								</div>
// 								<div className="form-group">
// 									<input type="password" ref={passwordRef} className="form-control" placeholder="Password" required />
// 								</div>
// 								<div className="actions mb-4">
// 									{isConnecting 
// 									? <button className="btn btn-primary">
// 									<span className="spinner-border spinner-border-sm"></span>
// 										Connecting..
// 								  </button> :
// 									<button type="submit" className="btn btn-primary">Login</button>}
// 								</div>
// 								<div className="forgot-pwd">
// 									{/* <a className="link" href="#">Forgot password?</a> */}
// 								</div>
// 								<hr />
// 								<div className="actions align-left">

// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</form>

// 		</div>

// 	);
// }

// export default Login;

import React, { useState } from "react";
import "./styles.css";
import { Row } from "antd";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";



export default function App() {
	const navigate = useNavigate();
	const location = useLocation();
 const from = location?.state?.from.pathname || '/'
  const { dispatch } = useAuth();
  const [state, setState] = useState({
    userName: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on input change
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { userName, email } = state;

    // Basic validation
    if (!userName || !email) {
      setError("Please fill in both username and email");
      return;
    }
      axios
                        .get(`/users?filter=username:eq:${userName}&filter=email:eq:${email}&filter=disabled:eq:false&fields=username,displayName,email,phoneNumber,disabled`)
                        .then(resp => {
                            // setMeetingDecision({decisions: result.data.instances, reports:resp.data.instances})
                            const userList = resp.data.users;

                            if(userList.length != 0){
                              const user = userList[0];
                              const payload = {
                                user: {
                                  fullName: user.displayName,
                                  username: user.username,
                                  phone: user.phoneNumber,
                                  disabled: user.disabled,
                                  email: user.email
                                }};

                              // dispatch({ type: 'LOGIN_SUCCESS', payload: payload });
                              navigate(from, { replace: true });

                            }
                 
                        })
                        .catch(err => console.log(err))
                    }

  

  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = `container ${type === "signUp" ? "right-panel-active" : ""}`;

  return (
    <div className="App">
      <div className={containerClass} id="container">
        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleOnSubmit}>

            <h1>Sign In</h1>
            <div className="social-container">
           
            </div>
            <Row>
            <img src="assets/img/coatofarms.png" alt="DACF Support App" width={50} height={50} />
            <span style={{padding: "10px"}}>
              
            </span>
            <img src="assets/img/3.png" alt="DACF Support App" width={50} height={50} />
            <span style={{padding: "10px"}}>
             
            </span>
            <img src="assets/img/logodddp.png" alt="DACF Support App" width={50} height={50} />

            </Row>
           
            <div className="social-container">
             
            </div>
            
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              placeholder="User Name"
              name="userName"
              value={state.userName}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay Panels */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 style={{color:"white"}}>Welcome Back!</h1>
              <p>Enter your personal details to Sign In</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Right View
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 style={{color:"white"}}>Welcome Back!</h1>
              <p>Enter your personal details to Sign In</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Left View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {success && (
        <div className="success-popup">
          <div className="popup-content">
            <h2>Login Successful!</h2>
            <p><strong>Username:</strong> {success.username}</p>
            <p><strong>Display Name:</strong> {success.displayName}</p>
            <p><strong>Email:</strong> {success.email}</p>
            <p><strong>Phone Number:</strong> {success.phoneNumber || "N/A"}</p>
            <button onClick={() => setSuccess(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}