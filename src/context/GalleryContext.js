import React, {Component, createContext} from 'react';
import Gallery from '../data/gallery';

export const GalleryContext = createContext();

export default class GalleryContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Gallery: Gallery,
      currentImage: 0,
      modalVisible: false,
    };
  }

  toggleModalVisible = isVisible => {
    this.setState({modalVisible: isVisible});
  };
  setCurrentImage = index => {
    this.setState({currentImage: index});
  };
  requestClose = () => {
    this.toggleModalVisible(false);
  };
  onImageSwipe = () => {
    return false;
  };
  onClickThumbnail = index => {
    this.setCurrentImage(index);
    this.toggleModalVisible(true);
  };
  componentDidMount() {
    return false;
  }
  render() {
    return (
      <GalleryContext.Provider
        value={{
          ...this.state,
          toggleModalVisible: this.toggleModalVisible,
          onClickThumbnail: this.onClickThumbnail,
          setCurrentImage: this.setCurrentImage,
          requestClose: this.requestClose,
        }}>
        {this.props.children}
      </GalleryContext.Provider>
    );
  }
}
