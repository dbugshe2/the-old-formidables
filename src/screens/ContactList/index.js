import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Input} from 'galio-framework';

import {enableScreens} from 'react-native-screens';
import styles from './styles';
import globalStyles from '../styles';
import {SharedElement} from 'react-native-shared-element';
// import FastImage from 'react-native-fast-image';
import Users from '../../data/formidables';
import PageWrapper from '../../components/PageWrapper';
import TopBar from '../../components/TopBar';

const ContactList = props => {
  enableScreens();
  const [data, setData] = useState(Users);
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState('');
  const arrayHolder = Users;

  const searchFilterFunction = text => {
    setValue(text);
    const newData = arrayHolder.filter(item => {
      const itemData = `${item.fullName.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  };

  const short_name = fullName => {
    let names = fullName.split(' ');
    let initials = names[1].substring(0, 1).toUpperCase();

    if (names.length > 2) {
      initials += ' ' + names[names.length - 1].substring(0, 1).toUpperCase();
    }
    let first_name =
      names[0]
        .toLowerCase()
        .charAt(0)
        .toUpperCase() + names[0].substr(1);
    return first_name + ' ' + initials;
  };

  return (
    <PageWrapper>
      <TopBar title="Contacts" />
      <LinearGradient
        colors={['#1fb3ed', '#116ac5']}
        useAngle={true}
        angle={109}
        angleCenter={{x: 0.5, y: 0.5}}
        style={{...styles.ContactsContainer, ...globalStyles.Page}}>
        <View style={styles.SearchBarContainer}>
          <Input
            placeholder="Enter a name"
            placeholderTextColor="white"
            style={styles.SearchBar}
            family="evilicons"
            icon="search"
            iconSize={32}
            right
            bgColor="transparent"
            color="white"
            autoCorrect={false}
            selectTextOnFocus={true}
            onChangeText={text => searchFilterFunction(text)}
          />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `list-item-${index}`}
          renderItem={({item}) => {
            return (
              // <View style={styles.AvatarContainer}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Profile', {user: item})
                }
                style={styles.AvatarContainer}>
                <Image
                  dimension={{width: 100, height: 100}}
                  source={{uri: item.mainPic}}
                  style={styles.AvatarStyle}
                />

                {/* {item.hasOwnProperty('mainPic') ? (
                  <Image
                    source={require('../../assets/mainpics/' + item.mainPic)}
                    style={styles.AvatarStyle}
                  />
                ) : (
                  <Image source={require(`${assetsPath}avatar.jpg`)} />
                )} */}

                <Text style={styles.AvatarName} color="white" p>
                  {`${short_name(item.fullName)}`}
                </Text>
              </TouchableOpacity>
              // </View>
            );
          }}
          ListEmptyComponent={() => (
            <View>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text color="white" h4>
                No Contacts
              </Text>
            </View>
          )}
          numColumns={3}
        />
      </LinearGradient>
    </PageWrapper>
  );
};

export default ContactList;
