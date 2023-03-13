import React from 'react'

export default function Navbar() {
  return (
    <div className="navbar">
        <div className="logo">Haky Chat</div>
        <div className="user">
          <img src="https://images.pexels.com/users/avatars/309493370/nazila-azimzada-847.jpeg?auto=compress&fit=crop&h=40&w=40&dpr=1" alt="" />
          <span>Jone Doe</span>
          <button>Log out</button>
        </div>
    </div>
  )
}
