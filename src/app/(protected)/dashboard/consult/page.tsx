import Agent from '@/components/Agent'
import React from 'react'

const ConsultPage = () => {
  return (
    <div>
      <h2>Patient Interact with Doctor </h2>
        <Agent patientName={"Rajesh"} />
        {/* This will contain the core logic of user interacting with AI */}
    </div>
  )
}

export default ConsultPage