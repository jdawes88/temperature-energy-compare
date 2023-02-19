import { halfHourlyEnergy } from "../mocks/halfHourlEnergy";
import { halfHourlyEnergyAnomalies } from "../mocks/halfHourlyEnergyAnomalies";
import { getEnergyRepository, Energy } from "./energyRepository";

const setup = () => {
  const energyRepository = getEnergyRepository();
  return energyRepository;
};

test('should return a json representation of half hourly energy data', async () => {
  const { getAll } = setup();
  expect(await getAll()).toEqual(halfHourlyEnergy);
})

test('should return a json representation of half hourly energy data anomalies', async () => {
  const { getAllAnomalies } = setup();
  expect(await getAllAnomalies()).toEqual(halfHourlyEnergyAnomalies);
});