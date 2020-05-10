import React from 'react';
import { ProfileProps } from '../../core/ProfileModel';
export function Experience({ profile }: ProfileProps) {
  const [recentExperience] = profile.experience;
  return <div className="experience">{recentExperience.company}</div>;
}
