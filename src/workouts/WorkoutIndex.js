import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import WorkoutCreate from './WorkoutCreate'
import WorkoutTable from './WorkoutTable'
import WorkoutEdit from './WorkoutEdit'

function WorkoutIndex(props) {
    const [workouts, setWorkouts] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [workoutToUpdate, setWorkoutToUpdate] = useState({});

    const editUpdateWorkout = (workout) => {
        setWorkoutToUpdate(workout);
        console.log(workout);
    }

    const updateOn = () => {
        setUpdateActive(true)
    }

    const updateOff = () => {
        setUpdateActive(false)
    }

    const fetchWorkouts = () => {
        fetch('http://localhost:4000/api/log',{
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(res => res.json())
        .then(logData => {setWorkouts(logData)
            console.log(logData)})
    }

    useEffect(() => {
        fetchWorkouts()
    }, [])

    return (
        <Container>
            <Row>
                <Col md="3">
                    <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
                </Col>
                <Col md="9">
                    <h2>Log a Workout to see a table. This will be added in later pages.</h2>
                    <WorkoutTable
                        workouts={workouts}
                        fetchWorkouts={fetchWorkouts}
                        token={props.token}
                        editUpdateWorkout={editUpdateWorkout}
                        updateOn={updateOn}
                    />
                </Col>
                {
                    updateActive
                    ?
                    <WorkoutEdit workoutToUpdate={workoutToUpdate} updateOff={updateOff} token={props.token} fetchWorkouts={fetchWorkouts} />
                    :
                    null
                }
            </Row>
        </Container>
    )
}

export default WorkoutIndex
