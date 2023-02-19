import { NextFunction, Request, Response } from "express";
import { EnergyService } from "../services/energyService";
import { TemperatureService } from "../services/tempertatureService";

interface TempsAndEnergyController {
  getTempsAndEnergy: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

interface Params {
  temperatureService: TemperatureService,
  energyService: EnergyService
}

export const getTempsAndEnergyController = ({
  temperatureService,
  energyService
}: Params): TempsAndEnergyController => ({
  getTempsAndEnergy: async (_req, res, _next) => {
    try {
      const energyData = await energyService.getEnergyData();
      const temperatureData = await temperatureService.getTemperatureData();
      res.status(200)
      res.send({
        energyData,
        temperatureData
      })
    } catch (error) {
      res.status(500)
      res.send({error: error})
    }
  }
})