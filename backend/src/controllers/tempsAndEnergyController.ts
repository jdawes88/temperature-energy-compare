import { RequestHandler } from "express";
import { EnergyService } from "../services/energyService";

interface TempsAndEnergyController {
  getTempsAndEnergy: RequestHandler
}

interface Params {
  temperatureService: TemperatureService,
  energyService: EnergyService
}

export const getTempsAndEnergyController = ({
  temperatureService,
  energyService
}: Params): TempsAndEnergyController => ({
  getTempsAndEnergy: (req, res, next) => {

  }
})