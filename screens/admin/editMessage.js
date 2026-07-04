import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import { Button } from '../../components/Button';
import Error from '../../shared/Error';
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl';
import * as DocumentPicker from 'expo-document-picker';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

var {width} = Dimensions.get('window')

const EditMessageForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('');
  const [category, setCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState();
  const [messageFile, setMessageFile] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [item] = useState(props.route.params.item._id);

  useEffect(()=>{

    AsyncStorage.getItem('jwt').then(res => {
      setToken(res)
    }).catch(error=>{
      console.log(error);
    })

    //caching categories
    const cacheCategory = async (category) => {
      try {
        await AsyncStorage.setItem('category', JSON.stringify(category));
      } catch (e) {
        console.log(e);
      }
    };

    const getCachedData = async () => {
      try {
        const categories = await AsyncStorage.getItem('category');

        if (categories !== null) {
          // Both messages and categories are cached, use the data here
          const parsedCategories = JSON.parse(categories);
          return parsedCategories
        }
      } catch (e) {
        console.log(e);
      }
    };

    const cachedDataReturned = async () => {
      const categories = await getCachedData();
      return categories;
    }
   
      const fetchData = async () => {

        try {
          //Getting categories data
          axios.get(`${baseUrl}category`).then(res=> {
            if(res.status == 304){
                const categories = cachedDataReturned();
                setCategory(categories);
            }else{
                setCategory(res.data.category);
                cacheCategory(res.data.category);
            }
        }).catch((error) => {
            console.log('Category fetch error', error);
        })
      }catch(e){
        console.log(e);
      }
      }//end of fetchData

      fetchData();

      return() => {
        setCategory([])
      }

    },[])

  const createMessage = () => {
    let message = new FormData()
        message.append("title", title);
        message.append("description", description)
        message.append("contentType", contentType)
        message.append("category", selectedCategory)
       if(image !== null){
        message.append("image", {
          name: image.name,
          type: image.mimeType,
          uri: image.uri
        })
       } 

       if(messageFile !== null){
        message.append("message",  
        {
          name: messageFile.name,
          type: messageFile.mimeType,
          uri: messageFile.uri
        }
      )
       }
         
    axios.patch(`${baseUrl}message/${item}`, message, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }).then((res)=> {
      if (res.status == 200){
        setLoading(true)
        Toast.show({
          topeOffset: 60,
          type: 'success',
          text1: 'Message updated successfully',
          text2: ''
        })
            setTimeout(()=> {
                props.navigation.navigate('Admin Message');
                setLoading(false)
            }, 300)
      }
    }).catch((error)=> {
      Toast.show({
        topeOffset: 60,
        type: 'error',
        text1: 'Could not create message',
        text2: 'Please try again'
      })
    })
  }

  const pickDocumentDisplayImage = async () => {
   try {
      let result = await DocumentPicker.getDocumentAsync({});
      setImage(result);
   } catch(e){
      console.log(e);
   }
  };

  const pickDocumentMessageFile = async () => {
    try {
       let result = await DocumentPicker.getDocumentAsync({});
       setMessageFile(result);
    } catch(e){
       console.log(e);
    }
   };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.signup}>Hey Admin create a message</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} 
        placeholder="title" keyboardType='default' onChangeText={(text) => setTitle(text.trim())} />
        <TextInput style={styles.inputField} 
        placeholder="description" keyboardType='default' onChangeText={(text) => setDescription(text.trim())} />
        <TextInput style={styles.inputField} 
        placeholder="content type" keyboardType='email-address' onChangeText={(text)=> setContentType(text.trim())}/>
        <View>
            <Text>Category</Text>
            { category === null ? (
              <Text>Categries loading...</Text>
            ) : (
              <Picker 
                mode = "dropdown"
                style={{width: undefined}}
                placeholder="Select a category"
                selectedValue={pickerValue}
                placeholderStyle={{color: '#007aff'}}
                onValueChange={(value) => [setPickerValue(value), setSelectedCategory(value)]}
            >
                {
                    category.map((option) => {
                     return <Picker.Item 
                        key = {option.id}
                        label = {option.name}
                        value = {option.id}
                    />
})
                }
            </Picker>
            )}
            </View>
        <View style={styles.filePicker}>
          <TextInput style={styles.inputField} placeholder="Set a display image" editable={false} 
          value={image ? image.name : ''}/>
          <Button title='Browse' btnstyle={{ backgroundColor: "#141414", borderRadius: 8, 
          padding: 10, width: 70, position: 'absolute', right: 10, top: 23 }} 
          txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
          onPress={pickDocumentDisplayImage} />
        </View>
        <View style={styles.filePicker}>
          <TextInput style={styles.inputField} placeholder="Upload message" editable={false} 
          value={messageFile ? messageFile.name : ''}/>
          <Button title='Browse' btnstyle={{ backgroundColor: "#141414", borderRadius: 8, 
          padding: 10, width: 70, position: 'absolute', right: 10, top: 23 }} 
          txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
          onPress={pickDocumentMessageFile} />
        </View>
        </View>
      <View>
        <Button title="Create Message"  btnstyle={{ backgroundColor: "#141414", borderRadius: 8, height: 54, 
        justifyContent: "center", padding: 10, marginBottom: 15, }} 
        txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
        onPress={()=> createMessage()}/>
      </View>
        {loading == true ? (
          <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 20}}>
            <ActivityIndicator />
          </View>
        ): null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -20,
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 70,
  },
  title: {
    marginTop: 109,
  },
  signup: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  inputView: {
    marginVertical: 20,
    marginBottom: 30
  },

  inputField: {
    height: 54,
    backgroundColor: '#F5F5F5',
    marginVertical: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#E3E3E3'
  },

  inputText: {
    fontSize: 10,
    marginTop: -10,
    marginLeft: 2,
    color: '#C90101'
  }
})

export default EditMessageForm;