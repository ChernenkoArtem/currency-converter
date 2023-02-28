<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open" @keydown="() => {}">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <slot name="option"> </slot>
      <div v-if="search" class="search-box">
        <label for="searchId">
          <input id="searchId" v-model="searchValue" type="text" placeholder="Start Typing..." />
        </label>
      </div>
      <div
        class="option"
        v-for="(option, i) of filteredList"
        :key="i"
        @click="onChanged(option)"
        @keydown="() => {}"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';

@Options({})
export default class ISelect extends Vue {
  @Prop(Array)
  readonly optionsList!: Array<string>;

  @Prop(Boolean)
  readonly search!: boolean;

  @Prop({ defaultValue: String, required: false })
  readonly defaultValue!: string;

  selected = '';

  searchValue = '';

  open = false;

  mounted() {
    this.selected = this.defaultValue || '';
  }

  @Emit('selected-value')
  selectedValue() {
    return this.selected;
  }

  onChanged(selectedOption: string) {
    this.selected = selectedOption;
    this.open = false;
    this.selectedValue();
  }

  get filteredList() {
    if (this.searchValue.trim().length > 0) {
      const includes = (value: string) => value.includes(this.searchValue.toUpperCase());
      return this.optionsList.filter((name: string) => includes(name));
    }
    return this.optionsList;
  }
}
</script>

<style src="./select.scss" lang="scss"></style>
