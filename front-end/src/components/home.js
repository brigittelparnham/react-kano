import React from 'react';
import NavBar from './navBar';
import Feed from './feed';

const Home = props => {

  return(
  <>
    <NavBar user={props.user} />
    <Feed />
  </>
  );

}

export default Home;