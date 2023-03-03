export type ConverterData = {
  value: string | number;
  currency: string;
};

export interface IConverter {
  from: ConverterData;
  to: ConverterData;
  exchangeRate: number;
}
