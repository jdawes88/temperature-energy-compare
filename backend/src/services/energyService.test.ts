import { EnergyRepository } from "../repositories/energyRepository";
import { getEnergyService } from "./energyService";

const mockGetAll = jest.fn();
const mockGetAllAnomalies = jest.fn();

const mockRepository = {
  getAll: mockGetAll,
  getAllAnomalies: mockGetAllAnomalies
} as EnergyRepository

const mockEnergyData = [
  {
    "Timestamp": "2020-01-01T11:30:00Z",
    "Consumption": 33.59
  },
  {
    "Timestamp": "2020-01-01T12:00:00Z",
    "Consumption": 32.66
  },
  {
    "Timestamp": "2020-01-01T12:30:00Z",
    "Consumption": 34.16
  },
  {
    "Timestamp": "2020-01-02T15:00:00Z",
    "Consumption": 20.92
  },
  {
    "Timestamp": "2020-01-02T15:30:00Z",
    "Consumption": 26.79
  }
]

const mockAnomalies = [
  {
    "Timestamp": "2020-01-01T12:00:00Z",
    "Consumption": 32.66
  },
  {
    "Timestamp": "2020-01-01T12:30:00Z",
    "Consumption": 34.16
  },
]

const setup = () => {
  const energyService = getEnergyService({ energyRepository: mockRepository });
  return {
    energyService
  }
};

test('should merge anomaly data and all data and add anomaly value to matching data', async () => {
  mockGetAll.mockResolvedValueOnce(mockEnergyData);
  mockGetAllAnomalies.mockResolvedValue(mockAnomalies)
  const { energyService } = setup();
  const expectedData = [
    {
      "Timestamp": "2020-01-01T11:30:00Z",
      "Consumption": 33.59,
      anomaly: false

    },
    {
      "Timestamp": "2020-01-01T12:00:00Z",
      "Consumption": 32.66,
      anomaly: true
    },
    {
      "Timestamp": "2020-01-01T12:30:00Z",
      "Consumption": 34.16,
      anomaly: true
    },
    {
      "Timestamp": "2020-01-02T15:00:00Z",
      "Consumption": 20.92,
      anomaly: false
    },
    {
      "Timestamp": "2020-01-02T15:30:00Z",
      "Consumption": 26.79,
      anomaly: false
    }
  ]
  expect(await energyService.getEnergyData()).toEqual(expectedData)
  jest.clearAllMocks();
})

test("should throw error if getAll fails", () => {
  mockGetAll.mockRejectedValueOnce(new Error('Data not available'));
  const { energyService } = setup();
  expect(
    async () => await energyService.getEnergyData()
  ).rejects.toThrow("Unable to get data")
})