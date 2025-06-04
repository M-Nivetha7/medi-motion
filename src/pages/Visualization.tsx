
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import FloatingElements from '@/components/FloatingElements';

const Visualization = () => {
  const navigate = useNavigate();
  const [realtimeData, setRealtimeData] = useState<any[]>([]);

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        heartRate: 70 + Math.random() * 30,
        accuracy: 80 + Math.random() * 20,
        movement: Math.random() * 100,
        timestamp: Date.now()
      };
      
      setRealtimeData(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-20); // Keep only last 20 points
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sample historical data
  const progressData = [
    { date: '2024-01-01', accuracy: 65, sessions: 2 },
    { date: '2024-01-07', accuracy: 72, sessions: 5 },
    { date: '2024-01-14', accuracy: 78, sessions: 7 },
    { date: '2024-01-21', accuracy: 85, sessions: 8 },
    { date: '2024-01-28', accuracy: 92, sessions: 10 },
  ];

  const exerciseComparison = [
    { exercise: 'Knee Flexion', completed: 85, target: 100 },
    { exercise: 'Shoulder Rotation', completed: 92, target: 100 },
    { exercise: 'Balance Test', completed: 78, target: 100 },
    { exercise: 'Arm Raise', completed: 88, target: 100 },
  ];

  return (
    <div className="min-h-screen relative p-4">
      <FloatingElements />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Signal Visualization</h1>
            <p className="text-gray-600">Real-time analytics and progress tracking</p>
          </div>
          <Button onClick={() => navigate(-1)} variant="outline">
            ← Back
          </Button>
        </div>

        {/* Real-time Metrics */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Real-time Movement Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={realtimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="movement" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Physiological Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={realtimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Progress Analysis */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sessions" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Exercise Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={exerciseComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="exercise" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" />
                  <Bar dataKey="target" fill="#e5e7eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ML Predictions */}
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>AI-Powered Predictions & Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">94%</div>
                <div className="text-sm text-gray-600 mt-2">Recovery Prediction</div>
                <div className="text-xs text-gray-500 mt-1">Based on current progress</div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">12 days</div>
                <div className="text-sm text-gray-600 mt-2">Estimated Completion</div>
                <div className="text-xs text-gray-500 mt-1">Current exercise program</div>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">A+</div>
                <div className="text-sm text-gray-600 mt-2">Performance Grade</div>
                <div className="text-xs text-gray-500 mt-1">Compared to similar cases</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">AI Analysis Summary</h4>
              <p className="text-sm text-gray-700">
                Machine learning algorithms have analyzed your movement patterns and predict excellent recovery outcomes. 
                Your consistency in exercises shows a 94% probability of meeting your recovery goals within the estimated timeframe. 
                The system recommends maintaining current exercise intensity while gradually increasing range of motion challenges.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Visualization;
