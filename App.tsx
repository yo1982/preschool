import React, { useState, useMemo } from 'react';
import type { User, Student, Announcement, TimetableEntry, AttendanceRecord, GalleryItem, Notification, Role, MessageThread, EducationalContent, Class } from './types';
import { HomeIcon, UsersIcon, CalendarIcon, CheckCircleIcon, ChatBubbleIcon, CameraIcon, DocumentTextIcon, LogoutIcon, BellIcon, SparklesIcon, ChartPieIcon, UploadIcon, ClipIcon, XIcon, DownloadIcon } from './components/icons';
import { ActivitySuggester } from './components/ActivitySuggester';

// --- MOCK DATA ---
const MOCK_CLASSES: Class[] = [
    { id: 1, name: 'Sunflowers' },
    { id: 2, name: 'Bluebirds' },
];

const MOCK_USERS: User[] = [
  { id: 1, name: 'Ms. Davis', role: 'teacher', avatar: 'https://picsum.photos/seed/teacher/200', classId: 1 },
  { id: 2, name: 'Olivia\'s Dad', role: 'parent', avatar: 'https://picsum.photos/seed/parent/200', childId: 2 },
  { id: 3, name: 'Mr. Smith', role: 'management', avatar: 'https://picsum.photos/seed/mgmt/200' },
];

const MOCK_STUDENTS: Student[] = [
  { id: 1, name: 'Liam P.', avatar: 'https://picsum.photos/seed/liam/200', classId: 1 },
  { id: 2, name: 'Olivia C.', avatar: 'https://picsum.photos/seed/olivia/200', classId: 1 },
  { id: 3, name: 'Noah B.', avatar: 'https://picsum.photos/seed/noah/200', classId: 2 },
  { id: 4, name: 'Emma S.', avatar: 'https://picsum.photos/seed/emma/200', classId: 2 },
  { id: 5, name: 'Ava G.', avatar: 'https://picsum.photos/seed/ava/200', classId: 1 },
];

const MOCK_ANNOUNCEMENTS: Announcement[] = [
    { id: 1, title: 'Picture Day Next Friday!', content: "Don't forget, next Friday is Picture Day! Please have your child wear their brightest smiles.", date: '2024-07-20' },
    { id: 2, title: 'Field Trip to the Farm', content: 'We are so excited for our upcoming trip to Sunny Meadows Farm on the 15th.', date: '2024-07-18' },
];

const MOCK_TIMETABLE: TimetableEntry[] = [
    // Sunflowers Class
    { id: 1, classId: 1, time: '09:00 AM', activity: 'Welcome & Free Play', icon: '☀️', evaluation: 'Kids were very engaged with the new blocks.' },
    { id: 2, classId: 1, time: '10:00 AM', activity: 'Painting', icon: '🎨' },
    { id: 3, classId: 1, time: '11:00 AM', activity: 'Garden Time', icon: '🌱' },
    { id: 4, classId: 1, time: '12:00 PM', activity: 'Lunch', icon: '🍽️', evaluation: 'Encourage trying new vegetables.' },
    { id: 5, classId: 1, time: '01:00 PM', activity: 'Quiet Time', icon: '😴' },
    { id: 6, classId: 1, time: '02:30 PM', activity: 'Reading Corner', icon: '📚' },
    // Bluebirds Class
    { id: 7, classId: 2, time: '09:00 AM', activity: 'Circle Time & Music', icon: '🎵' },
    { id: 8, classId: 2, time: '10:00 AM', activity: 'Building Blocks', icon: '🧱' },
    { id: 9, classId: 2, time: '11:00 AM', activity: 'Playground Fun', icon: '🤸' },
    { id: 10, classId: 2, time: '12:00 PM', activity: 'Lunch Time', icon: '🍽️' },
    { id: 11, classId: 2, time: '01:00 PM', activity: 'Nap Time', icon: '😴' },
    { id: 12, classId: 2, time: '02:30 PM', activity: 'Show and Tell', icon: '⭐' },
];

const MOCK_ATTENDANCE: AttendanceRecord[] = [
    { studentId: 1, date: '2024-07-23', status: 'present' },
    { studentId: 2, date: '2024-07-23', status: 'present' },
    { studentId: 3, date: '2024-07-23', status: 'absent' },
    { studentId: 4, date: '2024-07-23', status: 'present' },
    { studentId: 5, date: '2024-07-23', status: 'present' },
];

const MOCK_GALLERY: GalleryItem[] = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/party1/400', caption: 'Fun at the Spring Fair!', date: '2024-05-15' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/party2/400', caption: 'Building amazing towers', date: '2024-05-12' },
    { id: 3, imageUrl: 'https://picsum.photos/seed/party3/400', caption: 'Art day masterpieces', date: '2024-05-10' },
    { id: 4, imageUrl: 'https://picsum.photos/seed/party4/400', caption: 'Story time magic', date: '2024-05-09' },
];

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, icon: CheckCircleIcon, iconBgColor: 'bg-green-100 text-green-600', title: "Olivia C.'s report was sent.", timestamp: '10m ago' },
    { id: 2, icon: CameraIcon, iconBgColor: 'bg-sky-100 text-sky-600', title: '4 new photos added to gallery.', timestamp: '1h ago' },
    { id: 3, icon: ChatBubbleIcon, iconBgColor: 'bg-purple-100 text-purple-600', title: "New message from Liam's mom.", timestamp: '3h ago' },
];

const MOCK_MESSAGES: MessageThread[] = [
    {id: 1, userName: "Liam's Mom", userAvatar: 'https://picsum.photos/seed/liam-mom/200', lastMessage: "Thanks for the update on the field trip!", timestamp: "10:45 AM"},
    {id: 2, userName: "Noah's Dad", userAvatar: 'https://picsum.photos/seed/noah-dad/200', lastMessage: "He really enjoyed the painting activity.", timestamp: "9:30 AM"},
]

const MOCK_EDUCATIONAL_CONTENT: EducationalContent[] = [
    { id: 1, title: 'Shapes & Colors Worksheet', description: 'A fun printable to help identify shapes and colors.', fileType: 'pdf', uploadedBy: 'Ms. Davis', date: '2024-07-22' },
    { id: 2, title: 'Sing-Along: The Wheels on the Bus', description: 'A video of the class singing a classic tune.', fileType: 'video', uploadedBy: 'Mr. Smith', date: '2024-07-21' },
    { id: 3, title: 'Dinosaur Coloring Pages', description: 'A set of T-Rex and Triceratops images to color.', fileType: 'image', uploadedBy: 'Ms. Davis', date: '2024-07-20' },
];

// --- VIEWS / SCREENS ---

type View = 'dashboard' | 'attendance' | 'messages' | 'gallery' | 'content' | 'timetable' | 'notifications';

const LoginScreen: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
    return (
        <div className="min-h-screen bg-indigo-600 flex flex-col justify-center items-center p-4">
            <h1 className="text-5xl font-extrabold text-white mb-2">PreschoolBright</h1>
            <p className="text-indigo-200 mb-12">Welcome! Please select your role.</p>
            <div className="w-full max-w-xs space-y-4">
                {MOCK_USERS.map(user => (
                    <button key={user.id} onClick={() => onLogin(user)} className="w-full bg-white/90 backdrop-blur-sm text-slate-800 rounded-2xl p-6 text-left flex items-center shadow-lg transition-transform transform hover:scale-105 hover:bg-white">
                        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-md" />
                        <div>
                            <p className="text-xl font-bold">{user.name}</p>
                            <p className="text-md text-indigo-500 font-semibold capitalize">{user.role}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const Header: React.FC<{ user: User, onLogout: () => void, onNotifications: () => void }> = ({ user, onLogout, onNotifications }) => (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full"/>
            <div>
                <p className="text-sm text-slate-500">Welcome back,</p>
                <h2 className="text-lg font-bold text-slate-800">{user.name}</h2>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={onNotifications} className="relative p-2 rounded-full hover:bg-slate-200 transition">
                <BellIcon className="w-6 h-6 text-slate-600"/>
                <span className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-pink-500 border-2 border-white"></span>
            </button>
            <button onClick={onLogout} className="p-2 rounded-full hover:bg-slate-200 transition">
                <LogoutIcon className="w-6 h-6 text-slate-600"/>
            </button>
        </div>
    </header>
);

const AttendanceView: React.FC<{ user: User }> = ({ user }) => {
    const [attendance, setAttendance] = useState(MOCK_ATTENDANCE);

    const toggleStatus = (studentId: number) => {
        if (user.role !== 'teacher') return;
        setAttendance(prev => prev.map(record =>
            record.studentId === studentId
                ? { ...record, status: record.status === 'present' ? 'absent' : 'present' }
                : record
        ));
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Attendance for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h2>
            <div className="grid grid-cols-3 gap-4">
                {MOCK_STUDENTS.map(student => {
                    const record = attendance.find(r => r.studentId === student.id);
                    const isPresent = record?.status === 'present';
                    return (
                        <div key={student.id} onClick={() => toggleStatus(student.id)} className={`text-center p-3 rounded-2xl transition-all ${user.role === 'teacher' ? 'cursor-pointer' : ''} ${isPresent ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'} border-2`}>
                            <img src={student.avatar} alt={student.name} className={`w-20 h-20 mx-auto rounded-full shadow-lg border-4 transition-all ${isPresent ? 'border-white' : 'border-red-200 grayscale'}`} />
                            <p className="mt-2 font-bold text-slate-700">{student.name}</p>
                            <p className={`font-semibold text-sm ${isPresent ? 'text-green-700' : 'text-red-700'}`}>{isPresent ? 'Present' : 'Absent'}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const GalleryView: React.FC = () => (
    <div className="p-4">
         <h2 className="text-2xl font-bold text-slate-800 mb-4">Event Gallery</h2>
         <div className="grid grid-cols-2 gap-4">
            {MOCK_GALLERY.map(item => (
                <div key={item.id} className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img src={item.imageUrl} alt={item.caption} className="w-full h-48 object-cover"/>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white font-bold text-sm">{item.caption}</p>
                    </div>
                </div>
            ))}
         </div>
    </div>
);

const UploadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">Upload New Content</h3>
                <button onClick={onClose}><XIcon className="w-6 h-6 text-slate-500"/></button>
            </div>
            <div className="space-y-4">
                <input type="text" placeholder="Content Title" className="w-full border border-slate-300 rounded-lg p-3"/>
                 <textarea placeholder="Description..." className="w-full border border-slate-300 rounded-lg p-3 h-24"></textarea>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <UploadIcon className="w-10 h-10 mx-auto text-slate-400"/>
                    <p className="mt-2 text-sm text-slate-500">Drag & drop or click to select a file</p>
                </div>
                <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition">Submit Content</button>
            </div>
        </div>
    </div>
);

const TimetableView: React.FC<{ user: User }> = ({ user }) => {
    const [selectedClassId, setSelectedClassId] = useState(MOCK_CLASSES[0].id);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const canUpload = user.role === 'teacher' || user.role === 'management';

    const { timetable, className } = useMemo(() => {
        let classId: number | undefined;
        if (user.role === 'management') {
            classId = selectedClassId;
        } else if (user.role === 'teacher') {
            classId = user.classId;
        } else if (user.role === 'parent') {
            const child = MOCK_STUDENTS.find(s => s.id === user.childId);
            classId = child?.classId;
        }

        const currentClass = MOCK_CLASSES.find(c => c.id === classId);

        return {
            timetable: MOCK_TIMETABLE.filter(item => item.classId === classId),
            className: currentClass?.name || 'Schedule',
        };
    }, [user, selectedClassId]);

    return (
        <div className="p-4">
            <div className="flex justify-between items-start gap-4 mb-4">
                <h2 className="text-2xl font-bold text-slate-800">Today's Schedule: <span className="text-indigo-600">{className}</span></h2>
                {canUpload && (
                    <button onClick={() => setShowUploadModal(true)} className="flex-shrink-0 flex items-center gap-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl hover:bg-indigo-700 transition">
                        <UploadIcon className="w-5 h-5" />
                        <span>Upload</span>
                    </button>
                )}
            </div>


            {user.role === 'management' && (
                <div className="flex items-center gap-2 mb-4 p-1 bg-slate-200 rounded-xl">
                    {MOCK_CLASSES.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setSelectedClassId(c.id)}
                            className={`w-full font-bold py-2 px-4 rounded-lg transition ${selectedClassId === c.id ? 'bg-white text-indigo-600 shadow' : 'text-slate-600'}`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
            )}

            <div className="space-y-3">
                {timetable.map(item => (
                    <div key={item.id} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow">
                        <div className="text-3xl">{item.icon}</div>
                        <div className="flex-grow">
                            <p className="font-bold text-slate-700">{item.activity}</p>
                            <p className="text-sm text-slate-500">{item.time}</p>
                            {user.role === 'teacher' && item.evaluation && (
                                <div className="mt-2 p-2 bg-indigo-50 rounded-lg flex justify-between items-center">
                                    <p className="text-xs text-indigo-800 flex-grow">Note: {item.evaluation}</p>
                                    <button
                                        onClick={() => alert(`Exporting evaluation for "${item.activity}"...`)}
                                        className="ml-2 p-1 rounded-full hover:bg-indigo-200 transition"
                                        aria-label="Export evaluation"
                                    >
                                        <DownloadIcon className="w-4 h-4 text-indigo-600" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
        </div>
    );
};

const MessagesView: React.FC = () => (
    <div className="p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Messages</h2>
        <div className="space-y-3">
            {MOCK_MESSAGES.map(thread => (
                <div key={thread.id} className="flex items-center gap-4 p-3 bg-white rounded-2xl shadow hover:bg-slate-50 cursor-pointer">
                    <img src={thread.userAvatar} alt={thread.userName} className="w-12 h-12 rounded-full"/>
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <p className="font-bold text-slate-700">{thread.userName}</p>
                            <p className="text-xs text-slate-400">{thread.timestamp}</p>
                        </div>
                        <p className="text-sm text-slate-500 truncate">{thread.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const NotificationsView: React.FC = () => (
    <div className="p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Notifications</h2>
        <div className="space-y-3">
            {MOCK_NOTIFICATIONS.map(n => (
                 <div key={n.id} className="flex items-center gap-4 p-3 bg-white rounded-2xl shadow">
                     <div className={`p-3 rounded-full ${n.iconBgColor}`}>
                         <n.icon className="w-6 h-6"/>
                     </div>
                     <div className="flex-grow">
                        <p className="text-slate-700">{n.title}</p>
                     </div>
                     <p className="text-xs text-slate-400 self-start">{n.timestamp}</p>
                 </div>
            ))}
        </div>
    </div>
);

const ContentView: React.FC<{ user: User }> = ({ user }) => {
    const getFileTypeIcon = (type: EducationalContent['fileType']) => {
        switch (type) {
            case 'pdf': return <DocumentTextIcon className="w-8 h-8 text-red-500" />;
            case 'video': return <CameraIcon className="w-8 h-8 text-sky-500" />;
            case 'image': return <SparklesIcon className="w-8 h-8 text-yellow-500" />;
            default: return <ClipIcon className="w-8 h-8 text-slate-500" />;
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800">Educational Content</h2>
            </div>
            <div className="space-y-3">
                {MOCK_EDUCATIONAL_CONTENT.map(content => (
                    <div key={content.id} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow">
                        <div className="p-2 bg-slate-100 rounded-full">{getFileTypeIcon(content.fileType)}</div>
                        <div className="flex-grow">
                            <p className="font-bold text-slate-800">{content.title}</p>
                            <p className="text-sm text-slate-500">{content.description}</p>
                            <p className="text-xs text-slate-400 mt-1">Uploaded by {content.uploadedBy} on {content.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const TeacherDashboard: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
    const presentCount = MOCK_ATTENDANCE.filter(r => r.status === 'present').length;
    const totalStudents = MOCK_STUDENTS.length;
    return (
        <div className="p-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl shadow p-4 text-center">
                    <p className="text-3xl font-extrabold text-indigo-600">{presentCount}/{totalStudents}</p>
                    <p className="text-sm font-semibold text-slate-500">Attendance</p>
                </div>
                 <div className="bg-white rounded-2xl shadow p-4 text-center">
                    <p className="text-3xl font-extrabold text-indigo-600">{MOCK_MESSAGES.length}</p>
                    <p className="text-sm font-semibold text-slate-500">Messages</p>
                </div>
                <button onClick={() => setView('content')} className="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition">
                     <UploadIcon className="w-8 h-8 text-indigo-600 mb-1" />
                    <p className="text-sm font-semibold text-slate-500">Upload Content</p>
                </button>
                <button onClick={() => setView('attendance')} className="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition">
                     <CheckCircleIcon className="w-8 h-8 text-green-600 mb-1" />
                    <p className="text-sm font-semibold text-slate-500">Take Attendance</p>
                </button>
            </div>
            <ActivitySuggester />
            <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Announcements</h3>
                 <div className="space-y-3">
                    {MOCK_ANNOUNCEMENTS.slice(0, 1).map(ann => (
                        <div key={ann.id} className="bg-white rounded-xl shadow p-4 border border-slate-200">
                            <h3 className="font-bold text-lg text-slate-700">{ann.title}</h3>
                            <p className="text-slate-600">{ann.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ParentDashboard: React.FC<{ user: User; setView: (view: View) => void }> = ({ user, setView }) => {
    const child = MOCK_STUDENTS.find(s => s.id === user.childId);
    const attendance = MOCK_ATTENDANCE.find(r => r.studentId === user.childId);
    if (!child) return null;
    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <img src={child.avatar} alt={child.name} className="w-24 h-24 mx-auto rounded-full shadow-lg border-4 border-white"/>
                <h2 className="text-2xl font-bold text-slate-800 mt-2">{child.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl shadow text-center ${attendance?.status === 'present' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="text-lg font-bold ${attendance?.status === 'present' ? 'text-green-800' : 'text-red-800'}">Attendance</p>
                    <p className="text-md font-semibold capitalize ${attendance?.status === 'present' ? 'text-green-600' : 'text-red-600'}">{attendance?.status || 'N/A'}</p>
                </div>
                <div className="p-4 rounded-2xl shadow bg-yellow-100 text-center">
                    <p className="text-lg font-bold text-yellow-800">Mood Today</p>
                    <p className="text-md font-semibold text-yellow-600">Happy</p>
                </div>
            </div>
             <button onClick={() => setView('content')} className="w-full bg-white rounded-2xl shadow p-4 flex items-center gap-4 hover:bg-slate-50 transition">
                <div className="p-3 bg-indigo-100 rounded-full"><DocumentTextIcon className="w-6 h-6 text-indigo-600"/></div>
                <div>
                    <h3 className="font-bold text-lg text-slate-700">Learning Materials</h3>
                    <p className="text-sm text-slate-500">View worksheets and videos</p>
                </div>
             </button>
             <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Announcements</h3>
                 <div className="space-y-3">
                    {MOCK_ANNOUNCEMENTS.slice(0, 1).map(ann => (
                        <div key={ann.id} className="bg-white rounded-xl shadow p-4 border border-slate-200">
                            <h3 className="font-bold text-lg text-slate-700">{ann.title}</h3>
                            <p className="text-slate-600">{ann.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

const ManagementDashboard: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
    const presentCount = MOCK_ATTENDANCE.filter(r => r.status === 'present').length;
    const totalStudents = MOCK_STUDENTS.length;
    const attendancePercentage = Math.round((presentCount / totalStudents) * 100);
    return (
        <div className="p-4 space-y-6">
             <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">School Overview</h3>
                 <div className="flex items-center gap-4">
                    <div className="relative">
                        <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" className="text-slate-200" fill="transparent" />
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8"
                                className="text-indigo-600"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 40}
                                strokeDashoffset={(2 * Math.PI * 40) * (1 - attendancePercentage / 100)}
                                strokeLinecap="round" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-indigo-600">{attendancePercentage}%</span>
                    </div>
                    <div>
                         <p className="text-lg font-bold text-slate-700">Today's Attendance</p>
                         <p className="text-sm text-slate-500">{presentCount} of {totalStudents} students present</p>
                    </div>
                 </div>
            </div>
             <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Management Actions</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white rounded-2xl shadow p-4 text-center hover:bg-slate-50 transition">
                         <p className="font-bold text-indigo-600">Post Announcement</p>
                    </button>
                    <button onClick={() => setView('content')} className="bg-white rounded-2xl shadow p-4 text-center hover:bg-slate-50 transition">
                         <p className="font-bold text-indigo-600">Manage Content</p>
                    </button>
                 </div>
            </div>
        </div>
    );
};


const BottomNav: React.FC<{ user: User, activeView: View, setView: (view: View) => void }> = ({ user, activeView, setView }) => {
    const navConfig: Record<Role, { id: View, icon: React.ComponentType<{className?: string}>, label: string }[]> = {
        teacher: [
            { id: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
            { id: 'timetable', icon: CalendarIcon, label: 'Schedule' },
            { id: 'attendance', icon: CheckCircleIcon, label: 'Attendance' },
            { id: 'messages', icon: ChatBubbleIcon, label: 'Messages' },
            { id: 'content', icon: DocumentTextIcon, label: 'Content' },
        ],
        parent: [
            { id: 'dashboard', icon: HomeIcon, label: 'Home' },
            { id: 'timetable', icon: CalendarIcon, label: 'Schedule' },
            { id: 'content', icon: DocumentTextIcon, label: 'Content' },
            { id: 'gallery', icon: CameraIcon, label: 'Gallery' },
        ],
        management: [
            { id: 'dashboard', icon: ChartPieIcon, label: 'Overview' },
            { id: 'timetable', icon: CalendarIcon, label: 'Schedules' },
            { id: 'attendance', icon: CheckCircleIcon, label: 'Attendance' },
            { id: 'messages', icon: ChatBubbleIcon, label: 'Comms' },
            { id: 'content', icon: DocumentTextIcon, label: 'Content' },
        ]
    };

    const navItems = navConfig[user.role];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 shadow-t-xl z-10">
            <div className="max-w-md mx-auto flex justify-around">
                {navItems.map(item => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`flex flex-col items-center justify-center text-center p-3 transition-all duration-200 relative ${isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
                        >
                            <item.icon className={`h-6 w-6 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                            <span className="text-xs font-bold">{item.label}</span>
                            {isActive && <div className="absolute top-0 h-1 w-10 bg-indigo-600 rounded-full"></div>}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default function App() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [activeView, setActiveView] = useState<View>('dashboard');

    const handleLogin = (user: User) => {
        setCurrentUser(user);
        setActiveView('dashboard');
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const renderView = () => {
        if (!currentUser) return null;
        switch (activeView) {
            case 'dashboard':
                if (currentUser.role === 'teacher') return <TeacherDashboard setView={setActiveView} />;
                if (currentUser.role === 'parent') return <ParentDashboard user={currentUser} setView={setActiveView} />;
                if (currentUser.role === 'management') return <ManagementDashboard setView={setActiveView} />;
                return null;
            case 'attendance':
                return <AttendanceView user={currentUser}/>;
            case 'gallery':
                return <GalleryView />;
            case 'timetable':
                return <TimetableView user={currentUser} />;
            case 'messages':
                return <MessagesView />;
            case 'notifications':
                return <NotificationsView />;
            case 'content':
                return <ContentView user={currentUser} />;
            default:
                return <div>Not implemented</div>;
        }
    };
    
    if (!currentUser) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <div className="max-w-md mx-auto bg-slate-100 min-h-screen">
            <Header user={currentUser} onLogout={handleLogout} onNotifications={() => setActiveView('notifications')} />
            <main className="pb-24">
                {renderView()}
            </main>
            <BottomNav user={currentUser} activeView={activeView} setView={setActiveView} />
        </div>
    );
}