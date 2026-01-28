
import React from 'react';
import { Page, Course, Instructor, User, Student, PracticalTask } from './types';
import { COURSES as INITIAL_COURSES, INSTRUCTORS as INITIAL_INSTRUCTORS, STUDENTS as INITIAL_STUDENTS } from './constants';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { CourseDetail } from './pages/CourseDetail';
import { LessonView } from './pages/LessonView';
import { Community } from './pages/Community';
import { Certificates } from './pages/Certificates';
import { Catalog } from './pages/Catalog';
import { AdminDashboard } from './pages/AdminDashboard';
import { InstructorProfile } from './pages/InstructorProfile';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { UserProfile } from './components/UserProfile';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { SOPPage } from './pages/SOPPage';
import { GoogleCampusManual } from './pages/GoogleCampusManual';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { Login } from './pages/Login';
import { TeacherLogin } from './pages/TeacherLogin';
import { AIArtGenerator } from './pages/AIArtGenerator';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>('home');
  const [courses, setCourses] = React.useState<Course[]>(INITIAL_COURSES);
  const [instructors, setInstructors] = React.useState<Instructor[]>(INITIAL_INSTRUCTORS);
  const [students, setStudents] = React.useState<Student[]>(INITIAL_STUDENTS);
  const [practicalTasks, setPracticalTasks] = React.useState<PracticalTask[]>([]);
  
  const [selectedCourseId, setSelectedCourseId] = React.useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = React.useState<string | null>(null);
  const [selectedInstructorId, setSelectedInstructorId] = React.useState<string | null>(null);
  const [previousPage, setPreviousPage] = React.useState<Page | null>(null);
  
  const [currentUser, setCurrentUser] = React.useState<User>({
    id: 'usr-1',
    name: 'Martín Barista',
    email: 'martin@barista.it',
    role: 'admin',
    bio: 'Apasionado por la extracción perfecta y la ciencia del tueste. Buscando siempre el equilibrio dulce en cada taza.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    level: 'Avanzado',
    xp: 4850,
    rank: 'Senior Barista',
    streak: 5,
    badges: [],
    preferences: {
      intensity: 'Media',
      methods: ['Espresso', 'V60', 'Chemex']
    },
    instructorId: 'inst-1'
  });

  const isLoggedIn = !['home', 'login', 'teacher-login'].includes(currentPage);

  const navigateToPage = (page: Page) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const toggleLessonCompletion = (courseId: string, lessonId: string) => {
    setCourses(prevCourses => {
      let newlyCompleted = false;

      const updatedCourses = prevCourses.map(course => {
        if (course.id !== courseId) return course;

        const updatedModules = course.modules.map(module => ({
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              const nextStatus = !lesson.isCompleted;
              if (nextStatus) newlyCompleted = true;
              return { ...lesson, isCompleted: nextStatus };
            }
            return lesson;
          })
        }));

        const totalLessons = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);
        const completedLessons = updatedModules.reduce((acc, m) => 
          acc + m.lessons.filter(l => l.isCompleted).length, 0
        );
        const newProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        return {
          ...course,
          modules: updatedModules,
          progress: newProgress
        };
      });

      if (newlyCompleted) {
        setCurrentUser(prev => ({ ...prev, xp: prev.xp + 50 }));
      }

      return updatedCourses;
    });
  };

  const handleAddTask = (task: PracticalTask) => {
    setPracticalTasks(prev => [task, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setPracticalTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const navigateToCourse = (id: string) => {
    setSelectedCourseId(id);
    navigateToPage('course');
  };

  const navigateToLesson = (id: string) => {
    setSelectedLessonId(id);
    navigateToPage('lesson');
  };

  const navigateToInstructor = (id: string) => {
    setSelectedInstructorId(id);
    navigateToPage('instructor');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateToPage} />;
      case 'login':
        return <Login onLogin={() => navigateToPage('dashboard')} onBack={() => navigateToPage('home')} />;
      case 'teacher-login':
        return <TeacherLogin onLogin={() => navigateToPage('teacher-dashboard')} onBack={() => navigateToPage('home')} />;
      case 'dashboard':
        return <Dashboard 
          courses={courses}
          user={currentUser}
          onNavigateCourse={navigateToCourse} 
          onNavigateInstructor={navigateToInstructor}
          onNavigate={navigateToPage} 
        />;
      case 'gallery':
        return <AIArtGenerator />;
      case 'teacher-dashboard':
        const instructorData = instructors.find(i => i.id === currentUser.instructorId) || instructors[0];
        return <TeacherDashboard 
          user={currentUser}
          instructorData={instructorData}
          courses={courses}
          onNavigateCourse={navigateToCourse}
        />;
      case 'catalog':
        return <Catalog 
          courses={courses}
          onNavigateCourse={navigateToCourse} 
          onNavigateInstructor={navigateToInstructor}
        />;
      case 'course':
        const course = courses.find(c => c.id === selectedCourseId) || courses[0];
        return <CourseDetail 
          course={course} 
          onBack={() => navigateToPage(currentUser.role === 'teacher' ? 'teacher-dashboard' : 'dashboard')} 
          onNavigateLesson={navigateToLesson} 
          onNavigateInstructor={navigateToInstructor}
        />;
      case 'lesson':
        const lessonCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
        return <LessonView 
          course={lessonCourse} 
          currentLessonId={selectedLessonId || 'l1'} 
          practicalTasks={practicalTasks.filter(t => t.lessonId === (selectedLessonId || 'l1'))}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onBack={() => navigateToPage('course')} 
          onNavigateLesson={setSelectedLessonId}
          onToggleCompletion={(lId) => toggleLessonCompletion(lessonCourse.id, lId)}
          userRole={currentUser.role}
        />;
      case 'community':
        return <Community />;
      case 'certificates':
        return <Certificates />;
      case 'admin':
        return <AdminDashboard 
          courses={courses}
          setCourses={setCourses}
          instructors={instructors}
          setInstructors={setInstructors}
          students={students}
          setStudents={setStudents}
          onNavigateSubpage={(sub) => { if (sub === 'analytics') navigateToPage('analytics'); }} 
          onNavigateSOP={() => navigateToPage('sop')}
          onNavigateGoogleManual={() => navigateToPage('classroom-manual')}
        />;
      case 'instructor':
        const instructor = instructors.find(i => i.id === selectedInstructorId) || instructors[0];
        return <InstructorProfile 
          instructor={instructor} 
          courses={courses} 
          onBack={() => navigateToPage(previousPage || 'dashboard')}
          onNavigateCourse={navigateToCourse}
        />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'profile':
        return <UserProfile user={currentUser} onSave={setCurrentUser} />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'sop':
        return <SOPPage />;
      case 'classroom-manual':
        return <GoogleCampusManual onBack={() => navigateToPage('admin')} />;
      default:
        return <Home onNavigate={navigateToPage} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={navigateToPage} 
      isLoggedIn={isLoggedIn}
      userAvatar={currentUser.avatar}
      userName={currentUser.name}
      userXP={currentUser.xp}
      userStreak={currentUser.streak}
      userRole={currentUser.role}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
