import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import StyleListPage from './pages/StyleListPage'
import StyleDetailPage from './pages/StyleDetailPage'
import BrandListPage from './pages/BrandListPage'
import BrandDetailPage from './pages/BrandDetailPage'
import WardrobePage from './pages/WardrobePage'

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/styles" element={<PageTransition><StyleListPage /></PageTransition>} />
          <Route path="/styles/:id" element={<PageTransition><StyleDetailPage /></PageTransition>} />
          <Route path="/brands" element={<PageTransition><BrandListPage /></PageTransition>} />
          <Route path="/brands/:id" element={<PageTransition><BrandDetailPage /></PageTransition>} />
          <Route path="/wardrobe" element={<PageTransition><WardrobePage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
