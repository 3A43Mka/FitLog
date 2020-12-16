import React, { useCallback, useEffect, useState, useContext } from 'react';
import { UsersList } from '../components/UsersList';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { SearchField } from '../components/SearchField';

export const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const { loading, request, error, clearError } = useHttp();
    const message = useMessage();
    const { token } = useContext(AuthContext);

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request('/api/users/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setUsers(fetched.filter((u) => u.role == 'client'));
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => { fetchUsers() }, [fetchUsers])

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setSearch(event.target.value);
    }

    const searchHandler = () => {
        fetchUsersBySearch();
    }

    const enterHandler = (event) => {
        if (event.key === 'Enter') {
        fetchUsersBySearch();
        }
    }

    const fetchUsersBySearch = useCallback(async () => {
        try {
            const fetched = await request('/api/users/bySearch', 'POST', {search}, {
                Authorization: `Bearer ${token}`
            });
            setUsers(fetched.filter((u) => u.role == 'client'));
        } catch (e) {
        }
    }, [request, token, search]);

    if (loading) {
        return <Loader />;
    }


    return (
        <>
            {!loading && (
                <>
                <SearchField changeHandler={changeHandler} searchHandler={searchHandler} search={search} enterHandler={enterHandler}/>
                    <UsersList users={users} />
                    </>
            )}
        </>
    )
}