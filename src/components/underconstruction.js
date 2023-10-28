// // import React, { useState, useEffect } from 'react';

// // const ConstructionClock = () => {
// //   const [time, setTime] = useState(new Date());

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const getRotation = () => {
// //     const seconds = time.getSeconds();
// //     const minutes = time.getMinutes();
// //     const hours = time.getHours();
// //     return {
// //       secondsRotation: (360 * seconds) / 60,
// //       minutesRotation: (360 * (minutes + seconds / 60)) / 60,
// //       hoursRotation: (360 * ((hours % 12) + minutes / 60)) / 12,
// //     };
// //   };

// //   const { secondsRotation, minutesRotation, hoursRotation } = getRotation();

// //   const styles = {
// //     clockContainer: {
// //       position: 'relative',
// //       width: '250px',
// //       height: '250px',
// //       borderRadius: '50%',
// //       border: '2px solid white',
// //       margin: '0 auto',
// //     },
// //     hand: (rotation, color, width = 2, length = '50%') => ({
// //       position: 'absolute',
// //       bottom: '50%',
// //       left: '50%',
// //       transform: `translateX(-50%) rotate(${rotation}deg)`,
// //       height: length,
// //       width: `${width}px`,
// //       backgroundColor: color,
// //       transformOrigin: '50% 100%',
// //     }),
// //     circle: {
// //       position: 'absolute',
// //       bottom: '50%',
// //       left: '50%',
// //       width: '10px',
// //       height: '10px',
// //       borderRadius: '50%',
// //       backgroundColor: 'white',
// //       transform: 'translate(-50%, 50%)',
// //     },
// //   };

// //   return (
// //     <div style={styles.clockContainer}>
// //       <div style={styles.hand(hoursRotation, 'black', 6, '40%')}></div>
// //       <div style={styles.hand(minutesRotation, 'black', 4)}></div>
// //       <div style={styles.hand(secondsRotation, 'red', 2)}></div>
// //       <div style={styles.circle}></div>
// //     </div>
// //   );
// // };

// // export default ConstructionClock;
// import React, { useState, useEffect } from 'react';

// const CustomBorderClock = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const getRotation = () => {
//     const seconds = time.getSeconds();
//     const minutes = time.getMinutes();
//     const hours = time.getHours();
//     return {
//       secondsRotation: (360 * seconds) / 60,
//       minutesRotation: (360 * (minutes + seconds / 60)) / 60,
//       hoursRotation: (360 * ((hours % 12) + minutes / 60)) / 12,
//     };
//   };

//   const { secondsRotation, minutesRotation, hoursRotation } = getRotation();

//   const styles = {
//     clockContainer: {
//       position: 'relative',
//       width: '210px',
//       height: '210px',
//       borderRadius: '50%',
//       margin: '0 auto',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     dash: rotation => ({
//       position: 'absolute',
//       width: '2px',
//       height: '10px',
//       backgroundColor: 'white',
//       transform: `rotate(${rotation}deg) translate(120px)`,
//       transformOrigin: 'center',
//     }),
//     hand: (rotation, color, width = 2, length = '50%') => ({
//       position: 'absolute',
//       bottom: '50%',
//       left: '50%',
//       transform: `translateX(-50%) rotate(${rotation}deg)`,
//       height: length,
//       width: `${width}px`,
//       backgroundColor: color,
//       transformOrigin: '50% 100%',
//     }),
//     circle: {
//       position: 'absolute',
//       bottom: '50%',
//       left: '50%',
//       width: '10px',
//       height: '10px',
//       borderRadius: '50%',
//       backgroundColor: 'white',
//       transform: 'translate(-50%, 50%)',
//     },
//     text: {
//       position: 'absolute',
//       bottom: '45%',
//       left: '50%',
//       transform: 'translate(-50%, 50%)',
//       fontSize: '16px',
//     },
//   };

//   return (
//     <div style={styles.clockContainer}>
//       {[...Array(60)].map((_, i) => (
//         <div key={i} style={styles.dash(i * 6)}></div>
//       ))}
//       <div style={styles.hand(hoursRotation, 'black', 6, '40%')}></div>
//       <div style={styles.hand(minutesRotation, 'black', 4)}></div>
//       <div style={styles.hand(secondsRotation, 'red', 2)}></div>
//       <div style={styles.circle}></div>
//       <div style={styles.text}>Under Construction</div>
//     </div>
//   );
// };

// export default CustomBorderClock;

import React, { useState, useEffect } from 'react';

const CustomBorderClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRotation = () => {
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();
    return {
      secondsRotation: (360 * seconds) / 60,
      minutesRotation: (360 * (minutes + seconds / 60)) / 60,
      hoursRotation: (360 * ((hours % 12) + minutes / 60)) / 12,
    };
  };

  const { secondsRotation, minutesRotation, hoursRotation } = getRotation();

  const styles = {
    clockContainer: {
      position: 'relative',
      width: '250px', // Increased size
      height: '250px', // Increased size
      borderRadius: '50%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.5, // Faded
    },
    dash: rotation => ({
      position: 'absolute',
      width: '3px',
      height: '15px',
      backgroundColor: 'white',
      transform: `rotate(${rotation}deg) translate(190px)`,
      transformOrigin: 'center',
    }),
    hand: (rotation, color, width = 2, length = '70%') => ({
      position: 'absolute',
      bottom: '50%',
      left: '50%',
      transform: `translateX(-50%) rotate(${rotation}deg)`,
      height: length,
      width: `${width}px`,
      backgroundColor: color,
      transformOrigin: '50% 100%',
    }),
    circle: {
      position: 'absolute',
      bottom: '50%',
      left: '50%',
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      backgroundColor: 'white',
      transform: 'translate(-50%, 50%)',
    },
    text: {
      position: 'absolute',
      bottom: '45%',
      left: '50%',
      transform: 'translate(-50%, 50%)',
      fontSize: '55px', // Increased size
      fontWeight: 'bold', // More visibility
      color: 'white', // More visibility
      opacity: 1, // Full opacity
    },
  };

  return (
    <div style={styles.clockContainer}>
      {[...Array(60)].map((_, i) => (
        <div key={i} style={styles.dash(i * 6)}></div>
      ))}
      <div style={styles.hand(hoursRotation, 'black', 8, '55%')}></div>
      <div style={styles.hand(minutesRotation, 'black', 5)}></div>
      <div style={styles.hand(secondsRotation, 'red', 3)}></div>
      <div style={styles.circle}></div>
      <div style={styles.text}>Under Construction</div>
    </div>
  );
};

export default CustomBorderClock;





