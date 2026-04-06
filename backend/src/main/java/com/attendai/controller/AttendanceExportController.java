package com.attendai.controller;

import com.attendai.entity.Attendance;
import com.attendai.repository.AttendanceRepository;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance/export")
public class AttendanceExportController {
    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> exportAttendancePdf(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) throws Exception {
        List<Attendance> records = attendanceRepository.findByDate(date);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc);
        document.add(new Paragraph("Attendance Report for " + date));
        document.add(new Paragraph(" "));
        float[] columnWidths = {2, 2, 2, 2, 2, 2};
        Table table = new Table(columnWidths);
        table.addCell("Student");
        table.addCell("Subject");
        table.addCell("Date");
        table.addCell("Time");
        table.addCell("Status");
        table.addCell("Confidence");
        for (Attendance a : records) {
            table.addCell(a.getStudent().getName());
            table.addCell(a.getSubject() != null ? a.getSubject().getSubjectName() : "");
            table.addCell(a.getDate().toString());
            table.addCell(a.getTime().toString());
            table.addCell(a.getStatus());
            table.addCell(a.getConfidenceScore() != null ? String.format("%.1f", a.getConfidenceScore()) : "");
        }
        document.add(table);
        document.close();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=attendance_" + date + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(out.toByteArray());
    }
}
