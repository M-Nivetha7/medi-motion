
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FloatingElements from '@/components/FloatingElements';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('doctorData');
    if (userData) {
      setDoctorData(JSON.parse(userData));
    } else {
      navigate('/doctor-auth');
    }

    // Load patients who have logged in
    const patientData = localStorage.getItem('patientData');
    if (patientData) {
      setPatients([JSON.parse(patientData)]);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('doctorData');
    navigate('/');
  };

  const handleDeleteProfile = () => {
    if (confirm('Are you sure you want to delete your profile?')) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('doctorData');
      navigate('/');
    }
  };

  const sendFeedback = (patientEmail: string) => {
    if (feedback.trim()) {
      // In a real app, this would send to backend
      alert(`Feedback sent to ${patientEmail}: ${feedback}`);
      setFeedback('');
    }
  };

  if (!doctorData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen relative p-4">
      <FloatingElements />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome, Dr. {doctorData.name}!</p>
          </div>
          <div className="flex gap-2">
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
                <div className="text-3xl font-bold text-blue-600">{patients.length}</div>
                <div className="text-sm text-gray-600">Active Patients</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24</div>
                <div className="text-sm text-gray-600">Sessions Today</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-gray-600">Avg. Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-600">Alerts</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <Card className="lg:col-span-2 glassmorphism">
            <CardHeader>
              <CardTitle>My Patients</CardTitle>
            </CardHeader>
            <CardContent>
              {patients.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No patients have logged in yet.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Patients who log in will appear here automatically.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {patients.map((patient, index) => (
                    <div key={index} className="p-4 bg-white/50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{patient.name}</h4>
                          <p className="text-sm text-gray-600">{patient.email}</p>
                          <p className="text-sm text-gray-600">
                            Condition: {patient.condition || 'General Therapy'}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">Active</div>
                          <div className="text-xs text-gray-500">Last session: 2h ago</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button 
                          onClick={() => navigate('/reports')} 
                          size="sm" 
                          variant="outline"
                        >
                          📊 View Reports
                        </Button>
                        <Button 
                          onClick={() => navigate('/visualization')} 
                          size="sm" 
                          variant="outline"
                        >
                          📈 Analytics
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Doctor Tools */}
          <div className="space-y-6">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Doctor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <div className="font-medium">Dr. {doctorData.name}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <div className="font-medium">{doctorData.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Specialty</label>
                  <div className="font-medium">{doctorData.specialty || 'Physiotherapy'}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Send Patient Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter feedback for patient..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
                {patients.length > 0 && (
                  <Button 
                    onClick={() => sendFeedback(patients[0].email)} 
                    className="w-full"
                  >
                    Send Feedback
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  📋 Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full">
                  📧 Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  ⚙️ Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
