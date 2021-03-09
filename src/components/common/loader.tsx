import { Preloader, Circles } from 'react-preloader-icon';
import React from 'react';

const Loader = () => (
  <Preloader use={Circles} size={60} strokeWidth={6} strokeColor="#fff" duration={3000} />
);

export default Loader;
