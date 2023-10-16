import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledBlogPost = styled.div`
  padding: 100px 0;
  background-color: #0a192f;
  color: var(--lightest-slate);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
    margin-bottom: 10px;
    color: var(--green);
  }

  p {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .blog-content {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-top: 20px;
    max-width: 800px;
    width: 100%;
    padding: 0 20px;
  }

  .links {
    margin-top: 40px;
    a {
      ${({ theme }) => theme.mixins.flexCenter};
      margin-right: 20px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const BlogPostTemplate = ({ location, data }) => {
  const { markdownRemark } = data;
  const { html, frontmatter } = markdownRemark;
  const { title, date } = frontmatter;
  const revealTitle = useRef(null);
  const revealContent = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealContent.current, srConfig(200, 0));
  }, []);
  return (
    <Layout location={location}>
      <StyledBlogPost>
        <h1 ref={revealTitle}>{title}</h1>
        <p>{date}</p>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: html }}
          ref={revealContent}
        />
      </StyledBlogPost>
    </Layout>
  );
};

// Add prop types validation
BlogPostTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
export default BlogPostTemplate;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        title
        slug
      }
    }
  }
`;
