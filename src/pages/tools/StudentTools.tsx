import { useState } from "react";
import { getToolBySlug } from "../../registry";
import { ToolLayout } from "../../components/layout/ToolLayout";

export function CGPACalculator() {
  const tool = getToolBySlug("cgpa-calculator")!;
  const [semesters, setSemesters] = useState([{ sgpa: "", credits: "" }, { sgpa: "", credits: "" }]);

  const addSemester = () => setSemesters([...semesters, { sgpa: "", credits: "" }]);
  const updateSemester = (index: number, field: "sgpa" | "credits", value: string) => {
    const newSemesters = [...semesters];
    newSemesters[index][field] = value;
    setSemesters(newSemesters);
  };

  let totalCredits = 0;
  let totalPoints = 0;
  
  semesters.forEach(s => {
    const sgpa = parseFloat(s.sgpa) || 0;
    const credits = parseFloat(s.credits) || 0;
    if (sgpa > 0 && credits > 0) {
      totalPoints += sgpa * credits;
      totalCredits += credits;
    }
  });

  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-4">Enter your SGPA (Semester GPA) and total credits for each semester to calculate your overall CGPA.</p>
          {semesters.map((sem, i) => (
            <div key={i} className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1">Semester {i + 1} SGPA</label>
                <input type="number" value={sem.sgpa} onChange={(e) => updateSemester(i, "sgpa", e.target.value)} placeholder="e.g. 3.5" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1">Credits</label>
                <input type="number" value={sem.credits} onChange={(e) => updateSemester(i, "credits", e.target.value)} placeholder="e.g. 15" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              </div>
            </div>
          ))}
          <button onClick={addSemester} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            + Add Semester
          </button>
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Cumulative GPA (CGPA)</div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{cgpa > 0 ? cgpa.toFixed(2) : "0.00"}</div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function GPACalculator() {
  const tool = getToolBySlug("gpa-calculator")!;
  const [courses, setCourses] = useState([{ grade: "A", credits: "3" }, { grade: "B", credits: "3" }, { grade: "C", credits: "3" }]);

  const gradePoints: Record<string, number> = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0
  };

  const addCourse = () => setCourses([...courses, { grade: "A", credits: "3" }]);
  const updateCourse = (index: number, field: "grade" | "credits", value: string) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  let totalCredits = 0;
  let totalPoints = 0;
  
  courses.forEach(c => {
    const p = gradePoints[c.grade] ?? 0;
    const credits = parseFloat(c.credits) || 0;
    if (credits > 0) {
      totalPoints += p * credits;
      totalCredits += credits;
    }
  });

  const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-4">Calculate your semester GPA by entering your grades and credit hours.</p>
          {courses.map((c, i) => (
            <div key={i} className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1">Grade</label>
                <select value={c.grade} onChange={(e) => updateCourse(i, "grade", e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                  {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1">Credits</label>
                <input type="number" value={c.credits} onChange={(e) => updateCourse(i, "credits", e.target.value)} placeholder="e.g. 3" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              </div>
            </div>
          ))}
          <button onClick={addCourse} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            + Add Course
          </button>
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Semester GPA</div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{gpa > 0 ? gpa.toFixed(2) : "0.00"}</div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function MarksPercentageCalculator() {
  const tool = getToolBySlug("marks-percentage-calculator")!;
  const [obtained, setObtained] = useState("450");
  const [total, setTotal] = useState("500");

  const o = parseFloat(obtained) || 0;
  const t = parseFloat(total) || 0;
  const perc = t > 0 ? (o / t) * 100 : 0;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Marks Obtained</label>
            <input type="number" value={obtained} onChange={(e) => setObtained(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Total Marks</label>
            <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Percentage</div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{perc.toFixed(2)}%</div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function AttendanceCalculator() {
  const tool = getToolBySlug("attendance-calculator")!;
  const [total, setTotal] = useState("40");
  const [attended, setAttended] = useState("30");
  const [target, setTarget] = useState("85");

  const t = parseInt(total) || 0;
  const a = parseInt(attended) || 0;
  const tgt = parseInt(target) || 0;

  const currentPerc = t > 0 ? (a / t) * 100 : 0;
  
  let required = 0;
  let statusText = "";
  
  if (t > 0) {
    if (currentPerc >= tgt) {
      const canMiss = Math.floor((a - (tgt / 100) * t) / (tgt / 100));
      statusText = `You are on track! You can miss ${Math.max(0, canMiss)} more classes and stay above ${tgt}%.`;
    } else {
      required = Math.ceil(((tgt / 100) * t - a) / (1 - (tgt / 100)));
      statusText = `You need to attend ${Math.max(0, required)} more consecutive classes to reach ${tgt}%.`;
    }
  }

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Total Classes</label>
            <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Classes Attended</label>
            <input type="number" value={attended} onChange={(e) => setAttended(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target %</label>
            <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Current Attendance</div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">{currentPerc.toFixed(2)}%</div>
          <p className="text-slate-700 dark:text-slate-300 font-medium">{t > 0 ? statusText : "Enter class details to see your status."}</p>
        </div>
      </div>
    </ToolLayout>
  );
}

export function GradeCalculator() {
  const tool = getToolBySlug("grade-calculator")!;
  const [currentGrade, setCurrentGrade] = useState("85");
  const [targetGrade, setTargetGrade] = useState("90");
  const [examWeight, setExamWeight] = useState("20");

  const c = parseFloat(currentGrade) || 0;
  const t = parseFloat(targetGrade) || 0;
  const w = (parseFloat(examWeight) || 0) / 100;

  let required = 0;
  if (w > 0) {
    required = (t - (1 - w) * c) / w;
  }

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Grade (%)</label>
            <input type="number" value={currentGrade} onChange={(e) => setCurrentGrade(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Grade (%)</label>
            <input type="number" value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Final Exam Weight (%)</label>
            <input type="number" value={examWeight} onChange={(e) => setExamWeight(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Required on Final Exam</div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{w > 0 ? required.toFixed(2) : "0.00"}%</div>
          {required > 100 && <p className="text-red-500 mt-2 text-sm">Warning: Required score is over 100%.</p>}
        </div>
      </div>
    </ToolLayout>
  );
}

export function StudyTimeCalculator() {
  const tool = getToolBySlug("study-time-calculator")!;
  const [hours, setHours] = useState("10");
  const [subjects, setSubjects] = useState("Math, Physics, Chemistry");

  const h = parseFloat(hours) || 0;
  const list = subjects.split(",").map(s => s.trim()).filter(s => s.length > 0);
  const timePerSub = list.length > 0 ? h / list.length : 0;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="grid gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Total Hours Available</label>
            <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subjects (comma separated)</label>
            <input type="text" value={subjects} onChange={(e) => setSubjects(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Time per Subject</div>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">{timePerSub.toFixed(1)} hours</div>
          <div className="text-left max-w-xs mx-auto text-sm text-slate-600 dark:text-slate-300">
            <ul className="list-disc pl-4 space-y-1">
              {list.map(s => <li key={s}><span className="font-medium">{s}:</span> {timePerSub.toFixed(1)} hrs</li>)}
            </ul>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function ExamCountdown() {
  const tool = getToolBySlug("exam-countdown")!;
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });
  
  const d1 = new Date();
  const d2 = new Date(targetDate);
  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Exam Date</label>
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Days Remaining</div>
          <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
            {diffDays > 0 ? diffDays : (diffDays === 0 ? "Today!" : "Passed")}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
