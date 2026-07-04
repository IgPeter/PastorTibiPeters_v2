import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import PDFReader from 'react-native-pdf';

const BookReader = (props: any) : React.JSX.Element => {
    const message = props.route.params.messageInfo;

    const bookReaderError = (error: any) => {
        console.log(error)
    }

    return (
        <SafeAreaView style = {styles.container}>
                <PDFReader 
                    source = {{uri: message.message}}
                    onError={bookReaderError}
                    trustAllCerts={false}
                    style = {{flex: 1, borderRadius: 10}}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
});


export default BookReader;