package com.attendai.service;


import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfInt;
import org.opencv.core.MatOfRect;
import org.opencv.core.Rect;
import org.opencv.core.Size;
import org.opencv.face.LBPHFaceRecognizer;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.bytedeco.opencv.opencv_objdetect.CascadeClassifier;
import org.bytedeco.opencv.global.opencv_objdetect;
import org.bytedeco.javacpp.Loader;
import org.opencv.videoio.VideoCapture;
import org.springframework.stereotype.Service;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class FaceRecognitionService {

    private final CascadeClassifier faceDetector;

    public FaceRecognitionService() {
            // Ensure OpenCV native libraries are loaded (Bytedeco)
            Loader.load(opencv_objdetect.class);
        // OpenCV is loaded automatically by Bytedeco
        // Uses Haar cascade for demonstration purposes
        String sep = System.getProperty("file.separator");
        String cascadePath = System.getProperty("user.dir") + sep + "haarcascade_frontalface_default.xml";
        this.faceDetector = new CascadeClassifier(cascadePath);
    }

    // Existing captureDataset method ...

    // Train LBPH recognizer on all student datasets
    public void trainRecognizer(String modelPath) {
        File root = new File("datasets");
        List<Mat> images = new ArrayList<>();
        List<Integer> labels = new ArrayList<>();
        int label = 0;
        for (File studentDir : root.listFiles()) {
            if (studentDir.isDirectory()) {
                for (File imgFile : studentDir.listFiles()) {
                    Mat img = Imgcodecs.imread(imgFile.getAbsolutePath(), Imgcodecs.IMREAD_GRAYSCALE);
                    Imgproc.resize(img, img, new Size(200, 200));
                    images.add(img);
                    labels.add(label);
                }
                label++;
            }
        }
        LBPHFaceRecognizer recognizer = LBPHFaceRecognizer.create();
        recognizer.train(images, new MatOfInt(labels.stream().mapToInt(i->i).toArray()));
        recognizer.save(modelPath);
    }

    // Recognize a face from an image using the trained model
    public int recognizeFace(String modelPath, String imagePath) {
        LBPHFaceRecognizer recognizer = LBPHFaceRecognizer.create();
        recognizer.read(modelPath);
        Mat img = Imgcodecs.imread(imagePath, Imgcodecs.IMREAD_GRAYSCALE);
        Imgproc.resize(img, img, new Size(200, 200));
        int[] label = new int[1];
        double[] confidence = new double[1];
        recognizer.predict(img, label, confidence);
        return label[0];
    }
}