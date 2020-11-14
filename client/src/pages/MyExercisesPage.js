import React, { useContext, useEffect, useState, useCallback } from 'react';
import { CreateExercise } from '../components/CreateExercise';
import { Loader } from '../components/Loader';
import { ExercisesList } from '../components/ExercisesList';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import {Row, Col} from 'react-bootstrap';

export const MyExercisesPage = () => {
    const { token, userId } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [exercises, setExercises] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [newWeights, setNewWeights] = useState('');


    const getExercises = useCallback(async () => {
        try {
            const fetched = await request(`/api/exercises/getexercises`, 'POST', {client: userId }, {
                Authorization: `Bearer ${token}`
            });
            setExercises(fetched);
        } catch (e) {

        }
    }, [token, request, setExercises, userId]);

    const addExercise = useCallback(async () => {
        try {
            const fetched = await request(`/api/exercises/addexercise`, 'POST', {client: userId, title: newTitle, quantity: newQuantity, weights: newWeights}, {
                Authorization: `Bearer ${token}`
            });
            getExercises()
        } catch (e) {

        }
    }, [token, newTitle, newQuantity, newWeights, getExercises, request, userId]);

    const changeNewTitleHandler = event => {
        console.log(event.target.value);
        setNewTitle(event.target.value);
    }

    const changeNewQuantityHandler = event => {
        console.log(event.target.value);
        setNewQuantity(event.target.value);
    }

    const changeNewWeightsHandler = event => {
        console.log(event.target.value);
        setNewWeights(event.target.value);
    }

    useEffect(() => {
        getExercises();
    }, [getExercises]);

    if (loading) {
        return <Loader />;
    }
    return (
        <>
        <Row className="mt-3">
            <Col>
            <h1>My Exercise Templates</h1>
            </Col>
        </Row>
            {!loading &&  <CreateExercise 
            newTitle={newTitle}
            newQuantity={newQuantity}
            newWeights={newWeights}
            addExercise={addExercise}
            changeNewTitleHandler={changeNewTitleHandler}
            changeNewQuantityHandler={changeNewQuantityHandler}
            changeNewWeightsHandler={changeNewWeightsHandler}/>}
            {!loading && <ExercisesList exercises={exercises} />}
        </>
    )
}