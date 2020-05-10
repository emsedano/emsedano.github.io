import { DataObject } from '../shared/model/DataObject';
import { firestore } from 'firebase';

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
  startDate: Date;
  endDate: firestore.Timestamp;
  school: string;
}

export interface Experience {
  company: string;
  position: string;
  pride: string;
  projects: DataObject[];
  startDate: Date;
  endDate: Date;
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
  social: DataObject;
  techStack: string;
  softSkills: string;
}

export interface ProfileProps {
  profile: ProfileModel;
}
