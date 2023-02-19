import { Temperature, TemperatureRepository } from "../repositories/temperatureRepository"

export interface TemperatureService {
  getTemperatureData: () => Promise<Temperature[]>
}

interface Params {
  temperatureRepository: TemperatureRepository
}

export const getTemperatureService = ({ temperatureRepository }: Params): TemperatureService => ({
  getTemperatureData: async () => {
    try {
      const temperatureData = await temperatureRepository.getAll();
      return temperatureData;
    } catch (error) {
      throw new Error('Unable to get data', {
        cause: error
      })
    }
  }
});