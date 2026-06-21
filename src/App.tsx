import './App.css'
import HomePage from './pages/HomePage'
import ShareFallbackPage, { parseShareTarget } from './pages/ShareFallbackPage'

function App() {
  const shareTarget = parseShareTarget(window.location.pathname)

  if (shareTarget) {
    return <ShareFallbackPage target={shareTarget} />
  }

  return <HomePage />
}

export default App
