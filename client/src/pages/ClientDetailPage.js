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
    const [program, setProgram] = useState('');
    const [newProgramText, setNewProgramText] = useState('');
    const [doEditProgram, setDoEditProgram] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [newNotificationText, setNewNotificationText] = useState('');
    const [doAddNotification, setDoAddNotification] = useState(false);
    const [lastVisit, setLastVisit] = useState(null);
    const clientId = useParams().id;

    const getClient = useCallback(async () => {
        try {
            const fetched = await request(`/api/users/${clientId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setClient(fetched);
        } catch (e) {

        }
    }, [token, request, clientId]);

    const getProgram = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/getprogram`, 'POST', {client: clientId}, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                setProgram(fetched.comment);
                setNewProgramText(fetched.comment);
            }
        } catch (e) {

        }
    }, [token, request, clientId]);

    const getNotifications = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/getnotifications`, 'POST', {client: clientId}, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                setNotifications(fetched);
            }
        } catch (e) {

        }
    }, [token, request, clientId]);

    const getLastVisit = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/getlastvisit`, 'POST', {client: clientId}, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                setLastVisit(fetched.date);
            }
        } catch (e) {

        }
    }, [token, request, clientId]);

    const addProgram = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/createprogram`, 'POST', {client: clientId, comment: newProgramText }, {
                Authorization: `Bearer ${token}`
            });
            setDoEditProgram(false); 
            getClient();
            getProgram();
        } catch (e) {
            
        }
    }, [token, request, clientId, getClient, getProgram, newProgramText]);


    const addNotification = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/sendnotification`, 'POST', {client: clientId, comment: newNotificationText }, {
                Authorization: `Bearer ${token}`
            });
            setDoAddNotification(false);
            setNewNotificationText('');
            getClient();
            getProgram();
            getNotifications();
        } catch (e) {
            
        }
    }, [token, request, clientId, getClient, getProgram, newNotificationText, getNotifications]);

    const changeNewProgramTextHandler = event => {
        setNewProgramText(event.target.value);
    }

    const startEditHandler = () => {
        setDoEditProgram(true);
    }

    const endEditHandler = () => {
        setDoEditProgram(false);
    }

    const startNotificationHandler = () => {
        setDoAddNotification(true);
    }

    const endNotificationHandler = () => {
        setDoAddNotification(false);
    }

    const changeNewNotificationTextHandler = event => {
        setNewNotificationText(event.target.value);
    }

    useEffect(() => {
        getClient();
        getProgram();
        getNotifications();
        getLastVisit();
    }, [getClient, getProgram, getNotifications, getLastVisit]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {!loading && client && <ClientCard client={client}
            program={program}
            doEditProgram={doEditProgram}
            addProgram={addProgram}
            changeNewProgramTextHandler={changeNewProgramTextHandler}
            newProgramText={newProgramText}
            startEditHandler={startEditHandler}
            endEditHandler={endEditHandler}

            startNotificationHandler={startNotificationHandler}
            endNotificationHandler={endNotificationHandler}
            doAddNotification={doAddNotification}
            notifications={notifications}
            newNotificationText={newNotificationText}
            changeNewNotificationTextHandler={changeNewNotificationTextHandler}
            addNotification={addNotification}

            lastVisit={lastVisit}
            />}
        </>
    )
}