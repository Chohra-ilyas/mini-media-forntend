import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./verifyEmail.css";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";
const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);

  return (
    <section className="verify-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verify-email-icon">
            <h1 className="verify-email-title">
              Your email address has been successfully verified
            </h1>
            <Link to="/login" className="verify-email-link">
              Go to login page
            </Link>
          </i>
        </>
      ) : (
        <>
          <h1 className="verify-email-not-found">Email Not Found</h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
