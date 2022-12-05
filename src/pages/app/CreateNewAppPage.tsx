import React, { useEffect, useId, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function CreateNewApp() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)
  const activeGroup = useAppSelector(selectActiveGroup(token!))

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [create, { isError }] = useCreateAppMutation()
  const { refetch } = useGetAppGroupsQuery(token)

  const id = useId()

  const submit = async () => {
    const res = await create({ token, group: activeGroup!.id, name, description })
    await new Promise(r => setTimeout(r, 200))
    await refetch()
    navigate("/")
  }

  return (
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
      <div className="container-fluid max-w-screen-md vstack gap-6">
        <div>
          <div className="row mb-5">
            <div className="col-md-6 col-12">
              <h2>Create new application</h2>
            </div>
            <div className="col-6 d-none d-md-block text-end">
              <Link to="/"><button type="button" className="btn-close" aria-label="Close"></button></Link>
            </div>
          </div>
          <div className="form-floating">
            <div className="row g-5">

              <div className="col-12">
                <div>
                  <label className="form-label" htmlFor={`${id}-name`}>Name</label>
                  <input
                    type="text"
                    id={`${id}-name`}
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12">
                <div>
                  <label className="form-label" htmlFor={`${id}-description`}>Description</label>
                  <textarea
                    id={`${id}-description`}
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id={`${id}-agree-check`} />
                  <label className="form-check-label" htmlFor={`${id}-agree-check`}>
                    Agree
                  </label>
                </div>
              </div>

              {isError &&
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