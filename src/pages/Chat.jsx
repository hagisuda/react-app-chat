import React from 'react'
import Feeds from '../components/Feeds'
import Sidebar from '../components/Sidebar'

export default function Chat() {
  return (
    <div className="chat">
        <div className="container">
            <Sidebar/>
            <Feeds/>
        </div>
    </div>
  )
}
