import React from 'react';
import { ProfileProps, Experience as ExperienceModel } from '../../core/ProfileModel';
import { MarkdownContent } from '../../shared/components/markdown-content/markdown-content';
import { dateRanges } from '../../shared/utils/dateUtils';
import './Experience.scss';

function Experience({ experience, className = '' }: { experience: ExperienceModel; className?: string }) {
  const css = `experience ${className}`;
  return (
    <div className={css}>
      <p className="subtitle">
        <strong>{experience.company}</strong>{' '}
        <small className="content is-small">
          {dateRanges(' - ', experience.startDate.toDate(), experience?.endDate?.toDate())}
        </small>
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
        return <Experience key={index} className="additional-experience" experience={experience} />;
      })}
    </div>
  );
}
