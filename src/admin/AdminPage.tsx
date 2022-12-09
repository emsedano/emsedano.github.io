import React, { Fragment } from 'react';
import { LoginPage } from '../login/LoginPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirebase } from '../firebase/context';
import { useProfile, ProfileStateModel } from '../core/ProfileContext';
import { ExperienceEditor } from './editors/ExperienceEditor';
import { useSideBar, SideBarProvider } from './SideBarContext';
import { EXPERIENCE_TEMPLATE, PROFILE_TEMPLATE, ARTICLES_TEMPLATE, EDUCATION_TEMPLATE } from './model';
import { Data } from '../shared/model/Data';
import { DocumentRepositoryService } from '../core/DocumentRepository';

export function AdminPage() {
  const { authService } = getFirebase();
  const [user, loading] = useAuthState(authService.auth);
  const profileState = useProfile();

  if (loading) return <div>Loading</div>;

  const content = user ? (
    <SideBarProvider>
      <EditForm {...profileState} />{' '}
    </SideBarProvider>
  ) : (
    <LoginPage />
  );

  return (
    <div className="container">
      <div className="section">{content}</div>
    </div>
  );
}

const COLUMNS_MAP = {
  profile: PROFILE_TEMPLATE,
  experience: EXPERIENCE_TEMPLATE,
  education: EDUCATION_TEMPLATE,
  articles: ARTICLES_TEMPLATE,
};

function EditForm({ profile, loadingStatus }: ProfileStateModel) {
  const { active } = useSideBar();

  if (profile == null) {
    return <h1 className="title">{loadingStatus}</h1>;
  }
  let columns = COLUMNS_MAP[active] ?? [];
  let data: Data[] = [profile];

  if (['experience', 'education', 'articles'].includes(active)) {
    data = [...profile[active].map(x => ({ ...x }))];
  }

  const dataRepository = new DocumentRepositoryService(getFirebase());
  const dataSaver = async ({ id, ...doc }) => {
    try {
      await dataRepository.update(active, id, doc);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="columns">
      <div className="column is-3">
        <aside className="menu">
          <SideBar />
        </aside>
      </div>
      <div className="column is-9">
        {data.map((item, index) => {
          return (
            <Fragment key={item.id ?? index}>
              <ExperienceEditor value={item} columns={columns} docSaver={dataSaver} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function SideBar() {
  const { active, activate } = useSideBar();
  return (
    <ul className="menu-list">
      <li>
        <a onClick={activate('profile')} className={active === 'profile' ? 'is-active' : ''}>
          Profile
        </a>
        <a onClick={activate('education')} className={active === 'education' ? 'is-active' : ''}>
          Education
        </a>
        <a onClick={activate('experience')} className={active === 'experience' ? 'is-active' : ''}>
          Experience
        </a>
        <a onClick={activate('articles')} className={active === 'articles' ? 'is-active' : ''}>
          Articles
        </a>
      </li>
    </ul>
  );
}
