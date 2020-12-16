import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ClientCard } from '../components/ClientCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const ClientDetailPage = () => {
    const { token, userId, userRole } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [client, setClient] = useState(null);
    const [trainer, setTrainer] = useState(null);
    const [isMyClient, setIsMyClient] = useState(false);
    const [program, setProgram] = useState('');
    const [newProgramText, setNewProgramText] = useState('');
    const [doEditProgram, setDoEditProgram] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [newNotificationText, setNewNotificationText] = useState('');
    const [doAddNotification, setDoAddNotification] = useState(false);
    const [lastVisit, setLastVisit] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [visits, setVisits] = useState([]);
    const [exercises, setExercises] = useState([]);
    const clientId = useParams().id;


    const data = 
        exercises.map(e => {
            return(
                {name: e.title, score: e.quantity*e.weights}
            )
        });
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

    const getTrainer = useCallback(async () => {
        try {
            const fetched = await request(`/api/links/gettrainer`, 'POST', {client: clientId}, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                setTrainer(fetched);
                if (fetched._id === userId) {
                    setIsMyClient(true);
                }
            }
        } catch (e) {

        }
    }, [token, request, clientId, userId]);

    const addTrainer = useCallback(async () => {
        try {
            const fetched = await request(`/api/links/addtrainer`, 'POST', {client: clientId, trainer: userId}, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                getTrainer();
            }
        } catch (e) {

        }
    }, [token, request, clientId, userId, getTrainer]);

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

    const getTemplates = useCallback(async () => {
        try {
            const fetched = await request(`/api/templates`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            if (fetched){
                setTemplates(fetched);
            }
        } catch (e) {

        }
    }, [token, request, setTemplates]);

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
            if (!newNotificationText){
                return;
            }
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

    const getExercises = useCallback(async () => {
        try {
            const fetched = await request(`/api/exercises/getexercises`, 'POST', {client: clientId }, {
                Authorization: `Bearer ${token}`
            });
            setExercises(fetched);
        } catch (e) {

        }
    }, [token, request, setExercises, clientId]);

    const getVisits = useCallback(async () => {
        try {
            const fetched = await request(`/api/logs/getvisits`, 'POST', {client: clientId }, {
                Authorization: `Bearer ${token}`
            });
            console.log(fetched);
            setVisits(fetched);
        } catch (e) {

        }
    }, [token, request, setVisits, clientId]);

    const changeNewProgramTextHandler = event => {
        setNewProgramText(event.target.value);
    }

    const selectTemplateHandler = event => {
        setSelectedTemplate(event.target.value);
    }

    const insertTemplate = event => {
        const newText = newProgramText + "\n" + templates[selectedTemplate].text;
        setNewProgramText(newText);
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
        getTrainer();
        getTemplates();
        getExercises();
        getVisits();
    }, [getClient, getProgram, getNotifications, getLastVisit, getTrainer, getTemplates, getExercises, getVisits]);

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
            trainer={trainer}
            addTrainer={addTrainer}
            isMyClient={isMyClient}
            
            templates={templates}
            selectTemplateHandler={selectTemplateHandler}
            insertTemplate={insertTemplate}

            userRole={userRole}
            visits={visits}
            data={data}
            />}
        </>
    )
}