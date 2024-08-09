import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/post-page/PostsPage";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostTable from "./pages/admin/PostTable";
import CategotriesTable from "./pages/admin/CategotriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify email/VerifyEmail";
function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" theme="colored" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/" />} />

        {/* Post Route */}
        <Route path="posts">
          <Route index element={<PostsPage />} />
          <Route
            path="create-post"
            element={user ? <CreatePost /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        {/* Admin Dashboard Route */}
        <Route path="admin-dashboard">
          <Route
            index
            element={
              user?.other.isAdmin ? <AdminDashboard /> : <Navigate to="/" />
            }
          />
          <Route path="users-table" element={user?.other.isAdmin ? <UsersTable /> : <Navigate to="/"/>} />
          <Route path="posts-table" element={user?.other.isAdmin ? <PostTable /> : <Navigate to="/"/>} />
          <Route path="categories-table" element={user?.other.isAdmin ? <CategotriesTable /> : <Navigate to="/"/>} />
          <Route path="comments-table" element={user?.other.isAdmin ? <CommentsTable /> : <Navigate to="/"/>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
