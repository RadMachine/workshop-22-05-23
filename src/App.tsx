import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { Layout } from './components/Layout'
import { CoursesPage } from './pages/CoursesPage'
import { CoursePage } from './pages/CoursePage'
import { useEffect } from 'react'
import { AuthStore } from './store/auth'
import { reaction } from 'mobx'

export interface AppProps {}

export function App({}: AppProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!AuthStore.isAuth) navigate('/login', { replace: true })
    else if (!pathname.includes('courses')) navigate('/courses', { replace: true })

    reaction(
      () => AuthStore.isAuth,
      (val) => !val && navigate('/login', { replace: true }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="courses" element={<Layout />}>
        <Route index element={<CoursesPage />} />
        <Route path=":courseId" element={<CoursePage />} />
      </Route>
    </Routes>
  )
}
