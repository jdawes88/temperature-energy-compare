import { Energy, EnergyRepository } from "../repositories/energyRepository"

interface CombinedEnergy extends Energy {
  anomaly: boolean
}

export interface EnergyService {
  getEnergyData: () => Promise<CombinedEnergy[]>
}

interface Params {
  energyRepository: EnergyRepository
}

export const getEnergyService = ({energyRepository}: Params): EnergyService => ({
  getEnergyData: async () => {
    try {
      const allData = await energyRepository.getAll();
      const anomalyData = await energyRepository.getAllAnomalies();
      const anomalyTimeStamps = {} as any;
      anomalyData.forEach(energyData => {
        anomalyTimeStamps[energyData.Timestamp] = energyData.Timestamp
      })
      const mergedData = allData.map(energyData => {
        if (anomalyTimeStamps[energyData.Timestamp]) {
          return {
            ...energyData,
            anomaly: true
          }
        } else {
          return {
            ...energyData,
            anomaly: false
          }
        }
      }) as CombinedEnergy[]
      return mergedData;
    } catch (error) {
      throw new Error('Unable to get data', {
        cause: error
      })
    }
  }
});