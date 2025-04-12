'use client'
import { useFirebase } from '@/firebase/firebaseConfig';
import React from 'react'

const page = () => {
    const [reports, setReports] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true);
    const {getReportByUserId , loggedInUser} = useFirebase();

    React.useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getReportByUserId(loggedInUser?.uid as string);
                console.log(response);
                setReports(response.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchReports()
    }, [])
    if (loading) {
        return <div>Loading...</div>
    }

  return (
    <div>reports page </div>
  )
}

export default page