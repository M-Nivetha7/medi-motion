
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import FloatingElements from '@/components/FloatingElements';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('patientData');
    if (userData) {
      setPatientData(JSON.parse(userData));
    } else {
      navigate('/patient-auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('patientData');
    navigate('/');
  };

  const handleDeleteProfile = () => {
    if (confirm('Are you sure you want to delete your profile?')) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('patientData');
      navigate('/');
    }
  };

  const downloadReport = () => {
    // Create sample report data
    const reportData = {
      patientName: patientData?.name || 'Patient',
      date: new Date().toISOString().split('T')[0],
      exercises: [
        { name: 'Knee Flexion', completed: 15, target: 20, accuracy: 85 },
        { name: 'Shoulder Rotation', completed: 12, target: 15, accuracy: 92 },
        { name: 'Balance Test', completed: 8, target: 10, accuracy: 78 }
      ],
      overallProgress: 85,
      doctorFeedback: 'Great improvement in range of motion. Continue with current exercises.'
    };

    // Create downloadable file
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${patientData?.name || 'patient'}_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!patientData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen relative p-4">
      <FloatingElements />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
            <p className="text-gray-600">Welcome back, {patientData.name}!</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={downloadReport} variant="outline">
              📊 Download Report
            </Button>
            <Button onClick={handleDeleteProfile} variant="destructive">
              🗑️ Delete Profile
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Sessions Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">92%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-600">Active Exercises</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Exercise Tracking */}
          <Card className="lg:col-span-2 glassmorphism">
            <CardHeader>
              <CardTitle>Exercise Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button 
                onClick={() => navigate('/exercise')} 
                className="w-full bg-green-600 hover:bg-green-700 py-4 text-lg"
              >
                📹 Start Exercise Session
              </Button>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Recent Exercises</h4>
                {[
                  { name: 'Knee Flexion', progress: 75, lastSession: '2 hours ago' },
                  { name: 'Shoulder Rotation', progress: 92, lastSession: '1 day ago' },
                  { name: 'Balance Test', progress: 60, lastSession: '3 days ago' }
                ].map((exercise, index) => (
                  <div key={index} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{exercise.name}</span>
                      <span className="text-sm text-gray-600">{exercise.lastSession}</span>
                    </div>
                    <Progress value={exercise.progress} className="h-2" />
                    <div className="text-right text-sm text-gray-600 mt-1">
                      {exercise.progress}% complete
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient Info & Feedback */}
          <div className="space-y-6">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <div className="font-medium">{patientData.name}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <div className="font-medium">{patientData.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Age</label>
                  <div className="font-medium">{patientData.age || 'Not specified'}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Condition</label>
                  <div className="font-medium">{patientData.condition || 'General Therapy'}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Doctor Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    "Excellent progress on your knee rehabilitation exercises. 
                    Your range of motion has improved significantly. Keep up the great work!"
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    - Dr. Smith, 2 days ago
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/reports')} 
                  variant="outline" 
                  className="w-full"
                >
                  📊 View Detailed Reports
                </Button>
                <Button 
                  onClick={() => navigate('/visualization')} 
                  variant="outline" 
                  className="w-full"
                >
                  📈 Signal Visualization
                </Button>
                <Button variant="outline" className="w-full">
                  💬 Contact Doctor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
