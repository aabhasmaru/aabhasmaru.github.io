/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import mtDesc from '../mountainData';

const Hobbies = () => {
  const revealTitle = useRef(null);
  const revealHobbies = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealHobbies.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);
  return (
    <section id="hobbies" style={{ marginBottom: 180 }}>
      <h2 className="numbered-heading" ref={revealTitle}>
        My Hobbies
      </h2>
      <h2 style={{ fontWeight: 'bold', color: '#64ffda' }}>Hiking</h2>
      <p>
        Beyond my professional pursuits, I find solace and inspiration in the great outdoors,
        particularly through the invigorating activity of hiking. It is in nature's embrace that I
        discover a profound sense of tranquility and inner peace. Each hiking expedition becomes a
        personal journey, unveiling invaluable life lessons along the way. Whether faced with
        treacherous trails or challenging terrains, hiking teaches me the essence of resilience and
        self-belief. It reinforces the notion that perseverance and unwavering determination can
        lead to remarkable achievements, much like the breathtaking view that awaits at the summit.
        It is through these experiences that I am reminded of the limitless potential within each of
        us, and the realization that anything is attainable when we wholeheartedly pursue our dreams
        Till date I have complete{' '}
        <a href="http://4000footers.com/nh.shtml" target="_blank" rel="noreferrer">
          13 out of 48 Four Thousand Footers
        </a>{' '}
        in New Hampshire!
      </p>
      <div style={{ paddingTop: 60 }}>
        <Hiking />
      </div>
      <div style={{ paddingTop: 20, marginBottom: 80 }}>
        <h2 style={{ fontWeight: 'bold', color: '#64ffda' }}>Books</h2>
        <Books />
      </div>
    </section>
  );
};

export default Hobbies;

const Hiking = () => {
  const images = [
    'm1.png',
    'm2.png',
    'm3.png',
    'm4.png',
    'm1.png',
    'm2.png',
    'm3.png',
    'm4.png',
    'm1.png',
    'm2.png',
    'm3.png',
    'm4.png',
    'm1.png',
  ];
  const name = [
    'Mt Washington',
    'Mt. Adams',
    'Mt. Monroe',
    'Mt. Madison',
    'Mt. Lafayette',
    'Mt. Lincoln',
    'Mt. South Twin',
    'Mt. North Twin',
    'Mt. Garfield',
    'Mt. Liberty',
    'Mt. Flume',
    'Mt. Galehead',
    'Mt. Tacumseh',
  ];
  // const mainImages = [
  //   'hiking-images/Mt. Washington.jpeg',
  //   'hiking-images/Mt. Adams.jpeg',
  //   'hiking-images/Mt. Monroe.jpeg',
  //   'hiking-images/Mt. Madison.jpeg',
  //   'hiking-images/Mt. Lafayette.jpeg',
  //   'hiking-images/Mt. Lincoln.jpeg',
  //   'hiking-images/Mt. South Twin.jpg',
  //   'hiking-images/Mt. North Twin.jpeg',
  //   'hiking-images/Mt. Garfield.jpeg',
  //   'hiking-images/Mt. Liberty.jpeg',
  //   'hiking-images/Mt. Flume.jpeg',
  //   'hiking-images/Mt. Galehead.jpg',
  //   'hiking-images/Mt. Tacumseh.jpeg',
  // ];

  const circleStyle = {
    width: '100%',
    display: 'flex',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
  };

  const individualCircleStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s',
    margin: 20,
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  };

  const hoverImageStyle = {
    borderRight: '4px solid #64ffda', // Adjust border properties as needed
    transform: 'translate(-8px, -5px)',
  };

  const mainImageStyle = {
    width: '350px',
    height: '420px',
    paddingRight: 20,
    margin: 20,
  };

  const [selectedMountain, setSelectedMountain] = useState(null);

  const handleImageClick = index => {
    setSelectedMountain(mtDesc[index]);
  };
  const circleContainerStyle = {
    width: '100%',
    //  overflowX: images.length > 12 ? 'scroll' : 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #ddd',
  };
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleImageHover = index => {
    setHoveredIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div style={circleContainerStyle}>
      <div style={circleStyle}>
        {images.map((image, index) => (
          <div>
            <div
              style={{
                ...individualCircleStyle,
                ...(index === hoveredIndex && hoverImageStyle),
              }}
              key={index}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={handleImageLeave}
              onFocus={() => handleImageHover(index)}
              onBlur={handleImageLeave}
              onClick={() => handleImageClick(index)}>
              <img src={image} alt={`${index + 1}`} style={imageStyle} />
            </div>
            <div style={{ textAlign: 'center', padding: 10 }}>{name[index]}</div>
          </div>
        ))}
      </div>
      {selectedMountain && (
        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }}>
          <img src={selectedMountain.image} alt="mounatin" style={mainImageStyle} />
          <div style={{ marginLeft: '20px' }}>
            {' '}
            {/* Add some space between image and the details */}
            <h3>{selectedMountain.name}</h3>
            <p>
              <strong>Elevation:</strong> {selectedMountain.elevation}
            </p>
            <p>
              <strong>Description:</strong> {selectedMountain.shortDescription}
            </p>
            <p>
              <strong>Trails:</strong>
              <ul>
                {selectedMountain.trails.map(trail => (
                  <li key={trail}>{trail}</li>
                ))}
              </ul>
            </p>
            <p>
              <strong>Time to Complete:</strong> {selectedMountain.timeToComplete}
            </p>
            <p>
              <strong>What I Learned:</strong> {selectedMountain.somethingILearned}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Books = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const rectanglesData = [
    {
      image: 'b2.png',
      name: 'Financial Shenanigans: How to Detect Accounting Gimmicks & Fraud in Financial Reports',
      author: 'Howard Mark Schilit',
      text:
        ' It is a captivating exposé that unveils the deceptive tactics and manipulative practices employed by corporations to distort financial statements, providing readers with a keen insight into the dark underbelly of corporate finance. With meticulous analysis and real-world examples, it equips readers with the knowledge and tools necessary to detect and navigate through the intricate web of financial deceit.',
      link: 'https://a.co/d/icrszul',
    },
    {
      image: 'b3.jpeg',
      name: 'Coffee Can Investing',
      author: 'Saurabh Mukharjea',
      text:
        'It is a compelling book that guides and presents a unique and simplified approach to long-term investing, emphasizing the power of patience and compounding. With insightful anecdotes and practical strategies, the book encourages readers to focus on high-quality stocks and hold them for extended periods, leading to potentially significant wealth creation over time.',
      link: 'https://a.co/d/iHBR0qN',
    },
    {
      image: 'b1.jpeg',
      name: 'The Power of Habit',
      author: 'Charles Duhigg',
      text:
        'The book unveils the profound influence of our daily routines, offering captivating insights into the science of habit formation and practical strategies for personal transformation. Through compelling stories and research-backed principles, it empowers readers to understand and harness the power of habits to achieve lasting change and unlock their full potential.',
      link: 'https://a.co/d/1DzYqne',
    },
  ];

  const handleImageHover = index => {
    setHoveredIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      {rectanglesData.map((data, index) => (
        <>
          <div
            key={index}
            style={{
              width: '300px',
              height: hoveredIndex === index ? '403px' : '403px',
              margin: '30px',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              transition: 'transform 0.5s',
              transform: hoveredIndex === index ? 'translateY(-20px)' : 'none',
              position: 'relative',
            }}>
            <div
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '401px',
              }}>
              <a href={data.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={data.image}
                  alt={`Rectangle ${index + 1}`}
                  style={{ width: '100%', height: '100%' }}
                  onMouseEnter={() => handleImageHover(index)}
                  onMouseLeave={handleImageLeave}
                />
              </a>
              {hoveredIndex === index && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-120px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}>
                  <img
                    src="hand.png"
                    alt="Hand Holding"
                    style={{ width: '220px', height: '160px' }}
                  />
                  <div
                    style={{
                      width: '300%',
                      position: 'absolute',
                      bottom: '20',
                      left: data.author === 'Howard Mark Schilit' ? '0' : '-10',
                      right: '0',
                      padding: '10px',
                      marginBottom: '90',
                      display: hoveredIndex === index ? 'block' : 'none',
                      transition: 'opacity 0.5s',
                      backgroundColor: '#112240',
                    }}>
                    <h4 style={{ color: '#64ffda' }}>{data.name}</h4>
                    <h4>{data.author}</h4>
                    <text style={{ color: '#ffffff' }}>{data.text}</text>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
