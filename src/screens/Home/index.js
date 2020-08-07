import React, {useState} from 'react';
import {Modal, View, TouchableOpacity, Image} from 'react-native';
import {Block, Text, Button} from 'galio-framework';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {enableScreens} from 'react-native-screens';
import PageWrapper from '../../components/PageWrapper';
import {DEVICE} from '../../utility/constant';
import {FlatList} from 'react-native-gesture-handler';
const Home = props => {
  enableScreens();
  const [modalVisible, setModalVisible] = useState(false);
  const {width, height} = DEVICE;
  const renderTeam = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(false);
        props.navigation.navigate('Profile', {user: item});
      }}>
      <Block row style={{padding: 10}}>
        <Image
          source={{uri: item.mainPic}}
          style={{width: 70, height: 70, borderRadius: 100}}
        />
        <View style={{padding: 10}}>
          <Text p>{item.fullName}</Text>
          <Text bold>{item.role}</Text>
        </View>
      </Block>
    </TouchableOpacity>
  );
  const team = [
    {
      id: 4,
      fullName: 'Abdulkadir Rasheedat Motunrayo',
      role: 'Project Analyst',
      nickname: 'Rashbabe',
      email: 'rash.motunrayo@gmail.com',
      address: '17 Flamingo close, off stadium road. Ilorin. Kwara state',
      phoneNumber: 8107330820,
      dateOfBirth: '31st August',
      hobbies: 'Travelling, Driving, gisting, watching movies',
      bio:
        "I was born into the family of 4. Have one sibling and I'm the second female and last born. I attended God's mercy nur & pry school, Ilorin, unilorin secondary school for my junior secondary school then further to Federal Government College Ilorin for my senior secondary school. Proceed to Center for preliminary and extra moral studies for my remedial program and after for my degree program at FUTMinna. I'm from offa, Kwara state",
      bestExperienceInSchool:
        'The day I wrote my final papers and my experience with my loved ones and friends',
      worstExperience: 'Confidential',
      yourRoleModel: "Khadijat(prophet Mohammed's first wife) and my parent",
      yourFavQuote: 'Be yourself',
      yourAmbition: 'A role model to young females',
      yourBiggestFear: 'Failure',
      mainPic: 'dsc_0933',
    },
    {
      id: 43,
      fullName: 'Jonathan Johnson',
      role: 'UI/ UX Design',
      nickname: 'Kxng_Nathan',
      email: 'jonathanojohnson@gmail.com',
      address: 'Gwarimpa, Abuja Nigeria',
      phoneNumber: 8175108784,
      dateOfBirth: '22nd Jul',
      hobbies: 'Playing Games, Singing, Designing and chasing girls',
      bio: 'Ask me about me',
      yourCrush: 'Sandra Marcus (IMT)',
      bestExperienceInSchool: 'The last day I wrote exams',
      worstExperience: 'Don’t have one',
      yourRoleModel: 'No one',
      yourFavQuote:
        'When the going gets tough the tough get going – Joseph P Kennedy',
      yourAmbition: 'Technology  Entrepreneur',
      yourBiggestFear: 'Not being successful',
      mainPic: 'dsc_5202',
    },
    {
      id: 3,
      fullName: 'Abubakar Abdulkadir',
      role: 'Backend Developer',
      nickname: 'mPape',
      email: 'nightingale9ja@gmail.com',
      address: 'Adjacent voice of mercy ministries, Gurara, Niger State',
      phoneNumber: '08107403558',
      dateOfBirth: '21st March',
      hobbies: 'Programming, travelling, poetry and music',
      bio:
        'I am the second child in a family of four children. Born in Zungeru, Niger State, although I spent the largest part of my childhood in mpape, Abuja. I attended greater height nursery and primary school, mpape, then proceeded to Government Science College, Kagara in Niger State where I recorded some accomplishments; the biggest being winning the bronze medal at the Nigerian national mathematics and science Olympiads (Chemistry). Then I got admission into Futminna in 2014.',
      yourCrush: 'Khadijat (CPT Engineering)',
      bestExperienceInSchool:
        'The day i represented the faculty as a scholar at an innuagural lecture',
      worstExperience: 'The entire 500 level',
      yourRoleModel: 'My brother',
      yourFavQuote:
        'if you choose to start where you are suppose to end, then you will end where you are suppose to start ',
      yourAmbition: 'To become Computing Icon',
      yourBiggestFear:
        'Bringing children to this world without the means to give them good life',
      mainPic: 'dsc_0393',
    },
    {
      id: 45,
      fullName: 'Maroof Shittu',
      role: 'Lead Developer',
      email: 'dbugshe2@gmail.com',
      address: 'No. 10 Niamey St. Wuse zone 2, Abuja',
      phoneNumber: '09050484101',
      dateOfBirth: '22nd May',
      hobbies: 'Watching, Reading, Listening, and Imagining things',
      bio:
        'I am average and I despise stress, born lazy, almost as short as this bio. thanks for reading',
      bestExperienceInSchool: 'Submitting my Project',
      worstExperience: 'doing my project',
      yourRoleModel: 'Rick Sanchez',
      yourFavQuote: "It's all good tho",
      yourAmbition: 'Be the best most stable LTS version of me.',
      yourBiggestFear: "That I won't make it in the end",
      mainPic: 'dsc_0660',
    },
    {
      id: 59,
      fullName: 'Osein Ridwan Ridwan',
      role: 'Database Design',
      nickname: 'Ridsonation',
      email: 'oseinridwan5@gmail.com',
      address:
        'Kunture along kwanar ungogo, close to bachirawa, kano state nigeria',
      phoneNumber: 9058206086,
      dateOfBirth: '15TH OF SEPTEMBER, 1996',
      hobbies: 'Cooking, learning and praying',
      bio:
        'I was born in Kano state in the year 1996 into a family of 5. After completing my elementatry school, myself and my twins sisters moved to kwara state to live with our grandmother, where i finished my secondary school. After my secondary school, i moved back to kano to live with my parent.',
      yourCrush: 'Money',
      bestExperienceInSchool:
        'My best experience in school was the day i met my school family. Family is what i like to call them because they have been nothing but a brother and sister to me.',
      worstExperience:
        'My worst experience was the day i was sent out of the test hall for not obeying "instruction".',
      yourRoleModel: 'Mr Oseni Yinusa Alabelewe',
      yourFavQuote: 'Do the thing you fear and the death of fear is certain',
      yourAmbition: 'Being a Successful man',
      yourBiggestFear: 'Not being successful, also not being a good father',
      mainPic: 'dsc_0810',
    },
  ];
  return (
    <PageWrapper>
      <View style={styles.Container}>
        <LinearGradient
          colors={['#ff4e00', '#ec9f05']}
          useAngle={true}
          angle={315}
          angleCenter={{x: 0.5, y: 0.5}}
          style={styles.GalleryButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Gallery');
            }}>
            <View>
              <Text h4 italic bold color="white">
                Gallery
              </Text>
              <Text p color="white">
                Our moments
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.CenterText}>
          <Text h3 color="white">
            Welcome to
          </Text>
          <Text
            h2
            italic
            bold
            color="white"
            style={{
              textShadowColor: '#555555',
              textShadowOffset: {width: 1, height: 1},
              textShadowRadius: 5,
            }}>
            The Formidables '19
          </Text>
          <Text h3 color="white">
            Yearbook
          </Text>
        </View>
        <Button
          color="warning"
          radius={20}
          style={styles.aboutBtn}
          onPress={() => setModalVisible(true)}>
          Developers Column
        </Button>
        <LinearGradient
          colors={['#1fb3ed', '#116ac5']}
          useAngle={true}
          angle={109}
          angleCenter={{x: 0.5, y: 0.5}}
          style={styles.ContactsButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Contacts');
            }}>
            <View>
              <Text h4 italic bold color="white">
                Contacts
              </Text>
              <Text p color="white">
                Get to know your mates
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <Block flex style={styles.aboutModal}>
          <Block
            width={width * 0.9}
            height={height * 0.8}
            space="between"
            shadow
            center
            middle
            style={styles.aboutModalContainer}>
            <Block
              top
              height={height * 0.5}
              center
              style={{backgroundColor: 'white'}}>
              <Text h4 muted>
                Brought to you by......
              </Text>
              <Block>
                <FlatList
                  data={team}
                  keyExtractor={(item, index) => {
                    return `team-member-${index}-item`;
                  }}
                  renderItem={renderTeam}
                />
              </Block>
            </Block>
            <Block
              // bottom
              center
              middle
              height={height * 0.2}
              style={styles.modalBottom}>
              <Button
                small
                center
                middle
                style={styles.modalClose}
                radius={20}
                onPress={() => setModalVisible(false)}>
                Close
              </Button>
            </Block>
          </Block>
        </Block>
      </Modal>
    </PageWrapper>
  );
};

export default Home;
