import React from 'react';
import { ProfileContext } from '../core/ProfileContext';
import { Profile } from './profile/Profile';
import { ProfileModel } from '../core/ProfileModel';
import { Tile } from '../shared/components';
import { Education } from './education/Education';
import { Experience } from './experience/Experience';

import ReactMarkdown from 'react-markdown';

const input = `
# Live demo

Changes are automatically rendered as you type.

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`;

export function Resume() {
  return (
    <ProfileContext.Consumer>
      {(profile: ProfileModel) => {
        return (
          <div>
            <section className="section">
              <Profile profile={profile}></Profile>
            </section>
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
                        <ReactMarkdown source={profile.techStack.replace(/\\n/gi, '\n')} escapeHtml={false} />
                      </div>
                    </Tile>
                  </Tile>
                  <Tile className="is-parent">
                    <Tile title="Other skills" className="is-child">
                      <div className="markdown">
                        <div className="markdown">
                          <ReactMarkdown source={profile.softSkills.replace(/\\n/gi, '\n')} escapeHtml={false} />
                        </div>
                      </div>
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
                    <Tile title="current work" className="is-child">
                      <Experience profile={profile} />
                    </Tile>
                  </Tile>
                  <Tile className="is-parent">
                    <Tile title="Articles & portfolio" className="is-child markdown">
                      <ul>
                        {profile.articles.map((article, index) => {
                          return (
                            <li>
                              <a key={index} href={article.source}>
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
                      <div className="markdown">
                        <ReactMarkdown source={'#holo'} escapeHtml={false} />
                      </div>
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
