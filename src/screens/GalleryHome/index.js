import React, {useEffect, createRef} from 'react';
import {
  View,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Button} from 'galio-framework';
import styles from './styles';
import globalStyles from '../styles';
import {SharedElement} from 'react-native-shared-element';
import PageWrapper from '../../components/PageWrapper';
import {enableScreens} from 'react-native-screens';
import ImageView from 'react-native-image-viewing';
import TopBar from '../../components/TopBar';
import {GalleryContext} from '../../context/GalleryContext';
import {DEVICE} from '../../utility/constant';

const GalleryImage = ({image}) => {
  enableScreens();
  // eslint-disable-next-line no-unused-vars
  const shouldComponentUpdate = () => {
    return false;
  };

  return (
    <Image
      source={{uri: image}}
      style={styles.thumbnailStyles}
      resizeMode="cover"
    />
  );
};
export const GalleryFullImage = ({image}) => {
  // eslint-disable-next-line no-unused-vars
  const shouldComponentUpdate = () => {
    return false;
  };

  return (
    <Image
      source={{uri: image}}
      width={DEVICE.width}
      height={DEVICE.height}
      // resizeMode="stretch"
      style={styles.fullImage}
    />
  );
};

const GalleryHome = props => {
  return (
    <GalleryContext.Consumer>
      {context => {
        return (
          <PageWrapper>
            <LinearGradient
              colors={['#ff4e00', '#ec9f05']}
              useAngle={true}
              angle={315}
              angleCenter={{x: 0.5, y: 0.5}}
              style={{...styles.GalleryContainer, ...globalStyles.Page}}>
              <TopBar title="Gallery" />
              <View style={styles.thumbnailContainer}>
                <FlatList
                  data={context.Gallery}
                  initialScrollIndex={context.currentImage}
                  keyExtractor={(item, index) => `list-item-${index}`}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => context.onClickThumbnail(index)}>
                        <GalleryImage image={item.uri} />
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={() => (
                    <View style={styles.empty}>
                      <ActivityIndicator size="large" color="#ffffff" />
                      <Text color="white" h4>
                        No Images found :( Sorry
                      </Text>
                    </View>
                  )}
                  numColumns={2}
                />
              </View>
            </LinearGradient>
            <ImageView
              images={context.Gallery}
              imageIndex={context.currentImage}
              visible={context.modalVisible}
              onRequestClose={context.requestClose}
            />
          </PageWrapper>
        );
      }}
    </GalleryContext.Consumer>
  );
};

export default GalleryHome;
