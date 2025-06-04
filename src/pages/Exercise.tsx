
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FloatingElements from '@/components/FloatingElements';

const Exercise = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentExercise, setCurrentExercise] = useState('Knee Flexion');
  const [exerciseData, setExerciseData] = useState({
    duration: 0,
    accuracy: 0,
    repetitions: 0
  });
  const [posePoints, setPosePoints] = useState<Array<{x: number, y: number, id: string}>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setExerciseData(prev => ({
          ...prev,
          duration: prev.duration + 1,
          accuracy: Math.min(100, prev.accuracy + Math.random() * 2),
          repetitions: Math.floor(prev.duration / 5)
        }));

        // Simulate pose detection points
        const newPoints = [
          { x: 200 + Math.random() * 50, y: 150 + Math.random() * 30, id: 'head' },
          { x: 200 + Math.random() * 50, y: 200 + Math.random() * 30, id: 'shoulder' },
          { x: 200 + Math.random() * 50, y: 280 + Math.random() * 30, id: 'elbow' },
          { x: 200 + Math.random() * 50, y: 350 + Math.random() * 30, id: 'wrist' },
          { x: 200 + Math.random() * 50, y: 400 + Math.random() * 30, id: 'hip' },
          { x: 200 + Math.random() * 50, y: 480 + Math.random() * 30, id: 'knee' },
          { x: 200 + Math.random() * 50, y: 560 + Math.random() * 30, id: 'ankle' }
        ];
        setPosePoints(newPoints);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing webcam:', error);
      alert('Unable to access webcam. Please check permissions.');
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsRecording(false);
    generateReport();
  };

  const generateReport = () => {
    const reportData = {
      exercise: currentExercise,
      duration: exerciseData.duration,
      accuracy: Math.round(exerciseData.accuracy),
      repetitions: exerciseData.repetitions,
      timestamp: new Date().toISOString(),
      summary: `Completed ${exerciseData.repetitions} repetitions of ${currentExercise} with ${Math.round(exerciseData.accuracy)}% accuracy in ${Math.floor(exerciseData.duration / 60)}:${(exerciseData.duration % 60).toString().padStart(2, '0')} minutes.`
    };

    // Save to localStorage
    const existingReports = JSON.parse(localStorage.getItem('exerciseReports') || '[]');
    existingReports.push(reportData);
    localStorage.setItem('exerciseReports', JSON.stringify(existingReports));

    // Download report
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `exercise_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('Exercise completed! Report generated and downloaded.');
  };

  return (
    <div className="min-h-screen relative p-4">
      <FloatingElements />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Exercise Session</h1>
            <p className="text-gray-600">Current Exercise: {currentExercise}</p>
          </div>
          <Button onClick={() => navigate('/patient-dashboard')} variant="outline">
            ← Back to Dashboard
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Webcam Feed */}
          <Card className="lg:col-span-2 glassmorphism">
            <CardHeader>
              <CardTitle>Live Motion Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Pose Detection Overlay */}
                {isRecording && (
                  <div className="absolute inset-0">
                    {posePoints.map((point, index) => (
                      <div
                        key={point.id}
                        className="pose-point"
                        style={{
                          left: `${point.x}px`,
                          top: `${point.y}px`
                        }}
                      />
                    ))}
                    
                    {/* Connection lines between points */}
                    {posePoints.length > 1 && posePoints.map((point, index) => {
                      if (index === 0) return null;
                      const prevPoint = posePoints[index - 1];
                      const distance = Math.sqrt(
                        Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2)
                      );
                      const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * 180 / Math.PI;
                      
                      return (
                        <div
                          key={`line-${index}`}
                          className="connection-line"
                          style={{
                            left: `${prevPoint.x}px`,
                            top: `${prevPoint.y}px`,
                            width: `${distance}px`,
                            transform: `rotate(${angle}deg)`
                          }}
                        />
                      );
                    })}
                  </div>
                )}
                
                {!isRecording && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      onClick={startWebcam}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                    >
                      📹 Start Webcam
                    </Button>
                  </div>
                )}
              </div>
              
              {isRecording && (
                <div className="mt-4 flex justify-center gap-4">
                  <Button onClick={stopWebcam} variant="destructive">
                    ⏹️ Stop Session
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Recording</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Exercise Data */}
          <div className="space-y-6">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Real-time Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.floor(exerciseData.duration / 60)}:{(exerciseData.duration % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round(exerciseData.accuracy)}%
                  </div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {exerciseData.repetitions}
                  </div>
                  <div className="text-sm text-gray-600">Repetitions</div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Exercise Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Knee Flexion', 'Shoulder Rotation', 'Balance Test', 'Arm Raise'].map((exercise) => (
                  <Button
                    key={exercise}
                    onClick={() => setCurrentExercise(exercise)}
                    variant={currentExercise === exercise ? "default" : "outline"}
                    className="w-full"
                  >
                    {exercise}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <p>🎯 <strong>Current Exercise:</strong> {currentExercise}</p>
                  <p>👁️ Position yourself in the camera view</p>
                  <p>🟢 Green dots show detected body points</p>
                  <p>📊 Real-time tracking provides instant feedback</p>
                  <p>📋 Report will be auto-generated when finished</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
