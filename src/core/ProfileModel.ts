import { Data } from '../shared/model/DataObject';
import { Firestore, Timestamp } from 'firebase/firestore';

export interface Social {
  facebook: string;
  linkedIn: string;
  instagram: string;
  github: string;
  twitter: string;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface Education {
  degree: string;
  type: 'cert' | 'college';
  startDate:  Timestamp;
  endDate: Timestamp;
  school: string;
}

export interface Experience {
  company: string;
  position: string;
  pride: string;
  projects: Data[];
  startDate: Timestamp;
  endDate: Timestamp;
}

export interface Articles {
  text: string;
  source: string;
}

export interface ProfileModel {
  name: string;
  about: string;
  career: string;
  experience: Experience[];
  articles: Articles[];
  education: Education[];
  contact: Contact;
  social: Data;
  techStack: string;
  softSkills: string;
}

export interface ProfileProps {
  profile: ProfileModel;
}
