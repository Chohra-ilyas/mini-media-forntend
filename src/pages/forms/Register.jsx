import { useState } from "react";
import "./form.css";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert"
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  //form submit hundler
  const formSumbitHandler = (e) => {
    e.preventDefault();

    if (username.trim() === "")
      return toast.error("Username feild is required");
    if (email.trim() === "") return toast.error("Email feild is required");
    if (password.trim() === "")
      return toast.error("Password feild Description is required");

    dispatch(registerUser({ username, email, password }));
  };

 const navigate = useNavigate()
  
  if(registerMessage){
    swal({
      title:registerMessage,
      icon:"success"
    }).then(isOk => {
      if(isOk){
        navigate("/login")
      }
    })
  }
  


  return (
    <section className="form-container">
      <h1 className="form-title">Create New Account</h1>
      <form className="form" onSubmit={formSumbitHandler}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-input"
            id="username"
            placeholder="Enter Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            placeholder="Enter Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group password">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-input passord-input"
            id="password"
            placeholder="Enter Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!showPassword && (
            <i
              onClick={() => setShowPassword(true)}
              className="bi bi-eye password-eyes"
            ></i>
          )}
          {showPassword && (
            <i
              onClick={() => setShowPassword(false)}
              className="bi bi-eye-slash password-eyes"
            ></i>
          )}
        </div>
        <button type="submit" className="form-btn">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an Account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;
