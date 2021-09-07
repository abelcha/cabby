import React from "react"
import { HeatMap } from "google-maps-react"
import axios from "axios"
import { useState, useEffect } from "react"

const client = axios.create({
  baseURL: "http://localhost:3042",
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

const Hm =  ({ targetDate }) => {
  const [pickupPoints, setPickupPoints] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  console.log({ pickupPoints, isLoading })

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
  return (
    !isLoading && (
      <HeatMap
        gradient={gradient}
        positions={pickupPoints}
        opacity={1}
        radius={20}
      />
    )
  )
}

export default Hm;
