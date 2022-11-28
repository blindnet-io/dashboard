import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useGetInfoQuery } from '../../store/apiSlice'
import { selectToken } from '../../store/authSlice'

export function AppsPage() {
  const { id } = useParams()

  const token = useSelector(selectToken)

  return (
    <>
      app {id}
    </>
  )
}

export default AppsPage