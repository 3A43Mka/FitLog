import React, { useCallback, useEffect, useState, useContext } from 'react';
import { UsersList } from '../components/UsersList';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const {loading, request, error, clearError} = useHttp();
    const message = useMessage();
    const {token} = useContext(AuthContext);

    const fetchUsers = useCallback( async () => {
        try {
            const fetched = await request('/api/users/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setUsers(fetched);
            console.log(fetched);
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {fetchUsers()}, [fetchUsers])

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    if (loading) {
        return <Loader />;
    }


    return (
        <>
        {!loading && <UsersList users={users} />}
        </>
    )
}