import type { ReactNode } from 'react'
import Navbar from '../components/Navbar.module'
import styles from './MainLayout.module.css'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default MainLayout
