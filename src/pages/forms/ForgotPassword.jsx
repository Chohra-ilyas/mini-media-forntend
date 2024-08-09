import { useState } from "react";
import "./form.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  //form submit hundler
  const formSumbitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("Email feild is required");
    dispatch(forgotPassword(email));
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Forgot Password</h1>
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
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
      <div className="form-footer">
        Did you remember your password? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default ForgotPassword;
