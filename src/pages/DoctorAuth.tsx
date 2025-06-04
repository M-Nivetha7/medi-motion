
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FloatingElements from '@/components/FloatingElements';

const DoctorAuth = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    specialty: '',
    license: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Doctor login:', loginData);
    // Store doctor data in localStorage for demo
    localStorage.setItem('userRole', 'doctor');
    localStorage.setItem('doctorData', JSON.stringify({
      name: loginData.email.split('@')[0],
      email: loginData.email,
      specialty: 'Physiotherapy'
    }));
    navigate('/doctor-dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Doctor signup:', signupData);
    localStorage.setItem('userRole', 'doctor');
    localStorage.setItem('doctorData', JSON.stringify(signupData));
    navigate('/doctor-dashboard');
  };

  const handleGoogleAuth = () => {
    console.log('Google authentication for doctor');
    // Mock Google auth
    localStorage.setItem('userRole', 'doctor');
    localStorage.setItem('doctorData', JSON.stringify({
      name: 'Dr. Google User',
      email: 'doctor@gmail.com',
      specialty: 'Physiotherapy'
    }));
    navigate('/doctor-dashboard');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <FloatingElements />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="mb-4 text-blue-600 hover:text-blue-700"
          >
            ← Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Portal</h1>
          <p className="text-gray-600">Access your professional dashboard</p>
        </div>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-center text-gray-800">👨‍⚕️ Doctor Access</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Doctor Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Login as Doctor
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Medical Specialty"
                    value={signupData.specialty}
                    onChange={(e) => setSignupData({ ...signupData, specialty: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Medical License Number"
                    value={signupData.license}
                    onChange={(e) => setSignupData({ ...signupData, license: e.target.value })}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Sign Up as Doctor
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <Button 
                onClick={handleGoogleAuth}
                variant="outline" 
                className="w-full mt-4 border-gray-300 hover:bg-gray-50"
              >
                <span className="mr-2">🔍</span>
                Continue with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorAuth;
