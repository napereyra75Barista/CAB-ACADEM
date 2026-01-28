
export type Page = 'home' | 'login' | 'teacher-login' | 'dashboard' | 'course' | 'lesson' | 'community' | 'certificates' | 'catalog' | 'admin' | 'instructor' | 'analytics' | 'profile' | 'leaderboard' | 'sop' | 'classroom-manual' | 'teacher-dashboard' | 'gallery';

export type UserRole = 'student' | 'teacher' | 'admin';

export type AdminSubPage = 'overview' | 'courses' | 'students' | 'payments' | 'community' | 'support' | 'analytics';

export type CourseLevel = 'Inicial' | 'Intermedio' | 'Avanzado';

export type UserRank = 'Junior Barista' | 'Senior Barista' | 'Master Barista' | 'Coffee Guru';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'technical' | 'social' | 'special';
  earnedDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bio: string;
  avatar: string;
  level: CourseLevel;
  xp: number;
  rank: UserRank;
  badges: Badge[];
  streak: number;
  lastAccessedCourseId?: string;
  preferences: {
    intensity: string;
    methods: string[];
  };
  instructorId?: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  avatar: string;
  coursesIds: string[];
  rating: number;
  studentsCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl: string;
  summary?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  progress: number;
  modules: Module[];
  instructorId: string;
  instructorName: string;
  category: string;
  level: CourseLevel;
  price?: string;
  durationHours: string;
  tags: string[];
  enrollmentCount: number;
  rating: number;
  isTrending?: boolean;
  recommendationCount: number;
  createdAt?: string;
}

export interface ForumPost {
  id: string;
  author: string;
  role: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  tag: string;
  time: string;
  isSolved: boolean;
  isPinned?: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  activeCourses: number;
  completionRate: number;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
}

export interface Transaction {
  id: string;
  studentName: string;
  courseTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface PracticalTask {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  dueDate: string;
  criteria: string[];
  createdAt: string;
}
