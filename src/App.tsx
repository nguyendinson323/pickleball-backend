import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { restoreAuthState } from './store/slices/authSlice'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import routes from './routes'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { token, isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Restore auth state on app load if tokens exist
    const storedToken = localStorage.getItem('token')
    const storedRefreshToken = localStorage.getItem('refresh_token')
    
    if (storedToken && storedRefreshToken && !isAuthenticated) {
      dispatch(restoreAuthState())
    }
  }, [dispatch, isAuthenticated])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1 mt-[60px]">
        <Routes>
          {routes.map(route => {
            // Always render public routes
            if (route.public) {
              return <Route key={route.key} path={route.path} element={route.element} />
            }
            // Only render private routes if authenticated
            if (isAuthenticated) {
              return <Route key={route.key} path={route.path} element={route.element} />
            }
            // Don't render anything for private routes when not authenticated
            return null
          })}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
