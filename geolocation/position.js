import * as Location from 'expo-location'
import Reac, {useState, useEffect } from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import MapView, {Marker} from 'react-native-maps'

export default function Position(){
    const [region, setRegion] = useState({
                                    latitude: 0,
                                    longitude: 0,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                })
    
   
    useEffect(()=>{
        (async ()=>{
            try{
                let {status} = await Location.requestForegroundPermissionsAsync()

                if(status != 'granted'){
                    console.log('permission to location denied')
                    return                    
                }

                let location = await Location.getCurrentPositionAsync({})
    
                setRegion({
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                })
            }catch(e){
                console.log(e)
            }

            
             
        })()
    },[])
    
    return (
        <View style={styles.screen}>
                <Text style={styles.title}>Sua localização</Text>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Latitude: {region.latitude}</Text>
                    <Text style={styles.paragraph}>Longitude: {region.longitude}</Text>

                        <MapView style={styles.map} region={ region }>
                            {
                                <Marker
                                coordinate={{ latitude : region.latitude, longitude : region.longitude }}
                                />
                            }
                                
                            
                        </MapView>
                </View>
        </View>
    )
}


const styles = StyleSheet.create({

    screen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingTop:20,
        flexDirection: 'column'
    },   
    paragraph:{
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'stretch',
        margin:4,
        backgroundColor: '#50bfe6',
        padding:8,
        borderRadius: 8,
        color: 'white'
    },
    title:{
        fontSize: 24,
        backgroundColor:'#448f99',
        alignSelf: 'stretch',
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    container:{
        backgroundColor: '#a3d9c9',
        padding:30,
        alignItems: 'center',
        justifyContent: 'center',
        flex:1        
    },
    map:{
        width: 300,
        height: 300,
        margin:4
    }

})



