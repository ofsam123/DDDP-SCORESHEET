import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import "./styles.css";
import { Row } from "antd";
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

                              dispatch({ type: 'LOGIN_SUCCESS', payload: payload });
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
              placeholder="DDDP Username"
              name="userName"
              value={state.userName}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="DDDP Email"
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
              <p>Enter your DDDP Account details to Sign In</p>
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
              <p>Enter your DDDP Account details to Sign In</p>
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