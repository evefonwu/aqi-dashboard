export interface AirQualityReading {
  DateObserved: string;
  HourObserved: number;
  LocalTimeZone: string;
  ReportingArea: string;
  StateCode: string;
  ParameterName: string;
  AQI: number;
  Category: {
    Number: number;
    Name: string;
  };
}

export interface LocationAirQualityData {
  id: number;
  nickname: string;
  city: string;
  state: string;
  zipcode: string;
  airQualityData: AirQualityReading[] | { error: string };
}
