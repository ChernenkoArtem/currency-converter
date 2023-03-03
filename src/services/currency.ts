import environment from '@/env/environment';

class CurrencyService {
  private headers: Headers;

  commonSeries: Array<string> = ['USD', 'EUR', 'UAH', 'FJD', 'BTC', 'ETB', 'EGP'];

  constructor() {
    this.headers = new Headers();
    this.headers.append('apikey', environment.currencyAPIKey);
  }

  getSymbols(): Promise<any> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: this.headers,
    };
    return fetch('https://api.apilayer.com/exchangerates_data/symbols', requestOptions).then(
      (res) => Promise.resolve(this.parseResponse(res)),
    );
  }

  getConvert(from: string, to: string, amount: string | number): Promise<any> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: this.headers,
    };
    return fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions,
    ).then((res) => Promise.resolve(this.parseResponse(res)));
  }

  getCurrencyCompare(baseSymbols: string, symbolsSeries: string[]): Promise<any> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: this.headers,
    };

    return fetch(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbolsSeries}&base=${baseSymbols}`,
      requestOptions,
    ).then((res) => Promise.resolve(this.parseResponse(res)));
  }

  private async parseResponse(res: Response) {
    return JSON.parse(await res.text());
  }
}

export default new CurrencyService();
