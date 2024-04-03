import React, { useEffect, useRef } from 'react';
import MyImage from '../../images/me.jpg';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
// const StyledPic = styled.div`
//   position: relative;
//   max-width: 300px;

//   @media (max-width: 768px) {
//     margin: 50px auto 0;
//     width: 70%;
//   }

//   .wrapper {
//     ${({ theme }) => theme.mixins.boxShadow};
//     display: block;
//     position: relative;
//     width: 100%;
//     border-radius: var(--border-radius);
//     background-color: var(--green);

//     &:hover,
//     &:focus {
//       outline: 0;
//       transform: translate(-4px, -4px);

//       &:after {
//         transform: translate(8px, 8px);
//       }

//       .img {
//         filter: none;
//         mix-blend-mode: normal;
//       }
//     }

//     .img {
//       position: relative;
//       border-radius: var(--border-radius);
//       mix-blend-mode: multiply;
//       filter: grayscale(100%) contrast(1);
//       transition: var(--transition);
//     }

//     &:before,
//     &:after {
//       content: '';
//       display: block;
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       border-radius: var(--border-radius);
//       transition: var(--transition);
//     }

//     &:before {
//       top: 0;
//       left: 0;
//       background-color: var(--navy);
//       mix-blend-mode: screen;
//     }

//     &:after {
//       border: 2px solid var(--green);
//       top: 14px;
//       left: 14px;
//       z-index: -1;
//     }
//   }
// `;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }
  .container {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  .border {
    height: 369px;
    width: 290px;
    background: transparent;
    border-radius: 10px;
    transition: border 1s;
    position: relative;
  }

  .border:hover {
    border: 1px solid white;
  }

  .card {
    height: 379px;
    width: 300px;
    background: grey;
    border-radius: 10px;
    transition: background 0.8s;
    overflow: hidden;
    background: black;
    box-shadow: 0 70px 63px -60px #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .card0 {
    background: url(${MyImage}) center center no-repeat;
    background-size: 300px;
  }

  .card0:hover {
    background: url(${MyImage}) left center no-repeat;
    background-size: 600px;
  }

  h2 {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: white;
    margin: 20px;
    opacity: 0;
    transition: opacity 1s;
  }

  .card0:hover h2 {
    opacity: 1;
  }

  .fa {
    opacity: 0;
    transition: opacity 1s;
  }

  .card0:hover .fa {
    opacity: 1;
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Business Analysis',
    'Data Analysis',
    'Project Management',
    'Product Management',
    'SDLC',
    'Agile Methodology',
    'Scrum Master',
    'JIRA',
    'Accounting',
    'Leadership',
    'Critical-thinking',
    'Financial Report Analysis',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I'm Aabhas Maru, a Business Analysis enthusiast based in Boston, MA. I earned a
              Master's in Project Management with a focus on Business Analysis from Northeastern
              University. Prior to that, I studied Business Management at the Narsee Monjee
              Institute of Management Studies and Finance & Accounting at the Prestige Institute of
              Management & Research. My professional journey includes successful roles as a Project
              Management Co-op at Tobin Scientific, where I have successfully implemented Inventory
              Management and ERP software and as a Financial Analyst at Arihant Steels, where
              I managed financial data, tax returns, and financial statements. I'm dedicated to
              data-driven decision-making, innovation, and excellence, and I'm eager to apply my
              skills and experience to new challenges in project management and business analysis.
            </p>

            {/* <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://us.mullenlowe.com/">an advertising agency</a>,{' '}
              <a href="https://starry.com/">a start-up</a>,{' '}
              <a href="https://www.apple.com/">a huge corporation</a>, and{' '}
              <a href="https://scout.camd.northeastern.edu/">a student-led design studio</a>. My
              main focus these days is building accessible, inclusive products and digital
              experiences at <a href="https://upstatement.com/">Upstatement</a> for a variety of
              clients.
            </p> */}

            {/* <p>
                I also recently{' '}
                <a href="https://www.newline.co/courses/build-a-spotify-connected-app">
                  launched a course
                </a>{' '}
                that covers everything you need to build a web app with the Spotify API using Node
                &amp; React.
              </p> */}

            <p>Some skills that I posses :</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        {/* <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic> */}
        <StyledPic>
          <div className="container">
            <div className="card card0">
              <div className="border">
                <h2>Aabhas Maru</h2>
              </div>
            </div>
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
