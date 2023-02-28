<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';

@Options({
  components: {},
})
export default class Popup extends Vue {
  @Prop({ isOpen: Boolean, required: true })
  readonly isOpen!: boolean;

  @Emit('close')
  close() {
    return true;
  }

  handleKeydown(e: KeyboardEvent) {
    if (this.isOpen && e.key === 'Escape') {
      this.close();
    }
  }
}
</script>

<template>
  <div v-if="isOpen" class="backdrop" @click="close" @keydown="handleKeydown">
    <div class="popup" @click.stop>
      <h1 class="popup__title">Select a currency to add to the comparison list</h1>
      <div class="popup__content">
        <slot name="content"> </slot>
      </div>

      <footer class="popup__actions">
        <slot name="actions"></slot>
        <button class="btn-common" @click="close">Close</button>
      </footer>
    </div>
  </div>
</template>

<style src="./popup.scss" lang="scss"></style>
