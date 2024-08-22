import { useEffect } from 'react'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import Home from './Pages/Home/Home'

import useStore from './store/useStore'
import useFetchData from './utils/hooks/useFetchData'

import './styles/app.scss'

const App = () => {
  useFetchData()

  const allRecommendVideos = useStore((state) => state.allRecommendVideos)

  useEffect(() => {
    console.log('allRecommendVideos', allRecommendVideos)
  }, [allRecommendVideos])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
