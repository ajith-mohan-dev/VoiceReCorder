import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import AudioListComponent from '../../component/audio-list-component';
import AudioRecorderComponent from '../../component/audio-recorder-component';

const VoiceReorderScreen = () => {
  const [audioList, setAudioList] = useState([]);

  useEffect(async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }, []);

  const removeAudioList = index => {
    let tempArr = audioList.slice(0, index);
    setAudioList(tempArr.length === 0 ? [] : tempArr);
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <AudioRecorderComponent
          recordedItem={recordedList =>
            setAudioList([...audioList, ...recordedList])
          }
        />
        <AudioListComponent
          audioList={audioList}
          deleteAudioList={index => removeAudioList(index)}
        />
      </View>
    </>
  );
};

export default VoiceReorderScreen;
