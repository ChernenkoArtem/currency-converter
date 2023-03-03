<template>
  <CurrencyConverter />
  <CurrenciesCompareList />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CurrencyConverter from '@/components/currency-converter/currency-converter.vue';
import CurrenciesCompareList from '@/components/currencies-list/currencies-list.vue';

@Options({
  components: { CurrencyConverter, CurrenciesCompareList },
})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
}

body {
  padding: 10px;
}

.btn-common {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #2f3640;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #2f3640;
  text-align: center;
  transition: all 0.2s;
  &:hover {
    color: #d1cdcd;
    background-color: #2f3640;
    cursor: pointer;
  }
}
</style>
