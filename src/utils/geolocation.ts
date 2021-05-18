import axios from 'axios'
import { CallbackVar, Location } from '../types'

export const geolocationAdress = (adress: string, cb: CallbackVar) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
    adress
  }.json?access_token=${process.env.MAPBOX_KEY}&limit=1`

  const request = async () => {
    try {
      const res = await axios.get(url)

      if (res.data.features.length === 0) {
        return cb('Error: unable to find location, try again', undefined)
      }

      const lat: number = res.data.features[0].center[1]
      const long: number = res.data.features[0].center[0]
      const location: Location = res.data.features[0].text

      return cb(undefined, { lat, long, location })
    } catch (err) {
      return cb(err, undefined)
    }
  }

  request()
}

export const geolocationCoords = (coords: string, cb: CallbackVar) => {
  const long = coords.split(',')[0]
  const lat = coords.split(',')[1]
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${process.env.MAPBOX_KEY}&limit=1`

  const request = async () => {
    try {
      const res = await axios.get(url)

      if (res.data.features.length === 0) {
        return cb('Error: unable to find location, try another', undefined)
      }

      const location: Location = res.data.features[0].text

      return cb(undefined, { lat, long, location })
    } catch (err) {
      return cb(err, undefined)
    }
  }

  request()
}
