
import { Activity, TimeFeeling } from './types';
import { BookOpenIcon, UsersIcon, MoonIcon, BeakerIcon, HeartIcon, BriefcaseIcon, MusicalNoteIcon, CakeIcon } from '@heroicons/react/24/outline';

export const TOTAL_HOURS_IN_WEEK = 168;

export const INITIAL_ACTIVITIES: Activity[] = [
  { id: 'classes', name: 'In-Class Time', icon: BeakerIcon, hours: 15, feeling: TimeFeeling.RIGHT },
  { id: 'studying', name: 'Studying & Homework', icon: BookOpenIcon, hours: 20, feeling: TimeFeeling.RIGHT },
  { id: 'sleeping', name: 'Sleeping', icon: MoonIcon, hours: 56, feeling: TimeFeeling.RIGHT },
  { id: 'social', name: 'Socializing / Partying', icon: UsersIcon, hours: 10, feeling: TimeFeeling.RIGHT },
  { id: 'exercise', name: 'Exercise & Fitness', icon: HeartIcon, hours: 5, feeling: TimeFeeling.RIGHT },
  { id: 'work', name: 'Work / Job', icon: BriefcaseIcon, hours: 0, feeling: TimeFeeling.RIGHT },
  { id: 'hobbies', name: 'Hobbies & Relaxation', icon: MusicalNoteIcon, hours: 10, feeling: TimeFeeling.RIGHT },
  { id: 'eating', name: 'Eating & Cooking', icon: CakeIcon, hours: 14, feeling: TimeFeeling.RIGHT },
];
