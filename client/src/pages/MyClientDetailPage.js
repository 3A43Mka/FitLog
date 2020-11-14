import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MyClientCard } from '../components/MyClientCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const MyClientDetailPage = () => {
    const { token, userId } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [client, setClient] = useState(null);
    const [program, setProgram] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [newNotificationText, setNewNotificationText] = useState('');
    const [doAddNotification, setDoAddNotification] = useState(false);
    const [lastVisit, setLastVisit] = useState(null);
    const [trainer, setTrainer] = useState(null);
    const clientId = useParams().id;

    const getClient = useCallback(async () => {
        try {
            const fetched = await request(`/api/users/${userId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setClient(fetched);
        } catch (e) {

        }
    }, [token, request, userId]);

    const getTrainer = useCallback(async () => {
        try {
            const fetched = await request(`/api/links/gettrainer`, 'POST', {client: userId}, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                setTrainer(fetched);
            }
        } catch (e) {

        }
    }, [token, request, userId]);

    const getProgram = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/getprogram`, 'POST', {client: userId}, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                setProgram(fetched.comment);
            }
        } catch (e) {

        }
    }, [token, request, userId]);

    const getNotifications = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/getnotifications`, 'POST', {client: userId}, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                setNotifications(fetched);
            }
        } catch (e) {

        }
    }, [token, request, userId]);

    const getLastVisit = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/getlastvisit`, 'POST', {client: userId}, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                setLastVisit(fetched.date);
            }
        } catch (e) {

        }
    }, [token, request, userId]);

    
    const registerVisitHandler = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/registervisit`, 'POST', {client: userId, trainer: trainer }, {
                Authorization: `Bearer ${token}`
            });
            getLastVisit();
        } catch (e) {
            
        }
    }, [token, request, userId, trainer, getLastVisit]);

    const addNotification = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/sendnotification`, 'POST', {client: userId, comment: newNotificationText, clientToTrainer: true }, {
                Authorization: `Bearer ${token}`
            });
            setDoAddNotification(false);
            setNewNotificationText('');
            getNotifications();
        } catch (e) {
            
        }
    }, [token, request, userId, newNotificationText, getNotifications]);


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
        getTrainer();
        getProgram();
        getNotifications();
        getLastVisit();
    }, [getClient, getProgram, getNotifications, getLastVisit, getTrainer]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {!loading && client && <MyClientCard client={client}
            program={program}
            startNotificationHandler={startNotificationHandler}
            endNotificationHandler={endNotificationHandler}
            doAddNotification={doAddNotification}
            notifications={notifications}
            newNotificationText={newNotificationText}
            changeNewNotificationTextHandler={changeNewNotificationTextHandler}
            addNotification={addNotification}

            lastVisit={lastVisit}
            registerVisitHandler={registerVisitHandler}
            trainer={trainer}
            />}
        </>
    )
}