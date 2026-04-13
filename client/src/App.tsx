import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import FeedPage from "./pages/user/FeedPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import GuestRoute from "./components/shared/GuestRoute";
import CreatePostPage from "./pages/user/CreatePostPage";
import ProfilePage from "./pages/user/ProfilePage";
import EditProfilePage from "./pages/user/EditProfilePage";
import FollowersPage from "./pages/user/FollowersPage";
import FollowingPage from "./pages/user/FollowingPage";
import PostPage from "./pages/post/PostPage";
import SearchPage from "./pages/post/SearchPage";
import LandingPage from "./components/landingpage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LandingPage />} />
        {/* Auth routes — no navbar */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />

        {/* Public routes — WITH navbar, no auth required */}
        <Route element={<MainLayout />}>
          <Route path="/u/:username" element={<ProfilePage />} />
          <Route path="/u/:username/followers" element={<FollowersPage />} />
          <Route path="/u/:username/following" element={<FollowingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
        </Route>

        {/* Protected routes — WITH navbar, auth required */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/new-story" element={<CreatePostPage />} />
          <Route path="/settings" element={<EditProfilePage />} />
        </Route>

        {/* Redirects */}
        {/* <Route path="/" element={<Navigate to="/feed" replace />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
