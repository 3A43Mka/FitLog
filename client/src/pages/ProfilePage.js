import React, { useContext, useEffect, useState, useCallback } from 'react';
import { UserCard } from '../components/UserCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const ProfilePage = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [user, setUser] = useState(null);

    const getUser = useCallback(async () => {
        try {

            const fetched = await request(`/api/users/me`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setUser(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {!loading && user && <UserCard user={user} />}
        </>
    )
}