import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { getProfile } from './store/slices/authSlice'
import { Toaster } from './components/ui/sonner'
// Components
import Header from './components/Header'
import Footer from './components/Footer'
// Pages
import routes from './routes'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { token, isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check if user is authenticated on app load
    if (token && !isAuthenticated) {
      dispatch(getProfile())
    }
  }, [dispatch, token, isAuthenticated])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1 mt-[60px]">
        <Routes>
          {routes.map(route =>
            isAuthenticated ?
              <Route key={route.key} path={route.path} element={route.element} />
              :
              route.public && <Route key={route.key} path={route.path} element={route.element} />)}
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
