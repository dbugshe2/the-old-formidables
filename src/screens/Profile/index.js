import React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'galio-framework';
import styles from './styles';
import PageWrapper from '../../components/PageWrapper';
import TopBar from '../../components/TopBar';
import BottomSheet from './BottomSheet';
const ProfileText = props => {
  return (
    <View>
      <Text style={styles.ProfileText} muted color="white">
        {props.title}
      </Text>
      <Text style={styles.ProfileText} p bold color="white">
        {props.answer}
      </Text>
    </View>
  );
};

const Profile = props => {
  const user = props.navigation.getParam('user');
  const abbrvLastName = name => {
    const names = name.split(' ');
    const last_name = names[names.length - 1].charAt(0).toUpperCase();
    if (names.length > 2) {
      return `${names[0]} ${names[1]} ${last_name}`;
    }
    return `${names[0]} ${last_name}`;
  };
  return (
    <PageWrapper style={{flex: 1}}>
      <TopBar title={`${abbrvLastName(user.fullName)}'s profile`} />
      <View style={styles.ProfileBackground}>
        <Image source={{uri: user.mainPic}} style={styles.ProfilePic} />
      </View>

      <BottomSheet user={user} />
    </PageWrapper>
  );
};

export default Profile;
