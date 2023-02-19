import { Energy, EnergyRepository } from "../repositories/energyRepository"

interface CombinedEnergy extends Energy {
  anomaly: boolean
}

export interface EnergyService {
  getEnergyData: () => CombinedEnergy
}

interface Params {
  energyRepository: EnergyRepository
}

export const getEnergyService = ({energyRepository}: Params): EnergyService => ({
  getEnergyData: () => {

  }
});