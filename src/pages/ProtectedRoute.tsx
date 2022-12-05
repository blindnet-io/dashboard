import { Navigate, Outlet } from 'react-router-dom'
import { selectToken } from '../store/authSlice'
import { useAppSelector } from '../store/hooks'

const ProtectedRoute = () => {
  const token = useAppSelector(selectToken)

  return token
    ? <Outlet />
    : <Navigate to="/login" />
}

export default ProtectedRoute
