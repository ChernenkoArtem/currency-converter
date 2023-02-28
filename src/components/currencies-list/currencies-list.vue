<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import currencyService from '@/services/currency';
import ISelect from '@/components/select/select.vue';
import Popup from '@/components/popup/popup.vue';
import Storage from '@/services/storage';
import { Watch } from 'vue-property-decorator';

@Options({
  components: { ISelect, Popup },
})
export default class CurrenciesCompareList extends Vue {
  baseCurrencySelected!: string;

  isPopupOpen = false;

  fullyCurrenciesSymbolsList: Array<string> = [];

  readonly selectCurrenciesList = ['USD', 'EUR', 'UAH'];

  compareCurrenciesList = ['USD', 'EUR', 'UAH', 'BTC'];

  compareCurrenciesRates: Array<Array<string>> = [];

  selectedSearchValue!: string;

  mounted() {
    const key = Storage.currenciesKey;

    try {
      const carrenciesList = Storage.getItem(key);
      this.compareCurrenciesList = carrenciesList;
    } catch (e) {
      Storage.setItem(key, this.compareCurrenciesList);
    }
  }

  selectedHandler(value: string) {
    this.baseCurrencySelected = value;

    this.compareCurrencies();
  }

  compareCurrencies() {
    currencyService
      .getCurrencyCompare(this.baseCurrencySelected, this.compareCurrenciesList)
      .then((res) => res.text())
      .then((v) => {
        const value = JSON.parse(v);
        this.compareCurrenciesRates = Object.entries(value.rates);
      });
  }

  openPopup() {
    if (this.fullyCurrenciesSymbolsList.length < 1) {
      currencyService
        .getSymbols()
        .then((res) => res.text())
        .then((v) => {
          const value = JSON.parse(v);

          this.fullyCurrenciesSymbolsList = Object.keys(value.symbols);
        });
    }
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  searchValue(value: string) {
    this.selectedSearchValue = value;
  }

  addCurrency() {
    if (!this.selectedSearchValue) return;

    this.compareCurrenciesList = [...this.compareCurrenciesList, this.selectedSearchValue];
  }

  @Watch('compareCurrenciesList')
  setCompareListToStorage() {
    console.log('Watch work');

    const key = Storage.currenciesKey;
    Storage.setItem(key, this.compareCurrenciesList);
  }
}
</script>

<template>
  <div class="compare-wrapper">
    <div class="currencies">
      <ISelect
        :options-list="selectCurrenciesList"
        default-value="USD"
        @selected-value="selectedHandler"
      />

      <div class="currencies__compare compare">
        <div
          v-for="[name, value] in compareCurrenciesRates"
          v-bind:key="name"
          class="compare__item item"
        >
          <div class="item__name">{{ name }}</div>
          <div class="item__value">{{ value }}</div>
        </div>
      </div>
    </div>
    <button class="btn-common" @click="openPopup">OPEN POPUP</button>
  </div>

  <Popup :is-open="isPopupOpen" @close="closePopup">
    <template #content>
      <ISelect
        :options-list="fullyCurrenciesSymbolsList"
        :search="true"
        default-value=""
        @selected-value="searchValue"
      >
      </ISelect>
    </template>
    <template #actions>
      <button class="btn-common" @click="addCurrency">Add currency</button>
    </template>
  </Popup>
</template>

<style src="./currencies-list.scss" lang="scss"></style>
