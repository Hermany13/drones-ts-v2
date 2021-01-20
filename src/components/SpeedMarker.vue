<template>
  <div class="speed-component-container">
    <div>
      <span>
        {{ speed }}
      </span>
      <p>
        m/h
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SpeedMarker extends Vue {
  @Prop() private speed!: string;
}
</script>

<style>
  .speed-component-container > div {
    display: flex;
    justify-content: center;
  }

  .speed-component-container > div > span {
    font-size: 26px;
    font-weight: 300;
  }

  .speed-component-container > div > p {
    margin-bottom: 4px;
    margin-top: auto;
    font-weight: 300;
    margin-left: 2px;
  }
</style>
