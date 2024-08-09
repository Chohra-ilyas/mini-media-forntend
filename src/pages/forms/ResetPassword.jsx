import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./form.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);

  //form submit hundler
  const formSumbitHandler = (e) => {
    e.preventDefault();

    if (password.trim() === "")
      return toast.error("Password feild Description is required");

    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <section className="form-container">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <h1 className="form-title">Reset password</h1>
          <form className="form" onSubmit={formSumbitHandler}>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                placeholder="Enter Your New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="form-btn">
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
