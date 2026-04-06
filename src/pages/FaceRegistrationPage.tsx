import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Camera, CameraOff, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { fetchApi } from "@/lib/api";

type StudentApiItem = {
  id: string | number;
  studentId?: string;
  name: string;
  enrollmentId?: string;
  department?: string;
  year?: number;
  faceDatasetCount?: number;
};

const FaceRegistrationPage = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState<StudentApiItem[]>([]);
  const [cameraOn, setCameraOn] = useState(false);
  const [captured, setCaptured] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const TARGET = 25;
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await fetchApi("/students");
        if (res.success) {
          setStudents(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadStudents();
  }, []);

  const startCamera = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia not supported in this browser.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 360 } });
      streamRef.current = stream;
      setCameraOn(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      alert("Camera access failed: " + message);
      setCameraOn(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
    setCapturing(false);
  }, []);

  const startCapture = async () => {
    setCaptured(0);
    setCapturing(true);
    setUploading(false);
    let count = 0;
    const images: Blob[] = [];
    const interval = setInterval(async () => {
      count++;
      setCaptured(count);
      // Capture frame as image
      if (videoRef.current) {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", 0.92));
            if (blob) images.push(blob);
          }
        }
      }
      if (count >= TARGET) {
        clearInterval(interval);
        setCapturing(false);
        setUploading(true);
        // Upload all images to backend
        const formData = new FormData();
        images.forEach((img, idx) => formData.append("images", img, `face_${idx + 1}.jpg`));
        try {
          await fetch(`/api/dataset/upload/${selectedStudent}`, {
            method: "POST",
            body: formData,
          });
          // Optionally, update dataset count
          fetchApi("/students").then(res => {
            if (res.success) setStudents(res.data);
          });
        } catch (e) {
          alert("Image upload failed");
        }
        setUploading(false);
      }
    }, 400);
  };

  useEffect(() => {
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()); };
  }, []);

  const student = students.find(s => s.id.toString() === selectedStudent);

  return (
    <div className="space-y-6 animate-rise">
      <div className="animate-rise-delay-1">
        <h1 className="text-2xl font-display font-bold text-foreground">Face Registration</h1>
        <p className="text-sm text-muted-foreground">Capture face dataset for student recognition</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-card bg-white/70 border-[#d2e1e5] overflow-hidden animate-rise-delay-2">
            <CardContent className="p-0">
              <div className="relative bg-foreground/5 aspect-video flex items-center justify-center max-h-[400px]">
                {cameraOn ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-40 h-40 sm:w-48 sm:h-48 border-2 border-dashed border-secondary/60 rounded-full animate-pulse-border" />
                    </div>
                    {capturing && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-card/90 backdrop-blur rounded-lg p-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-foreground font-medium">Capturing...</span>
                            <span className="text-muted-foreground">{captured}/{TARGET}</span>
                          </div>
                          <Progress value={(captured / TARGET) * 100} className="h-2" />
                        </div>
                      </div>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-muted/60 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-foreground">Uploading images...</p>
                        </div>
                      </div>
                    )}
                    {captured >= TARGET && !capturing && !uploading && (
                      <div className="absolute inset-0 bg-success/10 flex items-center justify-center">
                        <div className="text-center">
                          <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-2" />
                          <p className="text-lg font-semibold text-foreground">Capture Complete!</p>
                          <p className="text-sm text-muted-foreground">{TARGET} images captured and uploaded</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Camera className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Select a student and start the camera</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedStudent} onValueChange={s => { setSelectedStudent(s); setCaptured(0); }}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select Student" />
              </SelectTrigger>
              <SelectContent>
                {students.map(s => (
                  <SelectItem key={s.id} value={s.id.toString()}>{s.studentId} — {s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!cameraOn ? (
                <Button onClick={startCamera} className="w-full sm:w-auto" disabled={!selectedStudent}>
                <Camera className="w-4 h-4 mr-1" /> Start Camera
              </Button>
            ) : (
              <>
                <Button onClick={startCapture} className="w-full sm:w-auto" disabled={capturing || captured >= TARGET}>
                    <ImageIcon className="w-4 h-4 mr-1" /> {capturing ? "Capturing..." : "Capture Faces"}
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" onClick={stopCamera}>
                  <CameraOff className="w-4 h-4 mr-1" /> Stop
                </Button>
              </>
            )}
          </div>
        </div>

        <Card className="shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Selected Student</CardTitle>
          </CardHeader>
          <CardContent>
            {student ? (
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-display font-bold text-primary">
                    {student.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.enrollmentId}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Department</span><span className="text-foreground">{student.department}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Year</span><span className="text-foreground">{student.year}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Existing Images</span><span className="text-foreground">{student.faceDatasetCount}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">New Captures</span><span className="font-medium text-foreground">{captured}</span></div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Select a student to begin registration</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FaceRegistrationPage;
