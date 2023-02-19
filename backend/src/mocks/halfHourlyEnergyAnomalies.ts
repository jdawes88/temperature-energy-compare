export const halfHourlyEnergyAnomalies = [
  {
    "Timestamp": "2020-01-01T11:30:00.000Z",
    "Consumption": 33.59
  },
  {
    "Timestamp": "2020-01-01T12:00:00.000Z",
    "Consumption": 32.66
  },
  {
    "Timestamp": "2020-01-01T12:30:00.000Z",
    "Consumption": 34.16
  },
  {
    "Timestamp": "2020-01-02T15:00:00.000Z",
    "Consumption": 20.92
  },
  {
    "Timestamp": "2020-01-02T15:30:00.000Z",
    "Consumption": 26.79
  },
  {
    "Timestamp": "2020-01-02T18:30:00.000Z",
    "Consumption": 19.12
  },
  {
    "Timestamp": "2020-01-03T09:00:00.000Z",
    "Consumption": 19.5
  },
  {
    "Timestamp": "2020-01-03T09:30:00.000Z",
    "Consumption": 29
  },
  {
    "Timestamp": "2020-01-03T10:00:00.000Z",
    "Consumption": 30.76
  },
  {
    "Timestamp": "2020-01-04T21:00:00.000Z",
    "Consumption": 22.52
  },
  {
    "Timestamp": "2020-01-04T21:30:00.000Z",
    "Consumption": 33.79
  },
  {
    "Timestamp": "2020-01-05T06:00:00.000Z",
    "Consumption": 31.55
  },
  {
    "Timestamp": "2020-01-05T06:30:00.000Z",
    "Consumption": 19.59
  },
  {
    "Timestamp": "2020-01-05T21:30:00.000Z",
    "Consumption": 24.72
  },
  {
    "Timestamp": "2020-01-06T04:00:00.000Z",
    "Consumption": 27.73
  },
  {
    "Timestamp": "2020-01-06T04:30:00.000Z",
    "Consumption": 33.26
  },
  {
    "Timestamp": "2020-01-06T05:00:00.000Z",
    "Consumption": 21.42
  },
  {
    "Timestamp": "2020-01-07T20:00:00.000Z",
    "Consumption": 17.2
  },
  {
    "Timestamp": "2020-01-07T20:30:00.000Z",
    "Consumption": 24.87
  }
].map(energy => {
  return {
    ...energy,
    Timestamp: new Date(energy.Timestamp)
  }
})