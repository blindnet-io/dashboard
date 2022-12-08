import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';

import AuthProtectedRoute from './pages/AuthProtectedRoute'
const VerifiedProtectedRoute = lazy(() => import('./pages/VerifiedProtectedRoute'))
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/register/RegisterPage'))
const VerifyTokenPage = lazy(() => import('./pages/auth/verify/VerifyTokenPage'))
const Navigation = lazy(() => import('./pages/Navigation'))
const ApplicationsPanel = lazy(() => import('./pages/applications/ApplicationsPanel'))
const AppGroupPage = lazy(() => import('./pages/applications/group/AppGroupPage'))
const CreateNewAppGroupPage = lazy(() => import('./pages/applications/create-group/CreateNewAppGroupPage'))
const AppPage = lazy(() => import('./pages/applications/app/AppPage'))
const CreateNewAppPage = lazy(() => import('./pages/applications/create-app/CreateNewAppPage'))

function App() {
  return (
    <BrowserRouter>
              <Suspense fallback={<Spinner className="centered-suspense" />}>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='verify' element={<VerifyTokenPage />} />
          <Route element={<AuthProtectedRoute />}>
            <Route element={<Navigation />}>
              <Route element={<VerifiedProtectedRoute />}>
                <Route element={<ApplicationsPanel />}>
                  <Route index element={<AppGroupPage />} />
                  <Route path='group/create' element={<CreateNewAppGroupPage />} />
                  <Route path='app/:id' element={<AppPage />} />
                  <Route path='app/create' element={<CreateNewAppPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
