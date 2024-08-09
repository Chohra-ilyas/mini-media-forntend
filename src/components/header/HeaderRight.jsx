import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
const HeaderRight = () => {
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();

  //logout Handler
  const logoutHandler = () =>{
    setDropdown(false);
    dispatch(logoutUser());
  }
  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span className="header-right-username">
              {user?.other.username}
            </span>
            <img
              src={user?.other.profilePhoto.url}
              alt="user photo"
              className="header-right-user-photo"
              onClick={() => setDropdown((prev) => !prev)}
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?.other._id}`}
                  className="header-dropdown-item"
                >
                  <i className="bi bi-file-person"></i>
                  <span onClick={()=>setDropdown(false)}>profile</span>
                </Link>
                <div onClick={logoutHandler} className="header-dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
