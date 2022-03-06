import React from 'react';
import { ProfileContext } from '../core/ProfileContext';
import { ProfileModel } from '../core/ProfileModel';
import { Tile } from '../shared/components';
import { Education } from './education/Education';
import { RecentExperience, AdditionalExperience } from './experience/Experience';
import ReactMarkdown from 'react-markdown';
import { MarkdownContent } from '../shared/components/markdown-content/markdown-content';
import rehypeRaw from 'rehype-raw';

// import markdownText from './__mocks__/markdownText';

export function Resume() {
  return (
    <ProfileContext.Consumer>
      {(profile: ProfileModel) => {
        return (
          <div className="container">
            <section className="section no-padding-top">
              <div className="columns">
                <div className="column">
                  <Tile className="is-parent">
                    <Tile title="About" className="is-child">
                      <div>{profile.about}</div>
                    </Tile>
                  </Tile>
                  <Tile className="is-parent">
                    <Tile title="languages & technologies" className="is-child">
                      <div className="markdown">
                        <ReactMarkdown
                          children={profile.techStack.replace(/\\n/gi, '\n')}
                          rehypePlugins={[rehypeRaw]}
                        />
                      </div>
                    </Tile>
                  </Tile>
                  <Tile className="is-parent">
                    <Tile title="Other skills" className="is-child">
                      <MarkdownContent content={profile.softSkills} />
                    </Tile>
                  </Tile>
                </div>
                <div className="column">
                  <Tile className="is-parent">
                    <Tile title="Education" className="is-child">
                      <Education profile={profile} />
                    </Tile>
                  </Tile>
                  <Tile className="is-parent">
                    <Tile title="current job" className="is-child">
                      <RecentExperience profile={profile} />
                    </Tile>
                  </Tile>
                  <Tile className="is-parent">
                    <Tile title="Articles & portfolio" className="is-child markdown">
                      <ul>
                        {profile.articles.map((article, index) => {
                          return (
                            <li key={index}>
                              <a target="_blank" rel="noopener noreferrer" href={article.source}>
                                {article.text}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </Tile>
                  </Tile>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <Tile className="is-parent">
                    <Tile title="Additional experience" className="is-child">
                      <AdditionalExperience profile={profile} />
                    </Tile>
                  </Tile>
                </div>
              </div>
            </section>
          </div>
        );
      }}
    </ProfileContext.Consumer>
  );
}
