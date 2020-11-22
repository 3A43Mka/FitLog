import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Table} from 'react-bootstrap';
export const UsersList = ({ users }) => {

  const history = useHistory();
const [userId, setUserId] = useState(null);

  const clickHandle = (id) => {
    setUserId(id);
  }

  useEffect(() => {
    if (userId){
      history.push(`/client/${userId}`);
    }
}, [userId, history]);



  if (!users.length) {
    return <h2 className="text-center mt-3">Користувачів не знайдено</h2>
  }
    return (
<Table className="mt-3" striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Ім'я</th>
      <th>Електроона пошта</th>
      <th>Роль</th>
    </tr>
  </thead>
  <tbody>
      {users.map((user, index) => {
          return (
            <tr onClick={() => clickHandle(user._id)} key={user._id}>
              <td>{index + 1}</td>
          <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
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