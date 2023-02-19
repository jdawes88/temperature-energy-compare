import csvtojson from "csvtojson";

export interface Energy {
  timestamp: Date,
  consumption: number
}

export interface EnergyRepository {
  getAll: () => Energy[],
  getAllAnomalies: () => Energy[]
}

export const getEnergyRepository = (): EnergyRepository => ({
  getAll: () => {

  },
  getAllAnomalies: () => {

  }
})