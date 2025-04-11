"use client"
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WaveformAnimation from '@/components/WaveFormAnimation';
import FeatureCard from '@/components/FeatureCard';
import CTAButton from '@/components/CTAbutton';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  Dumbbell, 
  FileText, 
  ArrowDown, 
  Shield, 
  Smartphone,
  CheckCircle
} from 'lucide-react';


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="mt-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,#3b82f620_0,transparent_100%)]" />
        <div className="section-container flex flex-col items-center pt-16 md:pt-24 text-center">
          <div className="animate-pulse bg-health-blue/10 rounded-full px-4 py-1 mb-6 text-health-blue font-medium">
            AI-Powered Health Assistant
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl bg-gradient-to-r from-health-blue via-health-purple to-health-teal bg-clip-text text-transparent">
            Your Personal AI Health Companion for Better Wellness
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-10">
            JivanMitra combines cutting-edge AI with healthcare expertise to provide personalized guidance, fitness routines, and health insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center items-center">
            <Link href="/sign-in"><CTAButton  withArrow className='px-4 py-4 text-sm'  >Get Started</CTAButton></Link>
            <button className="flex items-center justify-center text-gray-600 hover:text-health-blue transition-colors font-medium">
              <a href='#faq'>Learn More</a> <ArrowDown className="ml-2 h-5 w-5" />
            </button>
          </div>
          
          <div className="relative bg-white/30 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-8 border border-white/50 max-w-5xl w-full">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-health-blue text-white px-4 py-1 rounded-full text-sm">
              AI Voice Assistant
            </div>
            <WaveformAnimation className="mb-4" />
            <div className="text-center text-gray-600 italic">
              "How can I help with your health today?"
            </div>
          </div>
          
          <div className="flex justify-center mt-12 gap-8 flex-wrap">
            <div className="flex items-center">
              <CheckCircle className="text-health-blue mr-2 h-5 w-5" />
              <span className="text-gray-700">HIPAA Compliant</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-health-blue mr-2 h-5 w-5" />
              <span className="text-gray-700">24/7 Availability</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-health-blue mr-2 h-5 w-5" />
              <span className="text-gray-700">Personalized Care</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Health Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of healthcare with our intelligent voice assistant
            </p>
          </div>
          <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
              <div className="flex justify-center items-center h-12 mb-6 text-blue-600">
                <img src="voice.svg" alt="Voice svg" width={60} height={60} className="mx-auto mb-4"/>              
              </div>
              <h3 className="flex justify-center items-center text-xl font-semibold mb-3 text-blue-900">Voice-Based Interaction</h3>
              <p className="text-gray-600">Speak naturally — no typing required. Just talk, and Jivan Mitra listens and understands your needs.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
              <div className="flex justify-center items-center h-12 mb-6 text-blue-600">
              <img src="diagnosis.svg" alt="Diagnosis svg" width={60} height={60} className="mx-auto mb-4"/>
              </div>
              <h3 className="flex justify-center items-center text-xl font-semibold mb-3 text-blue-900">Smart Symptom Analysis</h3>
              <p className="text-gray-600">AI-driven insights to help you understand what might be causing your symptoms with high accuracy.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
              <div className="flex justify-center items-center h-12 mb-6 text-blue-600">
              <img src="treatment.svg" alt="Treatment svg" width={60} height={60} className="mx-auto mb-4"/>
              </div>
              <h3 className="flex justify-center items-center text-xl font-semibold mb-3 text-blue-900">Preliminary Treatment Advice</h3>
              <p className="text-gray-600">Get immediate suggestions for what to do next — whether it's rest, medication, or consulting a doctor.</p>
            </div>
          </div>
          </div>
          </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How JivanMitra Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, intuitive, and personalized health guidance
            </p>
          </div>
          <div className='px-4 py-8 md:px-12 lg:px-20'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group relative p-6 rounded-2xl bg-white/10 backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/30 hover:shadow-lg">
              <div className="rounded-full bg-health-blue/10 p-4 mb-4 relative">
                <Smartphone className="w-8 h-8 text-health-blue" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-health-blue text-white flex items-center justify-center font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download & Sign Up</h3>
              <p className="text-gray-600">Get started with a simple account setup providing basic health information.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group relative p-6 rounded-2xl bg-white/10 backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/30 hover:shadow-lg">
              <div className="rounded-full bg-health-purple/10 p-4 mb-4 relative ">
                <Activity className="w-8 h-8 text-health-purple" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-health-purple text-white flex items-center justify-center font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Talk to JivanMitra</h3>
              <p className="text-gray-600">Simply speak to the AI assistant about your health concerns or wellness goals.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group relative p-6 rounded-2xl bg-white/10 backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/30 hover:shadow-lg">
              <div className="rounded-full bg-health-teal/10 p-4 mb-4 relative">
                <Heart className="w-8 h-8 text-health-teal" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-health-teal text-white flex items-center justify-center font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Personalized Care</h3>
              <p className="text-gray-600">Receive tailored health advice, workout routines, and comprehensive reports.</p>
            </div>
          </div>
          </div>
          
          
          <div className="mt-16 flex justify-center ">
            <div className="glass-card p-8 max-w-3xl">
              <div className="flex items-start gap-4 group relative p-6 rounded-2xl bg-white/10 backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/30 hover:shadow-lg">
                <Shield className="text-health-blue w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Your Privacy Is Our Priority</h3>
                  <p className="text-gray-600">
                    We use state-of-the-art encryption and follow strict privacy protocols.<br></br> Your health data always stays private, secure, and under your control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about JivanMitra
            </p>
          </div>
          
          <FAQ />
        </div>
      </section>
      
      {/* CTA Section */}
      
      
      <Footer />
    </div>
  );
};

export default Index;
