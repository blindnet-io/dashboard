import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';

import ProtectedRoute from './pages/ProtectedRoute'
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const VerifyTokenPage = lazy(() => import('./pages/auth/VerifyTokenPage'))
const AdminPanel = lazy(() => import('./pages/AdminPanel'))
const ApplicationsPanel = lazy(() => import('./pages/ApplicationsPanel'))
const AppGroupPage = lazy(() => import('./pages/app/AppGroupPage'))
const CreateNewAppGroupPage = lazy(() => import('./pages/app/CreateNewAppGroup'))
const AppPage = lazy(() => import('./pages/app/AppPage'))
const CreateNewAppPage = lazy(() => import('./pages/app/CreateNewAppPage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='verify' element={<VerifyTokenPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminPanel />}>
              <Route element={<ApplicationsPanel />}>
                <Route index element={<AppGroupPage />} />
                <Route path='group/new' element={<CreateNewAppGroupPage />} />
                <Route path='app/:id' element={<AppPage />} />
                <Route path='app/new' element={<CreateNewAppPage />} />
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
