import React from 'react';
import Navigationbar from '../components/navbar/Navigationbar';

const About = () => {
  return (
    <div className='about'>
      <Navigationbar />
      <div className='about-content' style={{margin: "30px 40px 0 40px"}}>
      <h1> What is Learn it?</h1>
      <p>
        Learn it offers a wide variety of organizational tools. Students are
        able to create precise and structured to-do lists, long notes, video
        links and track their habits with ease. In order to keep student on
        track, Learn it syncs their data across many devices.
      </p>
      </div>
    </div>
  );
};

export default About;
