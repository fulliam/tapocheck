<template>
    <div class="map">
        <div class="castle-bg-container">
            <img
                v-for="(part, index) in BgParts.castle"
                :key="index"
                :src="part"
                alt=" "
            />
        </div>

        <div class="ruin-bg-container">
            <img
                v-for="(part, index) in BgParts.ruin"
                :key="index"
                :src="part"
                class="ruin-bg-part"
                alt=" "
            />
        </div>

        <div class="forest-bg-container">
            <img
                v-for="(part, index) in BgParts.forest"
                :key="index"
                :src="part"
                class="forest-bg-part"
                alt=" "
            />
        </div>

        <div class="cemetery-bg-container">
            <img
                v-for="(part, index) in BgParts.cemetery"
                :key="index"
                :src="part"
                class="cemetery-bg-part"
                alt=" "
            />
        </div>

        <div class="cave-bg-container">
            <img
                v-for="(part, index) in BgParts.cave"
                :key="index"
                :src="part"
                class="cave-bg-part"
                alt=" "
            />
        </div>
    </div>
</template>

<script>
import { BgParts } from '@/assets/bg/Backgrounds';

export default {
  data() {
    return {
      BgParts,
    };
  },
};
</script>

<style lang="scss">
.map {
    width: 200px;
    height: 100px;
    display: block;
    position: absolute;
    top: 5%;
    left: 5%;
}

.castle-bg-container,
.ruin-bg-container,
.forest-bg-container,
.cemetery-bg-container,
.cave-bg-container {
    display: flex;
    top: 0;
    left: 0;
    height: 50%;
    width: 50%;
    margin: 40px;
}
</style>
