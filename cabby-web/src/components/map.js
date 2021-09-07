import React from "react"
import { Map, GoogleApiWrapper, HeatMap } from "google-maps-react"
import DateTimePicker from "react-datetime-picker"
import axios from "axios"
import { useState, useEffect } from "react"
import config from "../../config"

const client = axios.create({
  baseURL: config.apiEndpoint,
})

const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)",
]

const MapContainer = props => {
  const [targetDate, setTargetDate] = useState(new Date())
  const [pickupPoints, setPickupPoints] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPickupsFromDate = async () => {
      setIsLoading(true)
      const { data } = await client.get(
        `pickup-points/${targetDate.toISOString()}`
      )
      setPickupPoints(data)
      setIsLoading(false)
    }
    getPickupsFromDate()
  }, [targetDate])

  if (!pickupPoints.length) {
    return null
  }
  return (
    <div className="map-container">
      <DateTimePicker
        format="y-MM-dd HHһ"
        maxDetail="hour"
        onChange={setTargetDate}
        value={targetDate}
      />
      <Map
        google={props.google}
        className={"map"}
        zoom={13}
        initialCenter={{ lat: 40.73061, lng: -73.935242 }}
      >
        {!isLoading && (
          <HeatMap
            gradient={gradient}
            positions={pickupPoints}
            opacity={1}
            radius={20}
          />
        )}
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: config.gmapApiKey,
  libraries: ["visualization"],
})(MapContainer)
