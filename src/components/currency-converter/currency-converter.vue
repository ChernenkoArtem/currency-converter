<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import currencyService from '@/services/currency';
import ISelect from '@/components/select/select.vue';
import { debounce, hetoFixedlpFunc } from '@/utils/utils';
import { IConverter, ConverterData } from './_data/converter.interface';
import { ConverterEnum } from './_data/converter.enum';

@Options({
  components: { ISelect },
})
export default class CurrencyConverter extends Vue {
  commonCurrencySeries = currencyService.commonSeries;

  converterEnum = ConverterEnum;

  onChangeDebounced = debounce(this.onInputChange, 400);

  converterData: IConverter = {
    from: {
      value: '',
      currency: 'USD',
    },
    to: {
      value: '',
      currency: 'BTC',
    },
    exchangeRate: 0,
  };

  mounted() {
    this.setCurrencyRateByOne(this.converterEnum.from);
  }

  selectHandler(value: string, key: string) {
    (this.converterData[key as keyof IConverter] as ConverterData).currency = value;
    this.setCurrencyRateByOne(key);
  }

  onInputChange(value: Event, key: string) {
    const target = value.target as HTMLInputElement;
    (this.converterData[key as keyof IConverter] as ConverterData).value = +target.value;

    this.convert(key);
  }

  convert(key: string) {
    const [, , , toKey] = this.getconverterDataValue(key);
    const fromValue = (this.converterData[key as keyof IConverter] as ConverterData).value;
    let toValue = 0;
    const rate = this.converterData.exchangeRate;
    if (key === this.converterEnum.to) {
      // eslint-disable-next-line no-unused-expressions
      rate < 1
        ? (toValue = hetoFixedlpFunc(+fromValue / rate))
        : (toValue = hetoFixedlpFunc(+fromValue * rate));
    } else if (key === this.converterEnum.from) {
      // eslint-disable-next-line no-unused-expressions
      rate < 1
        ? (toValue = hetoFixedlpFunc(+fromValue * rate))
        : (toValue = hetoFixedlpFunc(+fromValue / rate));
    }

    if (fromValue || toValue) {
      (this.converterData[toKey as keyof IConverter] as ConverterData).value = toValue;
    }
  }

  getconverterDataValue(key: string) {
    const dataObj = this.converterData[key as keyof IConverter];
    const from = (dataObj as ConverterData).currency;
    const amount = (dataObj as ConverterData).value;
    const [toKey] = Object.keys(this.converterData).filter((itemKey) => itemKey !== key);
    const to = (this.converterData[toKey as keyof IConverter] as ConverterData).currency;
    return [from, to, amount, toKey];
  }

  setCurrencyRateByOne(key: string) {
    const [from, to] = this.getconverterDataValue(key);
    if (!from || !to) return;
    currencyService.getCurrencyCompare(from as string, [to as string]).then((value) => {
      this.converterData.exchangeRate = +hetoFixedlpFunc(value.rates[to]);

      this.convert(key);
    });
  }
}
</script>

<template>
  <div class="converter">
    <div class="converter__item">
      <label for="from_input">
        <input
          id="from_input"
          type="text"
          @input="onChangeDebounced($event, converterEnum.from)"
          :value="converterData.from.value"
        />
      </label>
      <ISelect
        :options-list="commonCurrencySeries"
        :default-value="converterData.from.currency"
        @selected-value="selectHandler($event, converterEnum.from)"
      />
    </div>

    <span class="double-arrows">&#8644;</span>

    <div class="converter__item">
      <label for="to_input">
        <input
          id="to_input"
          type="text"
          @input="onChangeDebounced($event, converterEnum.to)"
          :value="converterData.to.value"
        />
      </label>
      <ISelect
        :options-list="commonCurrencySeries"
        :default-value="converterData.to.currency"
        @selected-value="selectHandler($event, converterEnum.to)"
      />
    </div>
  </div>
</template>
<style src="./currency-converter.scss" lang="scss"></style>
