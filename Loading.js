import React from "react";
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';

export default function Loading() {
    return (
        <LinearGradient 
        colors={['#8E2DE2', '#4A00E0']}
        style={styles.container}>
        <StatusBar barStyle="light-content"/>
            <Text style={styles.text}>Получение погоды...</Text>
            <AntDesign name="aliwangwang-o1" size={70} color="black" />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: '#FDF6AA',
        paddingBottom: 150,
    },
    text: {
        color: '#000000',
        fontSize: 30,
        paddingBottom: 50,
    },
})