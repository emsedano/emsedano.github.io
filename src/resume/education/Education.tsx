import React, { useState } from 'react';

import { ProfileProps, Education as EducationModel } from '../../core/ProfileModel';
import { getMonth } from '../../shared/utils/getMonthName';

import './Education.scss';

function EducationItem({ education }: { education: EducationModel }) {
  const endDate = education.endDate.toDate();
  const month = getMonth(endDate.getMonth());
  const year = endDate.getFullYear();
  return (
    <div className="education">
      <p>
        <strong>{education.degree}</strong>
      </p>
      <p>{education.school}</p>
      <p>
        {month}, {year}
      </p>
    </div>
  );
}

export function Education({ profile }: ProfileProps) {
  const [showMore, setShowMore] = useState(false);

  const [latestEducation, ...formerEducation] = profile.education;
  return (
    <div className="content">
      <EducationItem education={latestEducation} />

      {formerEducation && formerEducation.length ? (
        <div className="content">
          <p>
            <small>
              <a onClick={() => setShowMore(!showMore)}>{showMore ? 'Show less...' : 'Show more...'}</a>
            </small>
          </p>
          {showMore
            ? formerEducation.map((education, index) => <EducationItem key={index} education={education} />)
            : ''}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
