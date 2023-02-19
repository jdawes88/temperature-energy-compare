import csvtojson from "csvtojson";
import path from "path";
import { temperature } from "../mocks/temperature";

export interface Temperature {
  Date: Date,
  AverageTemperature: number,
  AverageHumidity: number
}

interface RawTemperature {
  Date: string,
  AverageTemperature: string,
  AverageHumidity: string
}

export interface TemperatureRepository {
  getAll: () => Promise<Temperature[]>
}

const absolute = path.join(__dirname, '../data');
const relative = path.relative(process.cwd(), absolute);

export const getTemperatureRepository = (): TemperatureRepository => ({
  getAll: async () => {
    try {
      const filePath = `${relative}/Weather.csv`;
      const data = await csvtojson().fromFile(filePath) as RawTemperature[];
      const mappedData = data.map(temperature => {
        return {
          ...temperature,
          Date: new Date(temperature.Date),
          AverageHumidity: parseFloat(temperature.AverageHumidity),
          AverageTemperature: parseFloat(temperature.AverageTemperature)
        };
      })
      return mappedData as Temperature[];
    } catch (error) {
      console.log('error', error)
      throw new Error('Unable to retrieve data', {
        cause: error
      })
    }
  }
})