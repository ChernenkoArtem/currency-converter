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
      <slot></slot>
      <hr />
      <slot name="content"> </slot>
      <div class="footer">
        <slot name="actions"></slot>
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<style src="./popup.scss" lang="scss"></style>
