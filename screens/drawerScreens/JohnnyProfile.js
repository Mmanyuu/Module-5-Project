import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const JohnnyProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>My Learnings</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Calendar Module:</Text>
        <Text style={styles.infoValue}>Using of Calendar in react native, as this could be our daily usage. Placing event on the day, make us aware and keep our time management well in place.</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Set static Content:</Text>
        <Text style={styles.infoValue}>Although all this event are static, which mean it is loaded on the calendar event.</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Create a Function:</Text>
        <Text style={styles.infoValue}>Learn to create a function, when on the day it does not has any event.So this will not show any error when selecting the day with no event.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
});

export default JohnnyProfile;