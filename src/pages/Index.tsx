
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingElements from '@/components/FloatingElements';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <FloatingElements />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo and Title */}
        <div className="mb-12 fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 medical-gradient rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">M</span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
            MediMotion
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced AI-powered physiotherapy tracking and patient monitoring platform
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="glassmorphism hover:bg-white/20 transition-all duration-300 transform hover:scale-105 fade-in-up stagger-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">👨‍⚕️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Doctor Portal</h3>
              <p className="text-gray-600 mb-6">
                Monitor patients, analyze exercise data, and provide professional feedback
              </p>
              <Button 
                onClick={() => navigate('/doctor-auth')} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300"
              >
                Access Doctor Portal
              </Button>
            </CardContent>
          </Card>

          <Card className="glassmorphism hover:bg-white/20 transition-all duration-300 transform hover:scale-105 fade-in-up stagger-2">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Patient Portal</h3>
              <p className="text-gray-600 mb-6">
                Perform exercises, track progress, and view your health analytics
              </p>
              <Button 
                onClick={() => navigate('/patient-auth')} 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all duration-300"
              >
                Access Patient Portal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 fade-in-up stagger-3">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">AI Analytics</h4>
            <p className="text-sm text-gray-600">Advanced machine learning for movement analysis</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📹</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Live Tracking</h4>
            <p className="text-sm text-gray-600">Real-time pose detection and movement monitoring</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Smart Reports</h4>
            <p className="text-sm text-gray-600">Automated report generation and insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
