import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import pickupData from '../data/pickup-data.json';
import { format, isSameDay, isSameHour } from 'date-fns';
import HeatMap from '@cawfree/react-native-heat-map';

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    ...StyleSheet.absoluteFillObject,
    height: 700,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const clampDate = d => format(d, 'dd/MM-HH');
console.log(Object.keys(pickupData).filter(e => e.startsWith('07')));

const useDatePickups = targetDate => {
  const [pickups, setPickups] = useState([]);
  const clampedDate = clampDate(targetDate);

  useEffect(() => {
    const getPickupsFromDate = async () => {
      const zz = pickupData[clampedDate] || pickupData['07/02-02'];
      console.log({ zz });
      setPickups(zz);
    };
    getPickupsFromDate();
  }, [targetDate]);

  return pickups;
};

export default () => {
  const [targetDate, setTargetDate] = useState(new Date());
  console.log('iaiai');
  const datePickups = useDatePickups(targetDate);
  console.log({ datePickups });

  return (
    <View style={styles.container}>
      {/* <MapView
        //   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 40.7306,
          longitude: -73.935242,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        <Heatmap />
      </MapView> */}
      <HeatMap
        // pointerEvents="box-only"
        style={{
          flex: 1,
        }}
        data={[
          [
            -3.0118499, // longitude
            53.4139281, // latitude
            20, // intensity
          ],
        ]}
        region={{
          longitude: -3.0118499,
          latitude: 53.4139281,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      />
    </View>
  );
};
