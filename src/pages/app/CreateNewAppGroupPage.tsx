import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import Alert from 'react-bootstrap/Alert'
import * as ed from '@noble/ed25519'
import { bin2b64str, b64str2bin } from '../../util/conversions'
import { useCreateAppGroupMutation, changeActiveGroup, useGetAppGroupsQuery } from '../../store/appsSlice'
import { selectToken } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './create-new-app-group.module.scss'

export function CreateNewAppGroupPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const [create, { isError }] = useCreateAppGroupMutation()

  const { refetch } = useGetAppGroupsQuery(token)

  useEffect(() => {
    const privateKey = ed.utils.randomPrivateKey()
    setPrivateKey(bin2b64str(privateKey))
  }, [])

  const copyKey = () => {
    (document.getElementById('private-key-input') as HTMLInputElement).select()
    navigator.clipboard.writeText(privateKey)
  }

  const submit = async () => {
    const publicKey = await ed.getPublicKey(b64str2bin(privateKey))
    const res = await create({ token, name, description, key: bin2b64str(publicKey) })
    await new Promise(r => setTimeout(r, 200))
    await refetch()

    if ('data' in res) {
      dispatch(changeActiveGroup(res.data.id))
      navigate("/")
    }
  }

  return (
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
      <div className="container-fluid max-w-screen-md vstack gap-6">
        <div className="row mb-5">
          <div className="col-md-6 col-12">
            <h2>Create new group</h2>
          </div>
          <div className="col-6 d-none d-md-block text-end">
            <Link to="/"><button type="button" className="btn-close" aria-label="Close"></button></Link>
          </div>
        </div>
        <div className="form-floating">
          <div className="row g-5">

            <div className="col-12">
              <div>
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12">
              <div>
                <label className="form-label" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="private-key-input">Key</label>
              <div className="input-group">
                <textarea
                  id="private-key-input"
                  className="form-control"
                  value={privateKey}
                  onChange={e => setPrivateKey(e.target.value)}
                />
                <span className={`input-group-text ${styles.copy}`} onClick={copyKey}>
                  <i className="bi bi-clipboard"></i>
                </span>
              </div>
            </div>

            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="check-agree" />
                <label className="form-check-label" htmlFor="check-agree">
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
  )
}

export default CreateNewAppGroupPage