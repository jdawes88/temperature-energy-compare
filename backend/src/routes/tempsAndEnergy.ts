import { Router } from "express";
import { getEnergyRepository } from "../repositories/energyRepository";
import { getEnergyService } from "../services/energyService";
import { getTempsAndEnergyController } from "../controllers/tempsAndEnergyController";
import { getTemperatureService } from "../services/tempertatureService";
import { getTemperatureRepository } from "../repositories/temperatureRepository";

const temperatureRepository = getTemperatureRepository();
const temperatureService = getTemperatureService({ temperatureRepository })
const energyRepository = getEnergyRepository();
const energyService = getEnergyService({ energyRepository })

const tempsAndEnergyController = getTempsAndEnergyController({
  temperatureService,
  energyService
})

const router = Router();

router.get('/', tempsAndEnergyController.getTempsAndEnergy);

export default router;