import { SafeAreaView, TextInput, View, Text, Image, Alert, ActivityIndicator, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import homeStyles from "./styles/homeStyles"
import CButton from './components/CButton'

import { captureRef } from 'react-native-view-shot';
import { launchCamera } from 'react-native-image-picker';
import Share from "react-native-share"
import CameraRoll from '@react-native-community/cameraroll';
import { getPermissionAndroid } from '../../services/Permission';
import Geolocation from '@react-native-community/geolocation';
import { fetchGeocoder } from '../../api/api';

const Home = () => {

  // Kameradan çekilen fotoğrafın tutulduğu state (başlangıçta default bir resim paylaşılır)
  const [capturedImage, setCapturedImage] = useState("https://picsum.photos/1080/1920")
  // Google tarafından adres bilgisi alınırken true olacak adres bilgisi alındıktan sonra false olacak ve resim gözükecek
  const [isLoading, setIsLoading] = useState(false)
  // Google tarafından gelen adres bilgisinin tutulduğu state
  const [location, setLocation] = useState("")
  // Fotoğraf üzerinde yazılan mesajı tutacak state
  const [photoLabel, setPhotoLabel] = useState("")


  // PNG formatına dönüştürülecek View component'inin referansı
  const viewRef = useRef()

  // Fotoğraf üzerine yazı yazmamızı sağlayan fonksiyon
  const onChangeLabel = (text) => setPhotoLabel(text)


  const onCamera = async () => {
    // Kamera açılır
    await launchCamera()
      .then(async (response) => {
        // isLoading state'i true yapılır ve yüklenme animasyonu gösterilir.
        setIsLoading(true)
        // Cihazın konum servisleri çalışır ve o an cihazın bulunduğu konum bilgisi alınır.
        await Geolocation.getCurrentPosition(
          async (info) => {
            // Gelen koordinat bilgileri GoogleMaps API'ye yollanır
            await fetchGeocoder(info.coords.latitude, info.coords.longitude)
              .then(results => {
                // Geocoder'dan dönen adres bilgisi location state'ine atılır 
                const address = results.data.results[results.data.results.length - 1].formatted_address
                console.log(JSON.stringify(results.data, undefined, "\t"))
                setLocation(address)

                // Kameradan çekilen resim capturedImage state'ine atılır
                setCapturedImage(response?.assets[0]?.uri)
                // Yüklenme animasyonu devre dışı bırakılır
                setIsLoading(false)
              })
              .catch(() => {
                // GoogleMaps API tarafında bir hata oluştuğunda konum bilgisine "Konum servisi bulunamadı" yazılır
                setLocation("Konum servisi bulunamadı")
                // Kameradan çekilen resim capturedImage state'ine atılır
                setCapturedImage(response?.assets[0]?.uri)
                // Yüklenme animasyonu devre dışı bırakılır
                setIsLoading(false)
              })
          },
          error => {
            // Cihazın konum servisleri tarafında bir hata oluştuğunda konum bilgisine "Konum bulunamadı" yazılır
            setLocation("Konum bulunamadı")
            // Kameradan çekilen resim capturedImage state'ine atılır
            setCapturedImage(response?.assets[0]?.uri)
            // Yüklenme animasyonu devre dışı bırakılır
            setIsLoading(false)
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
          }
        )

      })



  }
  const onSave = async () => {
    // Fotoğrafa çevrilecek View componentinin referansına ulaşılarak component PNG formatına çevrilir
    await captureRef(viewRef, { format: "png", quality: 1, fileName: "deneme" })
      .then(async (response) => {
        if (Platform.OS === "android") {
          // Android için dosyalara erişim izni sorgulanır
          const granted = await getPermissionAndroid()
          if (!granted) {
            return true
          }
        }
        // CameraRoll kütüphanesi ile resim cihaza kaydedilir ve Başarı ya da Uyarı alert'leri gösterilir
        const image = CameraRoll.save(response, "photo")
        if (image) {
          Alert.alert(
            'Tebrikler',
            'Fotoğraf başarıyla kaydedildi',
            [{ text: 'Tamam', onPress: () => { } }],
            { cancelable: false },
          );
        } else {
          Alert.alert(
            'Hata',
            'Lütfen daha sonra tekrar deneyin',
            [{ text: 'Tamam', onPress: () => { } }],
            { cancelable: false },
          );
        }
      })
  }
  const onShare = async () => {
    // Fotoğrafa çevrilecek View componentinin referansına ulaşılarak component PNG formatına çevrilir
    await captureRef(viewRef, { format: "png", quality: 1 })
      .then(async (response) => {
        // react-native-share kütüphanesi ile resim paylaşılabilecek her platforma uygun hale getirilerek paylaşılır.
        Share.open({
          url: response
        })
      }, (error) => console.error("Oops, snapshot failed", error))

  }

  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.header}>
        <Text style={homeStyles.headerTag}>
          PhotoShare
        </Text>
      </View>
      <View style={homeStyles.body}>
        <View style={homeStyles.inputContainer}>
          <TextInput
            placeholderTextColor={"gray"}
            placeholder='Metin Giriniz'
            value={photoLabel}
            onChangeText={onChangeLabel}
            style={homeStyles.input}
          />
        </View>
        {/**
         * Google bilgisi alınırken yükleme animasyonu gösterilir
         */}
        {isLoading ? <ActivityIndicator size={50} style={homeStyles.imageContainer} /> :
          <View collapsable={false} ref={viewRef} style={homeStyles.imageContainer}>
            <Image
              style={homeStyles.image}
              source={{ uri: capturedImage }}
            />
            <Text style={homeStyles.imageLabelText}>
              {photoLabel}
            </Text>
            <Text style={homeStyles.imageLocationText}>
              {location}
            </Text>
          </View>
        }
        <View style={homeStyles.buttonContainer}>
          <CButton label="Kamera" onPress={onCamera} />
          <CButton disabled={isLoading} label="Kaydet" onPress={onSave} />
          <CButton disabled={isLoading} label="Paylaş" onPress={onShare} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home