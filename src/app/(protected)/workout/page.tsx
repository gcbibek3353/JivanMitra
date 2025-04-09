'use client'

import { getWorkoutPlan, WorkOut } from "@/actions/workout";
import { useFirebase } from "@/firebase/firebaseConfig";
import { useEffect, useState } from "react";

interface workoutResponse {
  patientId: string;
  workout: WorkOut;
}

const CreateWorkoutPage = () => {
  const [workouts, setWorkouts] = useState<workoutResponse[] | null>(null);
  const [expandedWorkoutIndex, setExpandedWorkoutIndex] = useState<number | null>(null);
  const { addWorkoutToDb, loggedInUser, getWorkoutsByPatientId } = useFirebase();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWorkouts = async () => {
    const res = await getWorkoutsByPatientId(loggedInUser?.uid as string);
    setWorkouts(res);
  }

  useEffect(() => {
    fetchWorkouts();
  }, [])

  const workoutGenerator = async () => {
    setLoading(true);
    try {
      const { success, workout } = await getWorkoutPlan({
        age: '20',
        height: '120',
        weight: '60',
        gender: 'male',
        summary: `John is a 45-year-old male who stands 5 feet 10 inches tall and weighs 210 pounds...`
      });

      const res = await addWorkoutToDb({
        patientId: loggedInUser?.uid as string,
        workout
      });

      if (res.success && success) {
        await fetchWorkouts();
      }
    } catch (error) {
      console.error('Failed to generate workout plan', error);
    }
    finally {
      setLoading(false);
    }
  }

  const toggleExpandWorkout = (index: number) => {
    setExpandedWorkoutIndex(expandedWorkoutIndex === index ? null : index);
  }

  const getExerciseSummary = (exercises: any[]) => {
    return exercises.slice(0, 2).map(ex => ex.name).join(', ') +
      (exercises.length > 2 ? ` +${exercises.length - 2} more` : '');
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Workout Plans</h1>
        <button
          disabled={loading}
          onClick={workoutGenerator}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          {loading ? "Generating" : "Generate New Workout Plan"}
        </button>
      </div>

      {workouts === null ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading your workout plans...</p>
        </div>
      ) : workouts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No workout plans found. Generate your first plan!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {workouts.map((workout, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Workout Plan #{index + 1}
                    </h3>
                    <p className="text-gray-500 mt-1">
                      {workout.workout.total_weekly_minutes} total minutes
                    </p>
                  </div>
                  <button
                    onClick={() => toggleExpandWorkout(index)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {expandedWorkoutIndex === index ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {workout.workout.weekly_schedule.length} days/week
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                    {workout.workout.daily_duration_minutes} mins/day
                  </span>
                </div>

                {expandedWorkoutIndex === index && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-700 mb-3">Weekly Schedule</h4>
                    <div className="grid gap-4">
                      {workout.workout.weekly_schedule.map((day, dayIndex) => (
                        <div key={dayIndex} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="font-medium">{day.day}</h5>
                              <p className="text-sm text-gray-500">{day.focus}</p>
                            </div>
                            <span className="text-sm font-medium">
                              {day.exercises.reduce((sum, ex) => sum + (ex.duration_minutes || 0), 0)} mins
                            </span>
                          </div>

                          {day.exercises.length > 0 && (
                            <div className="mt-3 grid gap-2">
                              <p className="text-sm text-gray-600">
                                Exercises: {getExerciseSummary(day.exercises)}
                              </p>
                              <div className="grid gap-3">
                                {day.exercises.map((exercise, exIndex) => (
                                  <div key={exIndex} className="flex justify-between text-sm pl-4 border-l-2 border-blue-200">
                                    <span className="font-medium">
                                      {exercise.name}
                                    </span>
                                    <div className="flex gap-2 text-gray-500">
                                      {exercise.sets && <span>{exercise.sets} sets</span>}
                                      {exercise.reps && <span>{exercise.reps} reps</span>}
                                      {exercise.duration_minutes && <span>{exercise.duration_minutes} mins</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {day.notes && (
                            <div className="mt-2 text-sm text-gray-600 italic">
                              Notes: {day.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {workout.workout.notes && (
                      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                        <h5 className="text-sm font-medium text-yellow-800">Plan Notes</h5>
                        <p className="mt-1 text-sm text-yellow-700">{workout.workout.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CreateWorkoutPage