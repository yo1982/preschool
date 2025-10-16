export type Role = 'teacher' | 'parent' | 'management';

export interface User {
  id: number;
  name: string;
  role: Role;
  avatar: string;
  childId?: number; // For parents
  classId?: number; // For teachers
}

export interface Class {
    id: number;
    name: string;
}

export interface Student {
  id: number;
  name: string;
  avatar: string;
  classId: number;
}

export interface DailyReport {
  id: number;
  studentId: number;
  date: string;
  mood: 'happy' | 'calm' | 'sad' | 'energetic' | 'tired';
  meals: {
    breakfast: boolean;
    lunch: boolean;
    snack: boolean;
    details: string;
  };
  nap: {
    startTime: string;
    endTime: string;
  };
  activities: string;
  notes: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface ActivityIdea {
  title: string;
  description: string;
}

export interface TimetableEntry {
  id: number;
  classId: number;
  time: string;
  activity: string;
  icon: string;
  evaluation?: string;
}

export interface AttendanceRecord {
  studentId: number;
  date: string;
  status: 'present' | 'absent';
}

export interface MessageThread {
    id: number;
    userName: string;
    userAvatar: string;
    lastMessage: string;
    timestamp: string;
}

export interface GalleryItem {
  id: number;
  imageUrl: string;
  caption: string;
  date: string;
}

export interface Notification {
    id: number;
    icon: React.ComponentType<{className?: string}>;
    iconBgColor: string;
    title: string;
    timestamp: string;
}

export interface EducationalContent {
  id: number;
  title: string;
  description: string;
  fileType: 'pdf' | 'video' | 'image' | 'document';
  uploadedBy: string;
  date: string;
}