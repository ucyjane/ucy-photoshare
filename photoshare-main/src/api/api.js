import apisauce from "apisauce"

// Google Api'lerini kullanmak için gerekli api key
const API_KEY = "AIzaSyCaUdvq374ZVQwjOXkDGDoprcPHwOfHFNg"

// Google ile bağlantı kurmak için gerekli instance
const api = apisauce.create({
  baseURL:"https://maps.googleapis.com/maps/api/"
})

// Google
export const fetchGeocoder = (latitude,longitude) => {
  /**
   * json -> JSON formatında data almak için
   * latlng -> latitude,longitude
   * key -> api key
   * language -> gelen data'nın dili
   * result_type -> genel adres kısıtlaması için administrative_area_level_1 ve administrative_area_level_2 filtreleri eklendi
   */
  return api.get(`geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}&language=tr&result_type=administrative_area_level_2|administrative_area_level_1`)
}