import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, CameraOff, ScanFace, CheckCircle2, AlertTriangle, User } from "lucide-react";
import { fetchApi } from "@/lib/api";

type SubjectOption = {
  id: string | number;
  subjectName?: string;
  name?: string;
};

type StudentOption = {
  id: string | number;
  name: string;
};

type RecognitionResponse = {
  success?: boolean;
  data?: {
    student?: {
      studentId?: string;
      name?: string;
    };
    confidenceScore?: number;
  };
};

const AttendancePage = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [subject, setSubject] = useState("");
  const [scanning, setScanning] = useState(false);
  const [detectedStudents, setDetectedStudents] = useState<{ id: string; name: string; confidence: number; time: string }[]>([]);
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  
  // HTML Video element reference
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const res = await fetchApi("/subjects");
        if (res.success) setSubjects(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadSubjects();
  }, []);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await fetchApi("/students");
        if (res.success) setStudents(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadStudents();
  }, []);


  const startCamera = async () => {
    try {
      if (document.location.protocol !== 'https:' && document.location.hostname !== 'localhost') {
         alert("Camera access requires HTTPS or Localhost.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false
      });

      streamRef.current = stream;
      setCameraOn(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please ensure permissions are granted in your browser.");
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
    setScanning(false);
    if (detectIntervalRef.current) {
      clearInterval(detectIntervalRef.current);
      detectIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const toggleScanning = () => {
    if (!scanning) {
      setScanning(true);
      detectIntervalRef.current = setInterval(async () => {
        try {
          // Capture frame from video
          if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
              const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", 0.92));
              if (blob) {
                const formData = new FormData();
                formData.append("image", blob, "scan.jpg");
                formData.append("subjectId", subject);
                const response = await fetch("/api/attendance/recognize-image", {
                  method: "POST",
                  body: formData
                });
                const res: RecognitionResponse = await response.json();
                const student = res.data?.student;
                if (res.success && student?.studentId && student.name) {
                  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  setDetectedStudents(prev => {
                    if (prev.some(s => s.id === student.studentId)) return prev;
                    return [{
                      id: student.studentId,
                      name: student.name,
                      confidence: res.data?.confidenceScore || 95.0,
                      time: timeStr
                    }, ...prev];
                  });
                }
              }
            }
          }
        } catch (e) {
          console.error("Recognition error:", e);
        }
      }, 8000);
    } else {
      setScanning(false);
      if (detectIntervalRef.current) {
        clearInterval(detectIntervalRef.current);
        detectIntervalRef.current = null;
      }
    }
  };

  const undetectedCount = students.length - detectedStudents.length;

  return (
    <div className="space-y-6 animate-rise">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-rise-delay-1">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Live Attendance</h1>
            <p className="text-muted-foreground mt-1">Real-time facial recognition scanning</p>
         </div>
         
         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(s => (
                  <SelectItem key={s.id} value={String(s.id)}>{s.subjectName || s.name}</SelectItem>
                ))}
                {subjects.length === 0 && (
                   <SelectItem value="mock_sub">Computer Science 101</SelectItem>
                )}
              </SelectContent>
            </Select>
            <Button variant={cameraOn ? "destructive" : "default"} className="w-full sm:w-auto" onClick={cameraOn ? stopCamera : startCamera}>
              {cameraOn ? <CameraOff className="w-4 h-4 mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
              {cameraOn ? "Stop Camera" : "Turn On Camera"}
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Feed Column */}
        <Card className="lg:col-span-2 overflow-hidden shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-1">
          <CardContent className="p-0 relative bg-black min-h-[400px] flex items-center justify-center">
            {!cameraOn ? (
              <div className="flex flex-col items-center justify-center text-muted-foreground p-12">
                <CameraOff className="w-16 h-16 mb-4 opacity-50" />
                <p>Camera is currently offline</p>
                <p className="text-sm mt-2 opacity-70">Select a subject and turn on the camera to begin</p>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover max-h-[600px] transform -scale-x-100"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
                
                {/* AI Scanning Overlay Elements */}
                {scanning && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full border-[3px] border-primary/50 relative animate-pulse-border">
                       <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary m-4"></div>
                       <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary m-4"></div>
                       <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary m-4"></div>
                       <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary m-4"></div>
                       
                       <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border border-white/20 rounded shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center">
                          <div className="w-full h-[2px] bg-primary/70 animate-scan"></div>
                       </div>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-1/2 w-[92%] max-w-[520px] -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 bg-background/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-border/50">
                  <div className="flex items-center gap-2">
                     <span className={"relative flex h-3 w-3"}>
                        {scanning && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>}
                        <span className={"relative inline-flex rounded-full h-3 w-3 "}></span>
                     </span>
                     <span className="font-medium text-sm">{scanning ? 'AI Engine Active' : 'System Standby'}</span>
                  </div>
                  
                  <div className="hidden sm:block w-px h-6 bg-border mx-2"></div>
                  
                  <Button 
                    size="sm" 
                    variant={scanning ? "secondary" : "default"} 
                    onClick={toggleScanning}
                    disabled={!subject && subjects.length > 0}
                    className="w-full sm:w-auto"
                  >
                    <ScanFace className="w-4 h-4 mr-2" />
                    {scanning ? 'Pause Scanning' : 'Start Scanning'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Results Column */}
        <div className="space-y-6 flex flex-col">
           <div className="grid grid-cols-2 gap-4 animate-rise-delay-2">
             <Card className="bg-primary/5 border-primary/20 shadow-card">
               <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                  <p className="text-3xl font-bold text-foreground">{detectedStudents.length}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">MARKED PRESENT</p>
               </CardContent>
             </Card>
             <Card className="bg-destructive/5 border-destructive/20 shadow-card">
               <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <AlertTriangle className="w-8 h-8 text-destructive opacity-80 mb-2" />
                  <p className="text-3xl font-bold text-foreground">{Math.max(0, undetectedCount)}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">PENDING</p>
               </CardContent>
             </Card>
          </div>

          <Card className="flex-1 flex flex-col shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-3">
            <CardHeader className="pb-3 border-b">
               <CardTitle className="text-base flex justify-between items-center">
                 Recent Detections
                 {detectedStudents.length > 0 && (
                   <Badge variant="secondary" className="font-normal">{detectedStudents.length} recognized</Badge>
                 )}
               </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 overflow-y-auto">
               {detectedStudents.length === 0 ? (
                 <div className="h-full flex flex-col justify-center items-center text-muted-foreground py-12">
                    <User className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm">No students detected yet.</p>
                 </div>
               ) : (
                 <div className="space-y-3">
                    {detectedStudents.map((student, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shadow-inner">
                              {student.name.charAt(0)}
                           </div>
                           <div>
                              <p className="font-medium text-sm text-foreground">{student.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">ID: {student.id}</p>
                           </div>
                         </div>
                         <div className="text-right">
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20 mb-1">
                              {student.confidence}% Match
                            </Badge>
                            <p className="text-[10px] text-muted-foreground">{student.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
