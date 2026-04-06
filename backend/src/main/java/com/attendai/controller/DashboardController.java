package com.attendai.controller;

import com.attendai.dto.ApiResponse;
import com.attendai.entity.Attendance;
import com.attendai.entity.Student;
import com.attendai.repository.AttendanceRepository;
import com.attendai.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        long totalStudents = studentRepository.count();
        long presentToday = attendanceRepository.countPresentToday(LocalDate.now());

        List<Attendance> allAttendance = attendanceRepository.findAll();
        List<Student> allStudents = studentRepository.findAll();

        // 1. Calculate general stats
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", totalStudents);
        stats.put("presentToday", presentToday);
        stats.put("attendancePercentage", totalStudents > 0 ? (presentToday * 100.0) / totalStudents : 0);

        // 2. Weekly Attendance Data
        List<Map<String, Object>> weeklyData = new ArrayList<>();
        LocalDate today = LocalDate.now();
        String[] dayNames = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        for (int i = 4; i >= 0; i--) {
            LocalDate d = today.minusDays(i);
            long present = allAttendance.stream().filter(a -> a.getDate().equals(d) && "PRESENT".equalsIgnoreCase(a.getStatus())).count();
            long absent = allAttendance.stream().filter(a -> a.getDate().equals(d) && "ABSENT".equalsIgnoreCase(a.getStatus())).count();
            // Default absent logic if strict dummy logic isn't there
            long totalExpected = totalStudents;
            absent = totalExpected - present;

            Map<String, Object> dayMap = new HashMap<>();
            dayMap.put("day", dayNames[d.getDayOfWeek().getValue() - 1]);
            dayMap.put("present", present);
            dayMap.put("absent", absent < 0 ? 0 : absent);
            weeklyData.add(dayMap);
        }
        stats.put("weeklyAttendance", weeklyData);

        // 3. Department Attendance Data
        Map<String, Long> deptTotal = allStudents.stream().collect(Collectors.groupingBy(Student::getDepartment, Collectors.counting()));
        List<Map<String, Object>> deptData = new ArrayList<>();
        deptTotal.forEach((dept, count) -> {
            long deptPresent = allAttendance.stream()
                .filter(a -> dept.equals(a.getStudent().getDepartment()) && "PRESENT".equalsIgnoreCase(a.getStatus()))
                .count();
            Map<String, Object> dMap = new HashMap<>();
            dMap.put("name", dept);
            dMap.put("rate", count > 0 ? (deptPresent * 100.0 / count) : 0);
            deptData.add(dMap);
        });
        stats.put("departmentAttendance", deptData);

        // 4. Monthly Trend Data (Simulated mapping for past months + actual for current)
        List<Map<String, Object>> monthlyData = new ArrayList<>();
        String[] monthNames = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        for (int i = 5; i >= 0; i--) {
            LocalDate m = today.minusMonths(i);
            long mPresent = allAttendance.stream()
                .filter(a -> a.getDate().getMonth() == m.getMonth() && a.getDate().getYear() == m.getYear() && "PRESENT".equalsIgnoreCase(a.getStatus()))
                .count();
            Map<String, Object> mMap = new HashMap<>();
            mMap.put("month", monthNames[m.getMonthValue() - 1]);
            mMap.put("rate", totalStudents > 0 ? ((mPresent * (totalStudents==0?1:totalStudents) / 30.0) / totalStudents) * 100 : Math.random() * 50 + 50); // fake scaling if no data
            monthlyData.add(mMap);
        }
        stats.put("monthlyTrend", monthlyData);

        return ResponseEntity.ok(ApiResponse.success(stats, "Stats fetched successfully"));
    }
}