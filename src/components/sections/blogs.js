/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledBlogsSection = styled.section`
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

  .blogs-grid {
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

const StyledBlog = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);
  display: inline-block;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .blog-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .blog-inner {
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

  .blog-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .blog-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
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

  .blog-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
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
    }
  }

  .blog-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }
`;

const Blogs = () => {
  const data = useStaticQuery(graphql`
    query {
      blogs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blogs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              date
              slug
            }
            html
          }
        }
      }
    }
  `);

  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealBlogs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealBlogs.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const blogs = data.blogs.edges.filter(({ node }) => node);

  const blogInner = node => {
    const { frontmatter } = node;
    const { title, date, slug } = frontmatter;

    return (
      <div className="blog-inner" key={slug}>
        <header>
          <div className="blog-top">
            <div className="folder">
              <Icon name="Note" />
            </div>
          </div>
          <h3 className="blog-title">
            <Link to={`/${slug}`}>{title}</Link>
          </h3>
        </header>
        <footer>
          <div className="blog-date">{date}</div>
        </footer>
      </div>
    );
  };

  return (
    <StyledBlogsSection id="blogs">
      <h2 className="numbered-heading" ref={revealTitle}>
        Latest Blogs
      </h2>

      <ul className="blogs-grid">
        {prefersReducedMotion ? (
          <>
            {blogs.map(({ node }) => (
              <StyledBlog key={node.frontmatter.slug}>{blogInner(node)}</StyledBlog>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {blogs.map(({ node }, i) => (
              <CSSTransition
                key={node.frontmatter.slug}
                classNames="fadeup"
                timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                exit={false}>
                <StyledBlog
                  key={node.frontmatter.slug}
                  ref={el => (revealBlogs.current[i] = el)}
                  style={{
                    transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                  }}>
                  {blogInner(node)}
                </StyledBlog>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
    </StyledBlogsSection>
  );
};

export default Blogs;
