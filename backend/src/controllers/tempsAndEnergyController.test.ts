import { Request, Response } from "express";
import { EnergyService } from "../services/energyService";
import { TemperatureService } from "../services/tempertatureService";
import { getTempsAndEnergyController } from "./tempsAndEnergyController";
import { temperature } from "../mocks/temperature";

const mockGetTemperatureData = jest.fn()

const mockTemperatureService = {
  getTemperatureData: mockGetTemperatureData
} as TemperatureService;

const mockGetEnergyData = jest.fn();

const mockEnergyService = {
  getEnergyData: mockGetEnergyData
} as EnergyService;

const setup = () => {
  const tempsAndEnergyController = getTempsAndEnergyController({
    energyService: mockEnergyService,
    temperatureService: mockTemperatureService
  })

  const mockReq = {
  } as Request;
  const mockRes = {
    status: jest.fn(),
    send: jest.fn()
  } as unknown as Response;

  const mockNext = jest.fn()

  return {
    tempsAndEnergyController,
    mockReq,
    mockRes,
    mockNext
  }
}

test("should respond with a 200 and an object with temperature and energy data", async () => {
  const mockEnergyData = [
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
  ];
  mockGetEnergyData.mockResolvedValueOnce(
    mockEnergyData
  );

  const mockTemperatureData = JSON.parse(JSON.stringify(temperature.slice(0, 5)));
  mockGetTemperatureData.mockResolvedValueOnce(mockTemperatureData);

  const { tempsAndEnergyController, mockReq, mockRes, mockNext } = setup();
  await tempsAndEnergyController.getTempsAndEnergy(mockReq, mockRes, mockNext)

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.send).toBeCalledWith({
    energyData: mockEnergyData,
    temperatureData: mockTemperatureData
  })
  jest.clearAllMocks()
})

test('should send 500 code and error if service call fails', async () => {
  const error = new Error('Failed to get energy data')
  mockGetEnergyData.mockRejectedValueOnce(error);

  const { tempsAndEnergyController, mockReq, mockRes, mockNext } = setup();
  await tempsAndEnergyController.getTempsAndEnergy(mockReq, mockRes, mockNext)

  expect(mockRes.status).toBeCalledWith(500);
  expect(mockRes.send).toBeCalledWith({ error })
  jest.clearAllMocks()
})