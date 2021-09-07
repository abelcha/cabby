const express = require('express')
const cors = require('cors')
const { format, isValid } = require('date-fns');
const { groupBy } = require('lodash');
const fs = require('fs');
const PORT = 3042;
const DEFAULT_PICKUP_DATE = '14/03-17'

const getDateKey = (date) => format(date, 'dd/MM-HH');

const initPickups = () => {
    const csvContent = fs.readFileSync('../data/train.csv', 'utf8');
    const pickups = csvContent
    .split('\n')
    .slice(1)
    .map(e => e.split(','))
    .map(arr => ({
        passengerCount: parseFloat(arr[4]),
        pickupDate: new Date(arr[2]),
        pickupLat: parseFloat(arr[6]),
        pickupLng: parseFloat(arr[5])
    }))
    const groupedPickups = groupBy(pickups, ({ pickupDate }) => {
        return isValid(pickupDate) && getDateKey(pickupDate);
    });
    return { groupedPickups, pickups };
}
const { groupedPickups, pickups } = initPickups();


express()
    .use(cors())
    .get('/pickup-points/:isoDate', (req, res) => {
        const targetDate = new Date(req.params.isoDate);
        const pickups = groupedPickups[getDateKey(targetDate)] || groupedPickups[DEFAULT_PICKUP_DATE];
        return res.json(pickups.map(({ pickupLat, pickupLng }) => ({ lat: pickupLat, lng: pickupLng })));
    })
    .listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
    })