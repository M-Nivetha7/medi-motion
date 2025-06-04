
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FloatingElements from '@/components/FloatingElements';

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    // Load saved reports
    const savedReports = JSON.parse(localStorage.getItem('exerciseReports') || '[]');
    setReports(savedReports);
  }, []);

  const downloadReport = (report: any) => {
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report_${report.exercise}_${report.timestamp?.split('T')[0] || 'unknown'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateComprehensiveReport = () => {
    const comprehensiveReport = {
      patientName: JSON.parse(localStorage.getItem('patientData') || '{}').name || 'Patient',
      reportDate: new Date().toISOString(),
      totalSessions: reports.length,
      exercises: reports,
      summary: {
        avgAccuracy: reports.length > 0 ? Math.round(reports.reduce((acc, r) => acc + r.accuracy, 0) / reports.length) : 0,
        totalDuration: reports.reduce((acc, r) => acc + r.duration, 0),
        totalRepetitions: reports.reduce((acc, r) => acc + r.repetitions, 0),
        mostPerformedExercise: reports.length > 0 ? reports.reduce((a, b) => 
          reports.filter(r => r.exercise === a.exercise).length > reports.filter(r => r.exercise === b.exercise).length ? a : b
        ).exercise : 'None'
      },
      recommendations: [
        'Continue with current exercise routine',
        'Gradually increase repetition count',
        'Focus on maintaining high accuracy',
        'Schedule regular check-ins with healthcare provider'
      ]
    };

    const dataStr = JSON.stringify(comprehensiveReport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `comprehensive_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative p-4">
      <FloatingElements />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Exercise Reports</h1>
            <p className="text-gray-600">Detailed analysis of your progress</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={generateComprehensiveReport} className="bg-blue-600 hover:bg-blue-700">
              📊 Generate Summary Report
            </Button>
            <Button onClick={() => navigate(-1)} variant="outline">
              ← Back
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{reports.length}</div>
                <div className="text-sm text-gray-600">Total Sessions</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {reports.length > 0 ? Math.round(reports.reduce((acc, r) => acc + r.accuracy, 0) / reports.length) : 0}%
                </div>
                <div className="text-sm text-gray-600">Avg Accuracy</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(reports.reduce((acc, r) => acc + r.duration, 0) / 60)}
                </div>
                <div className="text-sm text-gray-600">Total Minutes</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {reports.reduce((acc, r) => acc + r.repetitions, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Reps</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Session History</CardTitle>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No exercise reports available yet.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Complete some exercises to generate reports.
                </p>
                <Button 
                  onClick={() => navigate('/exercise')} 
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  Start Exercise Session
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <div key={index} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{report.exercise}</h4>
                        <p className="text-sm text-gray-600">
                          {report.timestamp ? new Date(report.timestamp).toLocaleString() : 'Unknown date'}
                        </p>
                      </div>
                      <Button 
                        onClick={() => downloadReport(report)}
                        size="sm"
                        variant="outline"
                      >
                        📥 Download
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.floor(report.duration / 60)}:{(report.duration % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-600">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{report.accuracy}%</div>
                        <div className="text-xs text-gray-600">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{report.repetitions}</div>
                        <div className="text-xs text-gray-600">Repetitions</div>
                      </div>
                    </div>
                    
                    {report.summary && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">{report.summary}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
