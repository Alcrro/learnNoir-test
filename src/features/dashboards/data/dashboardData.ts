import {
	Activity,
	AlarmClock,
	BarChart3,
	BookCheck,
	BookOpen,
	BrainCircuit,
	CalendarClock,
	ClipboardCheck,
	GraduationCap,
	LayoutTemplate,
	LineChart,
	MessagesSquare,
	Rocket,
	ShieldCheck,
	Sparkles,
	Target,
	Users,
	type LucideIcon,
} from "lucide-react";

export type WorkspaceRole = "teacher" | "student";
export type DashboardTone = "blue" | "teal" | "amber" | "slate" | "rose";

export type DashboardStat = {
	label: string;
	value: string;
	helper: string;
	trend: string;
	icon: LucideIcon;
	tone: DashboardTone;
};

export type DashboardQuickAction = {
	title: string;
	description: string;
	cta: string;
	href: string;
};

export type DashboardCourse = {
	id: string;
	title: string;
	summary: string;
	students: number;
	completion: number;
	atRisk: number;
	nextMilestone: string;
	updatedAt: string;
};

export type DashboardLesson = {
	id: string;
	title: string;
	course: string;
	status: "Draft" | "Scheduled" | "Live" | "Review";
	startsAt: string;
	duration: string;
	completion: number;
	objective: string;
	checkpoint: string;
};

export type DashboardStudent = {
	id: string;
	name: string;
	cohort: string;
	course: string;
	currentLesson: string;
	progress: number;
	attendance: number;
	quizAverage: number;
	lastSeen: string;
	nextSession: string;
	assignmentsPending: number;
	streak: number;
	grade: number;
	status: "On track" | "Needs support" | "Excelling";
};

export type DashboardSession = {
	id: string;
	title: string;
	group: string;
	time: string;
	mode: string;
	status: string;
	meta: string;
};

export type DashboardAlert = {
	id: string;
	title: string;
	description: string;
	meta: string;
	tone: DashboardTone;
};

export type DashboardInsight = {
	label: string;
	value: number;
	helper: string;
};

export type DashboardPreference = {
	title: string;
	description: string;
	status: string;
};

export type DashboardWorkspace = {
	role: WorkspaceRole;
	headline: {
		eyebrow: string;
		title: string;
		description: string;
		highlight: string;
	};
	stats: DashboardStat[];
	quickActions: DashboardQuickAction[];
	courses: DashboardCourse[];
	lessons: DashboardLesson[];
	students: DashboardStudent[];
	sessions: DashboardSession[];
	alerts: DashboardAlert[];
	weeklyActivity: DashboardInsight[];
	moduleHealth: DashboardInsight[];
	settings: DashboardPreference[];
};

function average(values: number[]) {
	if (!values.length) {
		return 0;
	}

	return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

export function calculateStudentGrade(
	progress: number,
	attendance: number,
	quizAverage: number,
) {
	const weightedScore = progress * 0.45 + attendance * 0.2 + quizAverage * 0.35;

	return Number((weightedScore / 10).toFixed(1));
}

function statusFromGrade(grade: number) {
	if (grade >= 9) {
		return "Excelling" as const;
	}

	if (grade < 7.5) {
		return "Needs support" as const;
	}

	return "On track" as const;
}

const teacherStudentsSeed = [
	{
		id: "st-01",
		name: "Ana Popescu",
		cohort: "Clasa a VII-a B",
		course: "Algebra Foundations",
		currentLesson: "Ecuatii de gradul I",
		progress: 92,
		attendance: 96,
		quizAverage: 94,
		lastSeen: "Today, 09:12",
		nextSession: "24 Apr, 14:00",
		assignmentsPending: 0,
		streak: 11,
	},
	{
		id: "st-02",
		name: "Vlad Ionescu",
		cohort: "Clasa a VII-a B",
		course: "Algebra Foundations",
		currentLesson: "Raport si proportie",
		progress: 74,
		attendance: 88,
		quizAverage: 79,
		lastSeen: "Today, 08:41",
		nextSession: "24 Apr, 14:00",
		assignmentsPending: 2,
		streak: 4,
	},
	{
		id: "st-03",
		name: "Maria Dobre",
		cohort: "Clasa a VIII-a A",
		course: "Geometry Sprint",
		currentLesson: "Teorema lui Pitagora",
		progress: 85,
		attendance: 91,
		quizAverage: 86,
		lastSeen: "Yesterday, 18:24",
		nextSession: "25 Apr, 09:30",
		assignmentsPending: 1,
		streak: 7,
	},
	{
		id: "st-04",
		name: "Radu Stan",
		cohort: "Clasa a VIII-a A",
		course: "Geometry Sprint",
		currentLesson: "Aria triunghiului",
		progress: 63,
		attendance: 78,
		quizAverage: 71,
		lastSeen: "Yesterday, 16:52",
		nextSession: "25 Apr, 09:30",
		assignmentsPending: 3,
		streak: 2,
	},
	{
		id: "st-05",
		name: "Ioana Matei",
		cohort: "Clasa a VI-a C",
		course: "Problem Solving Lab",
		currentLesson: "Strategii de descompunere",
		progress: 97,
		attendance: 99,
		quizAverage: 96,
		lastSeen: "Today, 07:58",
		nextSession: "24 Apr, 17:30",
		assignmentsPending: 0,
		streak: 15,
	},
];

const teacherStudents: DashboardStudent[] = teacherStudentsSeed.map((student) => {
	const grade = calculateStudentGrade(
		student.progress,
		student.attendance,
		student.quizAverage,
	);

	return {
		...student,
		grade,
		status: statusFromGrade(grade),
	};
});

const teacherCourses: DashboardCourse[] = [
	{
		id: "course-01",
		title: "Algebra Foundations",
		summary: "Track-ul de baza pentru ecuatii, rapoarte si functii.",
		students: 28,
		completion: 78,
		atRisk: 4,
		nextMilestone: "Quiz recap on 26 Apr, 10:00",
		updatedAt: "Updated 12 min ago",
	},
	{
		id: "course-02",
		title: "Geometry Sprint",
		summary: "Lecții scurte cu aplicatii practice si verificari rapide.",
		students: 24,
		completion: 69,
		atRisk: 6,
		nextMilestone: "Live workshop on 25 Apr, 09:30",
		updatedAt: "Updated 1 hour ago",
	},
	{
		id: "course-03",
		title: "Problem Solving Lab",
		summary: "Antrenament pe rationament, viteza si claritate in rezolvare.",
		students: 19,
		completion: 84,
		atRisk: 2,
		nextMilestone: "Homework review on 24 Apr, 17:30",
		updatedAt: "Updated 2 hours ago",
	},
];

const teacherLessons: DashboardLesson[] = [
	{
		id: "lesson-01",
		title: "Workshop: Ecuatii cu necunoscuta",
		course: "Algebra Foundations",
		status: "Live",
		startsAt: "Today, 14:00",
		duration: "45 min",
		completion: 58,
		objective: "Modelam probleme text in ecuatii si validam raspunsul.",
		checkpoint: "12 students already submitted the guided exercise.",
	},
	{
		id: "lesson-02",
		title: "Teorema lui Pitagora in practica",
		course: "Geometry Sprint",
		status: "Scheduled",
		startsAt: "25 Apr, 09:30",
		duration: "50 min",
		completion: 100,
		objective: "Construim exemple vizuale si probleme pe coordonate.",
		checkpoint: "Slides shared, recap quiz still needs publishing.",
	},
	{
		id: "lesson-03",
		title: "Template de feedback personalizat",
		course: "Problem Solving Lab",
		status: "Draft",
		startsAt: "26 Apr, 11:00",
		duration: "30 min",
		completion: 72,
		objective: "Automatizam feedback-ul pe tipuri de greseala si ritm.",
		checkpoint: "Waiting for rubric review from the mentor team.",
	},
	{
		id: "lesson-04",
		title: "Retrospectiva pe quiz-ul saptamanii",
		course: "Algebra Foundations",
		status: "Review",
		startsAt: "26 Apr, 16:30",
		duration: "40 min",
		completion: 100,
		objective: "Extragem tiparele de eroare si ajustam planul saptamanii.",
		checkpoint: "Need to flag 3 students for targeted interventions.",
	},
];

const teacherSessions: DashboardSession[] = [
	{
		id: "session-01",
		title: "Classroom sync",
		group: "Clasa a VII-a B",
		time: "Today, 14:00",
		mode: "Live room",
		status: "In 2 hours",
		meta: "28 students invited, 24 confirmed",
	},
	{
		id: "session-02",
		title: "1:1 progress review",
		group: "Maria Dobre",
		time: "Today, 16:15",
		mode: "Mentoring",
		status: "Booked",
		meta: "Focus: geometry accuracy and pace",
	},
	{
		id: "session-03",
		title: "Homework office hours",
		group: "Problem Solving Lab",
		time: "Today, 17:30",
		mode: "Drop-in",
		status: "Open",
		meta: "4 pending questions from yesterday",
	},
];

const teacherAlerts: DashboardAlert[] = [
	{
		id: "alert-01",
		title: "3 students dropped below 70% progression",
		description: "Radu, Vlad and Daria need targeted follow-up before the next checkpoint.",
		meta: "Recommended: assign recovery path",
		tone: "amber",
	},
	{
		id: "alert-02",
		title: "Attendance improved this week",
		description: "Average class attendance is up after moving the recap block to Friday morning.",
		meta: "+6% week over week",
		tone: "teal",
	},
	{
		id: "alert-03",
		title: "Lesson draft almost ready",
		description: "The feedback template is at 72% completion and can be published after rubric review.",
		meta: "Needs 1 approval",
		tone: "blue",
	},
];

const teacherWeeklyActivity: DashboardInsight[] = [
	{ label: "Mon", value: 72, helper: "Homework completion" },
	{ label: "Tue", value: 79, helper: "Attendance + quiz starts" },
	{ label: "Wed", value: 81, helper: "Practice submissions" },
	{ label: "Thu", value: 88, helper: "Live lesson engagement" },
	{ label: "Fri", value: 84, helper: "Assessment review" },
];

const teacherModuleHealth: DashboardInsight[] = [
	{ label: "Concept mastery", value: 83, helper: "Weighted from quiz accuracy" },
	{ label: "Assignment delivery", value: 76, helper: "Pending homework included" },
	{ label: "Attendance reliability", value: 90, helper: "Last 14 days" },
	{ label: "Teacher workload automation", value: 68, helper: "Feedback and grading flows" },
];

const teacherSettings: DashboardPreference[] = [
	{
		title: "Automated grading",
		description: "Compute Romanian 1-10 grades using progress, attendance and quiz accuracy.",
		status: "Enabled",
	},
	{
		title: "Guardian reports",
		description: "Send weekly summaries with lesson status, next session and support flags.",
		status: "Every Friday, 18:00",
	},
	{
		title: "Lesson publishing workflow",
		description: "Draft -> review -> scheduled -> live, with timestamps for each stage.",
		status: "3-step approval",
	},
	{
		title: "Intervention alerts",
		description: "Highlight students at risk when momentum drops for two consecutive sessions.",
		status: "Real time",
	},
];

const studentProfile = {
	id: "self-01",
	name: "Alexandru Marin",
	cohort: "Clasa a VIII-a A",
	course: "Geometry Sprint",
	currentLesson: "Teorema lui Pitagora",
	progress: 87,
	attendance: 93,
	quizAverage: 89,
	lastSeen: "Today, 08:12",
	nextSession: "25 Apr, 09:30",
	assignmentsPending: 1,
	streak: 9,
};

const studentRecord: DashboardStudent = {
	...studentProfile,
	grade: calculateStudentGrade(
		studentProfile.progress,
		studentProfile.attendance,
		studentProfile.quizAverage,
	),
	status: statusFromGrade(
		calculateStudentGrade(
			studentProfile.progress,
			studentProfile.attendance,
			studentProfile.quizAverage,
		),
	),
};

const studentCourses: DashboardCourse[] = [
	{
		id: "student-course-01",
		title: "Geometry Sprint",
		summary: "Aplici formulele pe probleme reale si capeti ritm pentru examene.",
		students: 1,
		completion: 87,
		atRisk: 0,
		nextMilestone: "Live workshop on 25 Apr, 09:30",
		updatedAt: "Coach feedback synced 15 min ago",
	},
	{
		id: "student-course-02",
		title: "Problem Solving Lab",
		summary: "Exersezi pasi clari, verificare si gandire structurata.",
		students: 1,
		completion: 73,
		atRisk: 1,
		nextMilestone: "Homework due on 26 Apr, 18:00",
		updatedAt: "New challenge unlocked",
	},
];

const studentLessons: DashboardLesson[] = [
	{
		id: "student-lesson-01",
		title: "Pitot to proof",
		course: "Geometry Sprint",
		status: "Scheduled",
		startsAt: "25 Apr, 09:30",
		duration: "50 min",
		completion: 100,
		objective: "Transform formulas into short proof-based arguments.",
		checkpoint: "Pre-lesson warmup unlocked",
	},
	{
		id: "student-lesson-02",
		title: "Recovery sprint: area mistakes",
		course: "Geometry Sprint",
		status: "Review",
		startsAt: "Today, 18:00",
		duration: "20 min",
		completion: 100,
		objective: "Revisit the mistakes from the latest exit ticket.",
		checkpoint: "Teacher added 2 comments on your attempt",
	},
	{
		id: "student-lesson-03",
		title: "Strategy stack for word problems",
		course: "Problem Solving Lab",
		status: "Draft",
		startsAt: "26 Apr, 10:30",
		duration: "35 min",
		completion: 40,
		objective: "Break complex prompts into smaller solvable checkpoints.",
		checkpoint: "Waiting for you to finish the prerequisite exercise",
	},
];

const studentSessions: DashboardSession[] = [
	{
		id: "student-session-01",
		title: "Geometry live lesson",
		group: "Teacher: Andrei Stoica",
		time: "25 Apr, 09:30",
		mode: "Live room",
		status: "Next class",
		meta: "Bring notebook and angle ruler",
	},
	{
		id: "student-session-02",
		title: "Homework checkpoint",
		group: "Problem Solving Lab",
		time: "26 Apr, 18:00",
		mode: "Submission",
		status: "Due soon",
		meta: "1 task still pending",
	},
];

const studentAlerts: DashboardAlert[] = [
	{
		id: "student-alert-01",
		title: "Your grade is trending up",
		description: "The latest two quizzes pushed your projected grade to 9.0.",
		meta: "Keep the attendance streak alive",
		tone: "teal",
	},
	{
		id: "student-alert-02",
		title: "One assignment still needs review",
		description: "Finish the recovery sprint before tonight so the coach can unlock the next block.",
		meta: "Deadline: today, 18:00",
		tone: "amber",
	},
	{
		id: "student-alert-03",
		title: "Feedback arrived on the last lesson",
		description: "Two short notes explain where your proof can be cleaner and faster.",
		meta: "Open lesson review",
		tone: "blue",
	},
];

const studentWeeklyActivity: DashboardInsight[] = [
	{ label: "Mon", value: 68, helper: "Revision" },
	{ label: "Tue", value: 76, helper: "Quiz practice" },
	{ label: "Wed", value: 80, helper: "Homework focus" },
	{ label: "Thu", value: 87, helper: "Guided lesson" },
	{ label: "Fri", value: 91, helper: "Confidence check" },
];

const studentModuleHealth: DashboardInsight[] = [
	{ label: "Current grade", value: Math.round(studentRecord.grade * 10), helper: "Romanian 1-10 scale" },
	{ label: "Lesson progress", value: studentRecord.progress, helper: "Current lesson completed" },
	{ label: "Attendance", value: studentRecord.attendance, helper: "Last 30 days" },
	{ label: "Quiz accuracy", value: studentRecord.quizAverage, helper: "Rolling average" },
];

const studentSettings: DashboardPreference[] = [
	{
		title: "Smart reminders",
		description: "Receive nudges before live lessons, homework deadlines and recovery tasks.",
		status: "2 reminders active",
	},
	{
		title: "Progress snapshots",
		description: "Weekly summary with grade projection, strongest topic and next focus area.",
		status: "Every Sunday, 19:00",
	},
	{
		title: "Accessibility profile",
		description: "Keep high contrast, larger touch targets and keyboard-friendly navigation.",
		status: "Saved",
	},
	{
		title: "Parent visibility",
		description: "Share lesson completion, attendance and mentor notes with guardians.",
		status: "Guardian summary enabled",
	},
];

const teacherWorkspace: DashboardWorkspace = {
	role: "teacher",
	headline: {
		eyebrow: "Teacher Operations Hub",
		title: "Run the class like a modern learning studio",
		description:
			"See every student, every lesson and every intervention in one place so you can replace the old-school paperwork with a live operating system.",
		highlight: "82% of the class is on pace for this week's target.",
	},
	stats: [
		{
			label: "Active students",
			value: `${teacherStudents.length}`,
			helper: "Tracked right now across active cohorts",
			trend: "+4 since last term",
			icon: Users,
			tone: "blue",
		},
		{
			label: "Average progression",
			value: `${average(teacherStudents.map((student) => student.progress))}%`,
			helper: "Weighted from current lesson completion",
			trend: "+7% this week",
			icon: LineChart,
			tone: "teal",
		},
		{
			label: "Projected average grade",
			value: average(teacherStudents.map((student) => Math.round(student.grade * 10))) / 10 + "",
			helper: "Romanian 1-10 grade scale",
			trend: "+0.4 from last checkpoint",
			icon: GraduationCap,
			tone: "amber",
		},
		{
			label: "Lessons in motion",
			value: `${teacherLessons.length}`,
			helper: "Draft, scheduled, live and review states",
			trend: "1 live right now",
			icon: LayoutTemplate,
			tone: "slate",
		},
	],
	quickActions: [
		{
			title: "Create a new lesson",
			description: "Start from a template with checkpoints, rubric and publishing states.",
			cta: "Open lesson builder",
			href: "/dashboard/lessons",
		},
		{
			title: "Review student risk",
			description: "Open the roster already sorted by grade risk and missing work.",
			cta: "See student matrix",
			href: "/dashboard/students",
		},
		{
			title: "Share weekly report",
			description: "Generate a parent-ready summary with date, time, progress and next actions.",
			cta: "Open analytics",
			href: "/dashboard/analytics",
		},
	],
	courses: teacherCourses,
	lessons: teacherLessons,
	students: teacherStudents,
	sessions: teacherSessions,
	alerts: teacherAlerts,
	weeklyActivity: teacherWeeklyActivity,
	moduleHealth: teacherModuleHealth,
	settings: teacherSettings,
};

const studentWorkspace: DashboardWorkspace = {
	role: "student",
	headline: {
		eyebrow: "Student Learning Desk",
		title: "Know exactly where you are and what comes next",
		description:
			"Your dashboard keeps lessons, progress, grade projection and deadlines together so studying feels structured and modern, not chaotic.",
		highlight: `Projected grade: ${studentRecord.grade} / 10 based on live progress.`,
	},
	stats: [
		{
			label: "Projected grade",
			value: `${studentRecord.grade}/10`,
			helper: "Calculated from progress, attendance and quizzes",
			trend: "+0.6 this month",
			icon: GraduationCap,
			tone: "blue",
		},
		{
			label: "Current lesson",
			value: `${studentRecord.progress}%`,
			helper: studentRecord.currentLesson,
			trend: "12% completed this week",
			icon: BookCheck,
			tone: "teal",
		},
		{
			label: "Attendance",
			value: `${studentRecord.attendance}%`,
			helper: "Reliable presence in live sessions",
			trend: `${studentRecord.streak} day streak`,
			icon: ShieldCheck,
			tone: "amber",
		},
		{
			label: "Next session",
			value: studentRecord.nextSession,
			helper: "Already on your agenda",
			trend: "1 assignment due before class",
			icon: AlarmClock,
			tone: "slate",
		},
	],
	quickActions: [
		{
			title: "Resume current lesson",
			description: "Jump straight back into the checkpoint where you left off.",
			cta: "Continue learning",
			href: "/dashboard/lessons",
		},
		{
			title: "Check grade formula",
			description: "See how progress, attendance and quiz scores influence your live grade.",
			cta: "Open analytics",
			href: "/dashboard/analytics",
		},
		{
			title: "Prepare for the next live class",
			description: "Review the warmup and the teacher notes before the session starts.",
			cta: "Open courses",
			href: "/dashboard/courses",
		},
	],
	courses: studentCourses,
	lessons: studentLessons,
	students: [studentRecord],
	sessions: studentSessions,
	alerts: studentAlerts,
	weeklyActivity: studentWeeklyActivity,
	moduleHealth: studentModuleHealth,
	settings: studentSettings,
};

export function getDashboardWorkspace(role: WorkspaceRole) {
	return role === "student" ? studentWorkspace : teacherWorkspace;
}

export function getRoleLabel(role: WorkspaceRole) {
	return role === "teacher" ? "Teacher" : "Student";
}

export function getStatusTone(status: DashboardStudent["status"] | DashboardLesson["status"]) {
	if (status === "Excelling" || status === "Live") {
		return "teal" as const;
	}

	if (status === "Needs support" || status === "Review") {
		return "amber" as const;
	}

	if (status === "Draft") {
		return "slate" as const;
	}

	return "blue" as const;
}

export const dashboardHighlights = {
	teacher: [
		{
			title: "Live lesson creation",
			description: "Design, schedule and publish lessons with visible progress stages.",
			icon: Rocket,
		},
		{
			title: "Student-by-student visibility",
			description: "Track current lesson, progress, attendance, grade and next action per learner.",
			icon: MessagesSquare,
		},
		{
			title: "Operational analytics",
			description: "Replace spreadsheets with real-time class health and intervention signals.",
			icon: BarChart3,
		},
	],
	student: [
		{
			title: "Clear learning path",
			description: "Every lesson shows where you are, what remains and what unlocks next.",
			icon: Target,
		},
		{
			title: "Visible coach feedback",
			description: "Notes and recovery tasks stay attached to the lesson where they matter.",
			icon: BrainCircuit,
		},
		{
			title: "Agenda + reminders",
			description: "Dates, hours and deadlines stay in sync so nothing gets lost.",
			icon: CalendarClock,
		},
	],
};

export const dashboardGradeFormula = [
	{
		label: "Lesson progress",
		value: "45%",
		helper: "How much of the lesson path is completed with confidence.",
		icon: BookOpen,
	},
	{
		label: "Attendance",
		value: "20%",
		helper: "Presence and punctuality in scheduled sessions.",
		icon: Activity,
	},
	{
		label: "Quiz accuracy",
		value: "35%",
		helper: "Short checkpoints and recap assessments.",
		icon: ClipboardCheck,
	},
	{
		label: "Outcome",
		value: "1-10",
		helper: "The weighted score is converted to a Romanian grade scale.",
		icon: Sparkles,
	},
];
