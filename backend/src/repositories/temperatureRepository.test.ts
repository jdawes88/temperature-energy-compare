
import { temperature } from "../mocks/temperature";
import { getTemperatureRepository } from "./temperatureRepository";

const setup = () => {
  const temperatureRepository = getTemperatureRepository();
  return temperatureRepository;
};

test('should return a json representation of temperature data', async () => {
  const { getAll } = setup();
  expect(await getAll()).toEqual(temperature);
});