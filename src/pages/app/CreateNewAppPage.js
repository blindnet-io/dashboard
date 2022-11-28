import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import Alert from 'react-bootstrap/Alert'
import * as ed from '@noble/ed25519'
import { bin2b64str, b64str2bin } from '../../util/conversions'
import {
  useCreateAppMutation,
  useGetAppGroupsQuery,
  selectActiveGroup
} from '../../store/appsSlice'
import { selectToken } from '../../store/authSlice'

export function CreateNewApp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(selectToken)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [create, creteAppState] = useCreateAppMutation()

  const { refetch } = useGetAppGroupsQuery(token)

  const activeGroup = useSelector(selectActiveGroup(token))

  const submit = async () => {
    const res = await create({ token, group: activeGroup.id, name, description })
    await new Promise(r => setTimeout(r, 200))
    await refetch()
    navigate("/")
  }

  return (
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
      <div className="container-fluid max-w-screen-md vstack gap-6">
        <div>
          <div className="mb-5">
            <h2>Create new group</h2>
          </div>
          <div className="form-floating">
            <div className="row g-5">

              <div className="col-12">
                <div>
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12">
                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="check-primary-address" id="check-primary-address" />
                  <label className="form-check-label" htmlFor="check-primary-address">
                    Agree
                  </label>
                </div>
              </div>

              {creteAppState.isError &&
                <Alert variant="danger">
                  Error
                </Alert>
              }

              <div className="col-12 text-end">
                <Link to="/" className="btn btn-sm btn-neutral me-2">Cancel</Link>
                <button type="submit" onClick={submit} className="btn btn-sm btn-primary">Save</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewApp