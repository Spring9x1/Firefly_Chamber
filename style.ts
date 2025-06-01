import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    // padding: 0,
    // marginTop: 0,
    // backgroundColor: '#ffffff' 
  },
  ImageBackground: {
    position: 'absolute',
    top: 0,
    height: '25%',
    width: '100%',
    zIndex: -1,
  },

  blackOverlay: {
    position: 'absolute',
    top: 0,
    height: '25%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // opacity
    zIndex: 0,
  },

  scrollContent: {
    paddingTop: 200,
  },

  profileContainer: {
    width: 200,
    height: 200,
    padding: 50,
    bottom: 150,
    alignItems: 'center',
    margin: 'auto',
  },

  borderOverlay: {
    position: 'absolute',
    top: 40,
    left: 35,
    width: 125,
    height: 125,
    borderRadius: 10,
  },

  avatar: {
    padding: 50,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ffffff'
  },

  box: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  profileBox: {
    backgroundColor: '#14151C',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'visible',
    paddingHorizontal: 50,
    alignItems: 'center',
    flex: 1,
    height: '100%',
    marginTop: -40,
    padding: '75%',
    paddingTop: 40,
    // alignContent: 'center',
  },

  profileName: {
    fontSize: 40,
    textShadowOffset: { width: -1, height: 3 },
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowRadius: 5,
    bottom: 180,
    color: '#d2e6e6',
    fontFamily: 'Chewy-Regular',
  },

  profileId: {
    fontSize: 20,
    bottom: 180,
    color: '#d2e6e6',
    fontFamily: 'Chewy-Regular',
  },

  profileAddress: {
    textAlign: 'center',
    fontSize: 15,
    bottom: 180,
    color: '#a7bdb7',
    fontFamily: 'Chewy-Regular',
  },

  profileAge: {
    textAlign: 'center',
    fontSize: 15,
    bottom: 180,
    color: '#d2e6e6',
    fontFamily: 'Chewy-Regular',
  },

  header: { fontSize: 24, bottom: 100, marginBottom: 20, color: '#ffffff', fontFamily: "Chewy-Regular" },
  inputRow: { flexDirection: 'row', gap: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, flex: 1, borderRadius: 6, color: '#ffffff'
  },
  taskItem: {
    marginVertical: 10, padding: 10, borderRadius: 6,
    backgroundColor: '#f5f5f5',
  },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  doneText: { textDecorationLine: 'line-through', color: 'green' },
  normalText: { color: 'black' },

  box2: {
    width: '100%',
    height: '100%',
  },

  todoBox: {
    backgroundColor: '#14151C',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'visible',
    paddingHorizontal: 20,
    alignItems: 'stretch',
    flex: 1,
    marginTop: 160,
    paddingTop: 40,
    // padding: '75%',
    // height: '100%',
    // width: '100%',
    // alignContent: 'center',
  },

  navigationButtons: {
    flexDirection: 'column',
    marginTop: 20,
    bottom: 150,
    width: '100%',
    paddingHorizontal: 10,
    rowGap: 40,
  },

  navButton: {
    backgroundColor: 'rgba(50, 163, 140, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flex: 1,
    justifyContent: 'center',
    zIndex: 10,
  },

  navImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flex: 1,
    justifyContent: 'center',
  },

//last here
  navButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },

  navGroup: {
    flex:1,
    marginBottom: 40,
    zIndex: 0,
  },
  
  samWrapper: {
    position: 'absolute',
    top: -65,                // naik ke atas tombol
    right: '12.5%',          // karena width 75% → sisanya 25%, dibagi dua = 12.5%
    width: '75%',
    height: 75,
    alignItems: 'flex-end',
    zIndex: 10,
  },
  
  samFrame: {
    width: '100%',
    height: '100%',
    top: 17,
    right: -32,
    resizeMode: 'contain',
  },

  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },

  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },

  todoTitle: {
    zIndex: 99,
    fontSize: 40,
    textShadowOffset: { width: -1, height: 3 },
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowRadius: 5,
    color: '#d2e6e6',
    textAlign: 'center',
    fontFamily: 'Chewy-Regular',
    marginBottom: 20,
  },

  pageTitle: {
    fontSize: 24,
    bottom: 100,
    margin: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  placeholderContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 30,
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
  },

  placeholderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },

  placeholderSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles;