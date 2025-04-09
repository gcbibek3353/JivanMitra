'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk"
import { createReport } from "@/actions/report.action";
import Image from "next/image";
import { useFirebase } from "@/firebase/firebaseConfig";


enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

interface SavedMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const Agent = ({ patientName, patientId,summary }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const firebase = useFirebase();

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = {
                    role: message.role,
                    content: message.transcript
                }
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log(`Error: ${error}`);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('error', onError);
        }
    }, []);

    const handleGenerateReport = async (messages: SavedMessage[]) => {
        // TODO : create a server action which calls the gemini AI with messages , generates the report and saves the report to firestore db. 
        // if (generated successfully) redirect user to the report page
        // else redirect to dashboart with the toast message "Failed to generate report"

        try {
            const { success, object } = await createReport({
                patientId: patientId!,
                transcript: messages
            });
            console.log(object);
        
            const res = await firebase.addReportToDb({patientId , report : object });
            console.log(res);
            if(res.success && success) router.push(`/dashboard/report/${res.reportId}`)

            // if (success && reportId) router.push(`/dashboard/report/${reportId}`)
        } catch (error) {
            console.log('failed to generate report');
            router.push('/dashboard');
        }
    }

    useEffect(() => {
        if (callStatus === CallStatus.FINISHED) {
            handleGenerateReport(messages);
        }
    }, [messages, callStatus, patientId]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
            variableValues: {
                patientName, // update userName to patientName in vapi workflow
                patientId,
                summary
            }
        })
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    }

    const latestMessage = messages[messages.length - 1]?.content;
    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

    return (
        <div className="bg-gray-900 text-gray-100 h-screen p-4">
            {/* Main Container - Google Meet Style */}
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                {/* Header Section */}
                <div className="bg-gray-800/80 px-6 py-3 rounded-t-xl border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                        <div className="h-3 w-3 bg-purple-500 rounded-full animate-pulse"></div>
                        AI Doctor Consultation
                    </h2>
                    <div className="flex gap-2">
                        {/* <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 transition">
                            Settings
                        </button> */}
                        {callStatus === CallStatus.ACTIVE ? (
                            <button
                                onClick={handleDisconnect}
                                className="px-3 py-1 bg-red-600 rounded-lg text-sm hover:bg-red-500 transition flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                End Call
                            </button>
                        ) : null}
                    </div>
                </div>

                {/* Video Conference Area */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 bg-gray-800 p-0 overflow-hidden">
                    {/* AI Doctor Section */}
                    <div className="relative bg-gray-900 flex items-center justify-center border-r border-gray-700">
                        <div className="text-center p-6">
                            {/* Large AI Animation */}
                            <div className="relative mx-auto mb-6">
                                    <div className="mx-auto mb-6 relative">
                                        <div className="w-32 h-32 rounded-full border-4 border-gray-600 overflow-hidden shadow-lg">
                                            <Image
                                                src="/AI_Doctor.png"
                                                alt="user"
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {isSpeaking && (
                                        <>
                                            <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-ping opacity-75"></div>
                                            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping opacity-50" style={{ animationDelay: '0.3s' }}></div>
                                        </>
                                    )}
                            </div>

                            <h3 className="text-xl font-bold text-white">AI Doctor</h3>
                            <p className="text-purple-300 text-sm">Consultant </p>

                            {isSpeaking && (
                                <div className="mt-4 flex justify-center gap-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-1 h-6 bg-purple-400 rounded-full animate-wave"
                                            style={{
                                                animationDelay: `${i * 0.1}s`,
                                                animationDuration: '0.8s',
                                                height: `${Math.random() * 12 + 6}px`
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Patient Section */}
                    <div className="relative bg-gray-900 flex items-center justify-center ">
                        <div className="text-center p-6 ">
                            <div className="mx-auto mb-6 relative ">
                                <div className="w-32 h-32 rounded-full border-4 border-gray-600 overflow-hidden shadow-lg">
                                    <Image
                                        src="/patient.png"
                                        alt="user"
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-6 h-6 border-2 border-gray-900"></div>
                            </div>
                            <h3 className="text-xl font-bold text-white">{patientName}</h3>
                            <p className="text-gray-400 text-sm">Patient</p>
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="bg-gray-800/80 px-6 py-4 rounded-b-xl border-t border-gray-700 flex flex-col items-center">
                    {messages.length > 0 && (
                        <div className="w-full max-w-3xl mb-4 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                            <p className="text-gray-300 text-center">
                                {latestMessage}
                            </p>
                        </div>
                    )}

                    {callStatus !== CallStatus.ACTIVE ? (
                        <button
                            onClick={handleCall}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 px-8 rounded-full flex items-center gap-3 transition-all duration-300 shadow-lg shadow-purple-900/20 hover:shadow-purple-600/30"
                        >
                            <div className="relative flex items-center justify-center h-5 w-5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-300"></span>
                            </div>
                            <span className="text-lg">
                                {isCallInactiveOrFinished ? 'Start Consultation' : 'Connecting...'}
                            </span>
                        </button>
                    ) : (
                        <div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Agent