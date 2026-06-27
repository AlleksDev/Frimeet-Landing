import './App.css'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import ShareFallbackPage, { parseShareTarget } from './pages/ShareFallbackPage'
import { getLegalPageByPath } from './pages/legalContent'

function App() {
  const shareTarget = parseShareTarget(window.location.pathname)
  const legalPage = getLegalPageByPath(window.location.pathname)

  if (shareTarget) {
    return <ShareFallbackPage target={shareTarget} />
  }

  if (legalPage) {
    return <LegalPage page={legalPage} />
  }

  return <HomePage />
}

export default App
