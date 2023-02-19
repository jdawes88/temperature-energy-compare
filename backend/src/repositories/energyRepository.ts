import csvtojson from "csvtojson";
import path from "path";

export interface Energy {
  Timestamp: string,
  Consumption: number
}

interface RawEnergy {
  Timestamp: string,
  Consumption: string
}

export interface EnergyRepository {
  getAll: () => Promise<Energy[]>,
  getAllAnomalies: () => Promise<Energy[]>
}

const absolute = path.join(__dirname, '../data');
const relative = path.relative(process.cwd(), absolute);

export const getEnergyRepository = (): EnergyRepository => ({
  getAll: async () => {
    try {
      const filePath = `${relative}/HalfHourlyEnergyData.csv`;
      const data = await csvtojson().fromFile(filePath) as RawEnergy[];
      const mappedData = data.map(energy => {
        return {
          ...energy,
          Consumption: parseFloat(energy.Consumption)
        };
      })
      return mappedData as Energy[];
    } catch (error) {
      console.log('error', error)
      throw new Error('Unable to retrieve data', {
        cause: error
      })
    }
  },
  getAllAnomalies: async () => {
    try {
      const filePath = `${relative}/HalfHourlyEnergyDataAnomalies.csv`;
      const data = await csvtojson().fromFile(filePath) as RawEnergy[];
      const mappedData = data.map(energy => {
        return {
          ...energy,
          Consumption: parseFloat(energy.Consumption)
        };
      })
      return mappedData as Energy[];
    } catch (error) {
      throw new Error('Unable to retrieve data', {
        cause: error
      })
    }
  }
})