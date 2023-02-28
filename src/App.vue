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
</style>
