import { useState } from "react";
import "./form.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //form submit hundler
  const formSumbitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("Email feild is required");
    if (password.trim() === "")
      return toast.error("Password feild Description is required");

    dispatch(loginUser({ email, password }));
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Login to your Account</h1>
      <form className="form" onSubmit={formSumbitHandler}>
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
          Login
        </button>
      </form>
      <div className="form-footer">
        Did you forgot your password?{" "}
        <Link to="/forgot-password">Forgot password</Link>
      </div>
    </section>
  );
};

export default Login;
