'use client'

import { WorkOut } from "@/actions/workout";
import { useEffect, useState } from "react";

const CreateWorkoutPage = () => {
  const [workouts, setWorkouts] = useState<WorkOut[] | null>(null);

  const fetchWorkouts = async () => {
    // logic to fetch all the generated workouts and set the workouts state
  }

  useEffect(() => {
    fetchWorkouts();
  }, [])

  return (
    <div>CreateWorkoutPage
      {/* show all the workouts plan in a pleasant way */}
    </div>
  )
}

export default CreateWorkoutPage