import { temperature } from "../mocks/temperature";
import { TemperatureRepository } from "../repositories/temperatureRepository";
import { getTemperatureService } from "./tempertatureService";

const mockGetAll = jest.fn();

const mockRepository = {
  getAll: mockGetAll
} as TemperatureRepository

const mockTemperatureData = JSON.parse(JSON.stringify(temperature.slice(0, 5)))

const setup = () => {
  const tempertatureService = getTemperatureService({ temperatureRepository: mockRepository });
  return {
    tempertatureService
  }
};

test('should merge anomaly data and all data and add anomaly value to matching data', async () => {
  mockGetAll.mockResolvedValueOnce(mockTemperatureData);
  const { tempertatureService } = setup();
  
  expect(await tempertatureService.getTemperatureData()).toEqual(mockTemperatureData)
  jest.clearAllMocks();
})

test("should throw error if getAll fails", () => {
  mockGetAll.mockRejectedValueOnce(new Error('Data not available'));
  const { tempertatureService } = setup();
  expect(
    async () => await tempertatureService.getTemperatureData()
  ).rejects.toThrow("Unable to get data")
})