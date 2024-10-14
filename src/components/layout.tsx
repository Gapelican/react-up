import React from 'react'
import { Outlet } from 'react-router-dom'

import { SidebarMenu } from './navbar'
const Layout: React.FC = () => {
  return (
    <div className="flex">
      <SidebarMenu />
      <main>
        <Outlet />
      </main>
      <footer>© 2024 Minha App</footer>
    </div>
  )
}

export default Layout
