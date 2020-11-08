import React, { useContext, useEffect, useState, useCallback } from 'react';
import { CreateTemplate } from '../components/CreateTemplate';
import { Loader } from '../components/Loader';
import { TemplatesList } from '../components/TemplatesList';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import {Row, Col} from 'react-bootstrap';

export const TemplatesPage = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [user, setUser] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [newTemplateText, setNewTemplateText] = useState('');
    const [newTemplateTitle, setNewTemplateTitle] = useState('');

    const getTemplates = useCallback(async () => {
        try {
            const fetched = await request(`/api/templates/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setTemplates(fetched);
        } catch (e) {

        }
    }, [token, request, setTemplates]);

    const addTemplate = useCallback(async () => {
        try {
            const fetched = await request(`/api/templates/`, 'POST', {text: newTemplateText, title: newTemplateTitle}, {
                Authorization: `Bearer ${token}`
            });
            getTemplates()
        } catch (e) {

        }
    }, [token, newTemplateText, newTemplateTitle, request, getTemplates]);

    const changeNewTeplateHandler = event => {
        console.log(event.target.value);
        setNewTemplateText(event.target.value);
    }

    const changeNewTitleHandler = event => {
        console.log(event.target.value);
        setNewTemplateTitle(event.target.value);
    }

    useEffect(() => {
        getTemplates();
    }, [getTemplates]);

    if (loading) {
        return <Loader />;
    }
///addTemplate, newTemplateText, changeNewTeplateHandler, changeNewTitleHandler, newTemplateTitle
    return (
        <>
        <Row className="mt-3">
            <Col>
            <h1>My Exercise Templates</h1>
            </Col>
        </Row>
            {!loading &&  <CreateTemplate 
            newTemplateText={newTemplateText}
            newTemplateTitle={newTemplateTitle}
            addTemplate={addTemplate}
            changeNewTeplateHandler={changeNewTeplateHandler}
            changeNewTitleHandler={changeNewTitleHandler} />}
            {!loading && <TemplatesList templates={templates} />}
        </>
    )
}