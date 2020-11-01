import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ClientCard } from '../components/ClientCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const ClientDetailPage = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [client, setClient] = useState(null);
    const clientId = useParams().id;

    const getClient = useCallback(async () => {
        try {
            const fetched = await request(`/api/users/${clientId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            console.log(fetched);
            setClient(fetched);
        } catch (e) {

        }
    }, [token, request, clientId]);

    useEffect(() => {
        getClient();
    }, [getClient]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {!loading && client && <ClientCard client={client} />}
        </>
    )
}