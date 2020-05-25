import React, { useState } from 'react';
import { ProfileProps, Education as EducationModel } from '../../core/ProfileModel';
import { dateRanges } from '../../shared/utils/dateUtils';
import { ButtonLink } from '../../shared/components/button-link/ButtonLink';

enum EducationType {
  college = 'college',
  cert = 'cert',
}

const isCollege = ({ type }: Partial<EducationModel>) => type === EducationType.college;
const isCert = ({ type }: Partial<EducationModel>) => type === EducationType.cert;

function EducationItem({ education }: { education: EducationModel }) {
  return (
    <div className="education">
      <p className="subtitle">
        <strong>{education.degree}</strong>{' '}
        <small className="content is-small">
          {dateRanges(' - ', education?.startDate?.toDate(), education?.endDate?.toDate())}
        </small>
      </p>
      <p className="subtitle">{education.school}</p>
    </div>
  );
}

export function Education({ profile }: ProfileProps) {
  const [showMore, setShowMore] = useState(false);
  const [latestEducation, ...formerEducation] = profile.education.filter(isCollege);
  const certs = profile.education.filter(isCert);
  const formerCollegeAndCerts = [...formerEducation, ...certs];
  return (
    <div className="content">
      <EducationItem education={latestEducation} />

      {formerCollegeAndCerts?.length ? (
        <div className="content">
          <p className="no-print">
            <small>
              <ButtonLink onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show less...' : 'Show more...'}
              </ButtonLink>
            </small>
          </p>
          {showMore
            ? formerCollegeAndCerts.map((education, index) => <EducationItem key={index} education={education} />)
            : ''}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
