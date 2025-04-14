'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { interviewer, vapi } from "@/lib/vapi.sdk"
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

const Agent = ({ patientName, type, patientId, summary }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const firebase = useFirebase();

    // console.log(JSON.parse(summary));

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

        try {
            const { success, object } = await createReport({
                patientId: patientId!,
                transcript: messages
            });
            // console.log(object);

            const res = await firebase.addReportToDb({ patientId, report: object });
            // console.log(res);
            if (res.success && success) router.push(`/generateReport/report/${res.reportId}`)

            // if (success && reportId) router.push(`/dashboard/report/${reportId}`)
        } catch (error) {
            console.log('failed to generate report');
            router.push('/dashboard');
        }
    }

    useEffect(() => {
        if (callStatus === CallStatus.FINISHED) {
            if (type === "query") {
                router.push('/dashboard');
            }
            else handleGenerateReport(messages);
        }
    }, [messages, callStatus, type, patientId]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        if (type === "query") {
            const jsonSummary = JSON.parse(summary);
            
            const params = {
                age: jsonSummary.age,
                height: jsonSummary.height,
                gender: jsonSummary.gender,
                weight: jsonSummary.weight,
                sickness: jsonSummary['0']?.sickness ?? '',
                dosage: jsonSummary['0']?.medications?.[0]?.dosage ?? '',
                medicationName: jsonSummary['0']?.medications?.[0]?.name ?? '',
                times: jsonSummary['0']?.medications?.[0]?.times?.join(", ") ?? ''
              };
            
            await vapi.start(interviewer, {
                variableValues: {
                    params: params
                }
            })
        }
        else {
            await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
                variableValues: {
                    patientName, // update userName to patientName in vapi workflow
                    patientId,
                    summary
                }
            })
        }
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    }

    const latestMessage = messages[messages.length - 1]?.content;
    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

    return (
        <div className="bg-gray-50 text-gray-800 h-screen p-4">
            {/* Main Container - Modern Medical Style */}
            <div className="max-w-7xl mx-auto h-full flex flex-col shadow-lg rounded-xl border border-gray-200 bg-white overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-cyan-700 flex items-center gap-2">
                        {callStatus === CallStatus.ACTIVE && (
                            <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        )}
                        <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                            </svg>
                            JivanMitra Doctor
                        </span>
                    </h2>
                    <div className="flex gap-2">
                        {callStatus === CallStatus.ACTIVE && (
                            <button
                                onClick={handleDisconnect}
                                className="px-4 py-2 bg-gradient-to-br from-red-50 to-red-100 text-red-600 rounded-lg text-sm hover:from-red-100 hover:to-red-50 transition flex items-center gap-2 border border-red-100 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                End Call
                            </button>
                        )}
                    </div>
                </div>

                {/* Video Conference Area */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 p-0 overflow-hidden">
                    {/* AI Doctor Section */}
                    <div className="relative bg-white/80 backdrop-blur-sm flex items-center justify-center border-r border-gray-100">
                        <div className="text-center p-6">
                            {/* AI Doctor Avatar */}
                            <div className="relative mx-auto mb-6">
                                <div className="mx-auto mb-6 relative">
                                    <div className="w-32 h-32 rounded-full border-[3px] border-cyan-100 overflow-hidden shadow-md bg-white">
                                        <Image
                                            src="/AI_Doctor.png"
                                            alt="AI Doctor"
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-cyan-500 rounded-full w-7 h-7 border-[3px] border-white flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                {isSpeaking && (
                                    <>
                                        <div className="absolute inset-0 rounded-full border-4 border-cyan-200/40 animate-ping opacity-75"></div>
                                        <div className="absolute inset-0 rounded-full border-4 border-cyan-100/30 animate-ping opacity-50" style={{ animationDelay: '0.3s' }}></div>
                                    </>
                                )}
                            </div>

                            <h3 className="text-xl font-semibold text-gray-800">AI Doctor</h3>
                            <p className="text-cyan-600 text-sm font-medium">Medical Consultant</p>

                            {isSpeaking && (
                                <div className="mt-4 flex justify-center gap-1.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 h-6 bg-gradient-to-t from-cyan-400 to-cyan-500 rounded-full animate-wave"
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
                    <div className="relative bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center p-6">
                            <div className="mx-auto mb-6 relative">
                                <div className="w-32 h-32 rounded-full border-[3px] border-blue-100 overflow-hidden shadow-md bg-white">
                                    <Image
                                        src="/patient.png"
                                        alt="Patient"
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full w-7 h-7 border-[3px] border-white flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{patientName}</h3>
                            <p className="text-blue-600 text-sm font-medium">Patient</p>
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-5 border-t border-gray-100 flex flex-col items-center">
                    {messages.length > 0 && (
                        <div className="w-full max-w-3xl mb-4 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <p className="text-gray-700 text-center font-medium">
                                {latestMessage}
                            </p>
                        </div>
                    )}

                    {callStatus !== CallStatus.ACTIVE ? (
                        <button
                            onClick={handleCall}
                            className="relative bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-8 rounded-full flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <div className="relative flex items-center justify-center h-5 w-5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </div>
                            <span className="text-lg">
                                {isCallInactiveOrFinished ? (type === 'query' ? 'Start Consultation' : 'Start Call') : 'Connecting...'}
                            </span>
                        </button>
                    ) : (
                        <div className="h-12"></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Agent