class Storage {
  readonly currenciesKey = 'carrencyCompare';

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default new Storage();
