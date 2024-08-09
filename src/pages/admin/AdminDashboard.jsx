import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminMain from './AdminMain'
import "./admin.css"
const AdminDashboard = () => {
  return (
    <section className="admin-dashboard">
      <AdminSidebar/>
      <AdminMain/>
    </section>
  )
}

export default AdminDashboard
