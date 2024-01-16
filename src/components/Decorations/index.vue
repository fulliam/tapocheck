<template>
  <div style="display: flex; width: 100%; bottom: 0; position: absolute; left: 5%;">
    <ImgDecorations
        :images="DecorationAnimations.lightning.linear"
    />
    <ImgDecorations
        :images="DecorationAnimations.lightning.cycle"
    />
    <ImgDecorations
        :images="DecorationAnimations.explosion.lightning"
    />
    <ImgDecorations
        :images="DecorationAnimations.explosion.fire"
    />
    <ImgDecorations
        :images="DecorationAnimations.fire"
    />
    <ImgDecorations
        :images="DecorationAnimations.smoke"
    />
    <ImgDecorations
        :images="DecorationAnimations.effect.runSmoke"
    />
    <ImgDecorations
        :images="DecorationAnimations.effect.groundSmoke"
    />
    <ImgDecorations
        :images="DecorationAnimations.effect.poof"
    />
  </div>
</template>

<script>
import { DecorationAnimations } from '@/assets/decorations/DecorationAnimations';
import ImgDecorations from './ImgDecorations/index.vue';

export default {
  name: 'BgDecorations',
  components: {
    ImgDecorations,
  },
  data() {
    return {
      DecorationAnimations,
    };
  },
  methods: {

  },
};
</script>
