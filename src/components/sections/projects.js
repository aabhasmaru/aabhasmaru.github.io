/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  span {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      span {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    span {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      color: var(--lightest-slate);

      &:hover {
        color: var(--green); /* Change color on hover */
      }

      &:visited {
        color: var(--green); /* Change color after visiting */
      }
    }
  }

  .project-description {
    margin-right: 20px;
    color: var(--light-slate);
    font-size: 17px;

    span {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              cta
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);

  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { title, tech, cta } = frontmatter;
    const rawText = new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
    const words = rawText.split(/\s+/);
    const shouldTruncate = words.length > 21;

    const [isExpanded, setIsExpanded] = useState(false);
    const displayedHtml =
      shouldTruncate && !isExpanded ? `${words.slice(0, 21).join(' ')}...` : html;

    return (
      <>
        <div className="project-inner">
          <header>
            <div className="project-top">
              <div className="folder">
                <Icon name="Folder" />
              </div>
            </div>

            <h3 className="project-title">
              <span onClick={() => openDocuments(cta)} style={{ cursor: 'pointer' }}>
                {title}
              </span>
            </h3>

            {/* <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} /> */}
            <div
              className="project-description"
              dangerouslySetInnerHTML={{ __html: displayedHtml }}
            />
          </header>

          <footer>
            {tech && (
              <ul className="project-tech-list">
                {tech.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            )}
          </footer>
        </div>
        <div>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                margin: '10px',
                position: 'absolute',
                top: isExpanded ? '900px' : '270px',
                backgroundColor: 'transparent',
                color: '#64ffda',
                fontWeight: 300,
              }}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Noteworthy Projects</h2>

      <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledProjectsSection>
  );
  function openDocuments(cta) {
    const documentLinks = Array.isArray(cta) ? cta : [cta];
    documentLinks.forEach(link => {
      window.open(link, '_blank', 'noopener noreferrer');
    });
  }
};

export default Projects;
