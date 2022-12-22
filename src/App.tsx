import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProtectedRoute from './pages/AuthProtectedRoute';
import Navigation from './pages/Navigation';
// const VerifiedProtectedRoute = lazy(
//   () => import('./pages/VerifiedProtectedRoute')
// );
// const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));
// const RegisterPage = lazy(() => import('./pages/auth/register/RegisterPage'));
// const VerifyTokenPage = lazy(
//   () => import('./pages/auth/verify/VerifyTokenPage')
// );
// const Navigation = lazy(() => import('./pages/Navigation'));
// const ApplicationsPanel = lazy(
//   () => import('./pages/applications/ApplicationsPanel')
// );
// const AppGroupView = lazy(
//   () => import('./pages/applications/group/AppGroupView')
// );
// const CreateAppGroup = lazy(
//   () => import('./pages/applications/create-group/CreateAppGroup')
// );
// const AppView = lazy(() => import('./pages/applications/app/AppView'));
// const CreateApp = lazy(
//   () => import('./pages/applications/create-app/CreateApp')
// );
import VerifiedProtectedRoute from './pages/VerifiedProtectedRoute';
import ApplicationsPanel from './pages/applications/ApplicationsPanel';
import AppView from './pages/applications/app/AppView';
import CreateApp from './pages/applications/create-app/CreateApp';
import CreateAppGroup from './pages/applications/create-group/CreateAppGroup';
import AppGroupView from './pages/applications/group/AppGroupView';
import LoginPage from './pages/auth/login/LoginPage';
import RegisterPage from './pages/auth/register/RegisterPage';
import VerifyTokenPage from './pages/auth/verify/VerifyTokenPage';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner className="centered-suspense" />}>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify" element={<VerifyTokenPage />} />
          <Route element={<AuthProtectedRoute />}>
            <Route element={<Navigation />}>
              <Route element={<VerifiedProtectedRoute />}>
                <Route element={<ApplicationsPanel />}>
                  <Route index element={<AppGroupView />} />
                  <Route path="group/create" element={<CreateAppGroup />} />
                  <Route path="app/:id" element={<AppView />} />
                  <Route path="app/create" element={<CreateApp />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
