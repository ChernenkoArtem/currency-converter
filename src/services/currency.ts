import environment from '@/env/environment';

class CurrencyService {
  private headers: Headers;

  commonSeries: Array<string> = ['USD', 'EUR', 'UAH', 'FJD', 'BTC', 'ETB', 'EGP'];

  constructor() {
    this.headers = new Headers();
    this.headers.append('apikey', environment.currencyAPIKey);
  }

  getSymbols(): Promise<Response> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: this.headers,
    };
    return fetch('https://api.apilayer.com/exchangerates_data/symbols', requestOptions);
  }

  getConvert(from: string, to: string, amount: string | number): Promise<Response> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: this.headers,
    };
    return fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions,
    );
  }

  getCurrencyCompare(baseSymbols: string, symbolsSeries: string[]): Promise<Response> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: this.headers,
    };

    // const baseDate = new Date();
    // const date = baseDate.toISOString().split('T')[0];

    return fetch(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbolsSeries}&base=${baseSymbols}`,
      requestOptions,
    );
  }
}

export default new CurrencyService();
