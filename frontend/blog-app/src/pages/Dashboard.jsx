import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlogs from "../dashboard/CreateBlogs";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";
function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Sidebar setComponent={setComponent} />

      {/* Apply left padding for larger screens to prevent overlap */}
      <div className="sm:pl-64 pt-4 p-4">
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlogs />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
}

export default Dashboard