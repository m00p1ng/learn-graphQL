import { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'

import DisplayError from './ErrorMessage';
import Table from './styles/Table'
import SickButton from './styles/SickButton'

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITERMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
]

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: Int!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`

function Permissions() {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return (<p>Loading....</p>)
  }

  return (
    <div>
      <DisplayError error={error} />
      <div>
        <h2>Manage Permissions</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map(user => <User key={user.email} user={user} />)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

function User({ user }) {
  const [permissions, setPermissions] = useState(user?.permissions)

  const [
    updatePermissions,
    { loading: updateLoading, error: updateError, data: updateData }
  ] = useMutation(
    UPDATE_PERMISSIONS_MUTATION,
    {
      variables: {
        permissions,
        userId: user.id,
      },
    }
  );

  const handlePermissionChange = (e) => {
    const checkbox = e.target
    const updatedPermissions = [...permissions]

    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value)
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission != checkbox.value)
    }

    setPermissions(updatedPermissions)
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map(permission => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              type="checkbox"
              checked={permissions.includes(permission)}
              value={permission}
              onChange={handlePermissionChange}
            />
          </label>
        </td>
      ))}
      <td>
        <SickButton
          type="button"
          disabled={updateLoading}
          onClick={() => updatePermissions()}
        >
          Update
        </SickButton>
      </td>
    </tr>
  )
}

export default Permissions