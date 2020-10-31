import React from 'react';

export const UserCard = ({ user }) => {
    return (
        <>
            <h2>Profile</h2>
            <p>Email: {user.email}</p>
            <p>Fullname: {user.fullname}</p>
            <p>Role: <strong>{user.role}</strong></p>
            <p>Registered: <strong>{new Date(user.registered).toLocaleDateString()}</strong></p>
        </>
    )
}