import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import axios from "../api/axios";


function Login() {
	// const { dispatch } = useAuth();

	const usernameRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');
	const [isConnecting, setIsConnecting] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	// const from = location?.state?.from.pathname || '/'

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsConnecting(true);
		//payload of authentication
		const user = {
			emailAddress: usernameRef.current.value,
			password: passwordRef.current.value
		};

		// console.log(user);
		//submit the form to authentication endpoint
		axios.post("/login",
			JSON.stringify(user),
			{
				'headers': { 'Content-Type': 'application/json' }
			}
		)
			.then((resp) => {
				setIsConnecting(false);
				setError('');
				// console.log(resp.data.statusCode);
				// if (resp.data.statusCode === 200) {
				// 	const currentUser = resp.data?.response[0];

				// 	const payload = {
				// 		user: {
				// 			fullName: currentUser.FullName,
				// 			username: currentUser.EmailAddress,
				// 			phone: currentUser.PhoneNumber,
				// 			token: currentUser.Auth,
				// 			role:currentUser.Role
				// 		}
				// 	};

				// 	// dispatch({ type: 'LOGIN_SUCCESS', payload: payload });

				// 	navigate(from, { replace: true });
				// } else {
				// 	// console.log(resp.data.message);
				// 	setError(resp.data.message);
				// 	setIsConnecting(false);
				// }


			}).catch(err => {
				console.log(err);
				setError("Could not login. Please try again!!!");
				setIsConnecting(false);
			});
	}
	return (

		<div className="container">

			<form onSubmit={handleSubmit}>
				<div className="row justify-content-md-center">
					<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
						<div className="login-screen">
							<div className="login-box">
								{error && <div className="alert alert-danger">
									{error}
								</div>
								}
								<a href="#" className="login-logo">
									<img src="assets/img/logo.jpg" alt="DACF Support App" width={100} height={70} />
								</a>
								<h5>Welcome to PWD,<br />DACF Support App Login.</h5>
								<div className="form-group">
									<input type="email" ref={usernameRef} className="form-control" placeholder="Email Address" required />
								</div>
								<div className="form-group">
									<input type="password" ref={passwordRef} className="form-control" placeholder="Password" required />
								</div>
								<div className="actions mb-4">
									{isConnecting 
									? <button className="btn btn-primary">
									<span className="spinner-border spinner-border-sm"></span>
										Connecting..
								  </button> :
									<button type="submit" className="btn btn-primary">Login</button>}
								</div>
								<div className="forgot-pwd">
									{/* <a className="link" href="#">Forgot password?</a> */}
								</div>
								<hr />
								<div className="actions align-left">

								</div>
							</div>
						</div>
					</div>
				</div>
			</form>

		</div>

	);
}

export default Login;