import React from 'react';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
export const UsersList = ({ users }) => {
  if (!users.length) {
    return <h2 className="center">No users found</h2>
  }
  return (
<Table className="mt-3" striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Fullname</th>
      <th>Email</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
      {users.map((user, index) => {
          return (
            <tr key={user._id}>
              <td>{index + 1}</td>
          <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td><Link to={`/client/${user._id}`} >Открыть</Link></td>
            </tr>
          )
        })}
  </tbody>
</Table>


    
    // <table>
    //   <thead>
    //     <tr>
    //       <th>№</th>
    //       <th>Fullname</th>
    //       <th>Email</th>
    //       <th>Details</th>
    //     </tr>
    //   </thead>

    //   <tbody>
    //     {users.map((user, index) => {
    //       return (
    //         <tr key={user._id}>
    //           <td>{index + 1}</td>
    //       <td>{user.fullname}</td>
    //       <td>{user.email}</td>
    //       <td><Link to={`/detail/${user._id}`} >Открыть</Link></td>
    //         </tr>
    //       )
    //     })}
    //   </tbody>
    // </table>
  )
}