'use client'
import { useFirebase } from '@/firebase/firebaseConfig';
import Link from 'next/link';
import React from 'react'

const page = () => {
    const [reports, setReports] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true);
    const { getReportByUserId, loggedInUser } = useFirebase();

    const fetchReports = async () => {
        try {
            const response = await getReportByUserId(loggedInUser?.uid as string);
            // console.log(response.data);
            setReports(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchReports()
    }, [])
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Your Medical Reports
                    </h1>
                    <p className="mt-3 text-xl text-gray-500">
                        View and manage all your medical reports in one place
                    </p>
                </div>

                {reports && reports.length > 0 ? (
                    <div className="space-y-6">
                        {reports.map((report) => (
                            <div 
                                key={report.id} 
                                className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md"
                            >
                                <div className="px-6 py-5">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Report ID: <span className="font-semibold">{report.id}</span>
                                        </h2>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <Link 
                                            href={`/generateReport/report/${report.id}`}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                        >
                                            View Full Report
                                            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No reports found</h3>
                        <p className="mt-1 text-gray-500">You don't have any medical reports yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default page