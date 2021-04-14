import React from 'react';
import {  ScrollView } from 'react-native';
// import { Divider } from 'react-native-paper';

import Meeting_List from '../../components/Meeting_List';
import Map from '../../components/Map';

const Home = () => {
  return (
    <ScrollView>
      <Meeting_List />
      {/* <Divider /> */}
      <Map />
    </ScrollView>
  );
}

export default Home;


