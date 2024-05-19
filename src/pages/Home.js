import { useEffect} from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// components
import WorkoutsDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () =>{
    const {workouts, dispatch} = useWorkoutsContext();
    useEffect(()=>{
        const fetchWorkouts = async () =>{
            const response = await fetch('https://workout-buddy-api-r4h7.onrender.com/api/workouts')
            const json = await response.json();

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json })
            }
        }
        fetchWorkouts(); 
    }, [dispatch])

    
    return (
        <div className="home">
            <div className="workouts">
                {/* {workouts && workouts.map((workout)=>(
                    <WorkoutsDetails key={workout._id} workout={workout}/>
                ))} */}
                {workouts ? workouts.map((workout)=>(
                    <WorkoutsDetails key={workout._id} workout={workout}/>
                )):<div>Loading ...</div>}
            </div>
            <WorkoutForm/>
        </div>
    )
}
export default Home