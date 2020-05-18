import React from 'react';
import { ProfileProps, Experience as ExperienceModel } from '../../core/ProfileModel';
import { MarkdownContent } from '../../shared/components/markdown-content/markdown-content';

function Experience({ experience, index = 0 }: { experience: ExperienceModel; index?: number }) {
  return (
    <div className="experience">
      <p className="subtitle">
        <strong>{experience.company}</strong>
      </p>
      <p className="subtitle">{experience.position}</p>
      <MarkdownContent content={experience.pride} />
    </div>
  );
}

export function RecentExperience({ profile }: ProfileProps) {
  const [recentExperience] = profile.experience;
  return <Experience experience={recentExperience} />;
}

export function AdditionalExperience({ profile }: ProfileProps) {
  const additionalExperience = [...profile.experience];
  additionalExperience.shift();
  return (
    <div>
      {additionalExperience.map((experience, index) => {
        return <Experience key={index} experience={experience} />;
      })}
    </div>
  );
}
