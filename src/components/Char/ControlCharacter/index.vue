<template>
  <div class="health-bar-outer" :style="{left: (hitbox.x + 120) + 'px'}">
    Char
    <div class="character-statistics">
      Pos X: {{ hitbox.x }}
    </div>
    <div class="health-bar-inner" :style="{width: healthPercentage + '%'}">
      {{ healthPercentage }}%
    </div>
  </div>
  <ImgCharacter
    :key="currentCharacter"
    :images="selectedImages"
    :direction="charDirection"
    :position="charPosition"
    :jump="charJump"
  />
</template>

<script>
import emitter from '@/eventBus';
import { ArcherAnimations } from '@/assets/char/ally/archer/ArcherAnimations';
import { SwordsmanAnimations } from '@/assets/char/ally/swordsman/SwordsmanAnimations';
import { WizardAnimations } from '@/assets/char/ally/wizard/WizardAnimations';
import { PaladinAnimations } from '@/assets/char/enemy/paladin/PaladinAnimations';
import { WarriorAnimations } from '@/assets/char/enemy/warrior/WarriorAnimations';
import ImgCharacter from './ImgCharacter/index.vue';

export default {
  name: 'ControlCharacter',
  components: {
    ImgCharacter,
  },
  props: ['currentAct'],
  data() {
    return {
      screenWidth: window.innerWidth,

      scrollInterval: null,
      currentCharacter: ArcherAnimations,
      characters: [
        ArcherAnimations,
        WizardAnimations,
        SwordsmanAnimations,
        PaladinAnimations,
        WarriorAnimations,
      ],
      keyPressed: 'idle',
      prevKeyPressed: 'idle',
      isFacingLeft: false,
      isJumping: false,

      walkingSpeed: 6,
      runningSpeed: 15,

      maxHealth: 100,
      health: 100,
      hitbox: {
        x: 0,
      },

      attacks: {
        attack: { damage: 5 },
        attack2: { damage: 10 },
        attack3: { damage: 15 },
      },
    };
  },
  computed: {
    selectedImages() {
      switch (this.keyPressed) {
        case 'idle':
          return this.currentCharacter.idle;
        case 'walk':
          return this.currentCharacter.walk;
        case 'run':
          return this.currentCharacter.run;
        case 'jump':
          return this.currentCharacter.jump;
        case 'attack':
          return this.currentCharacter.attack;
        case 'attack2':
          return this.currentCharacter.attack2;
        case 'attack3':
          return this.currentCharacter.attack3;
        case 'dead':
          return this.currentCharacter.dead;
        default:
          return [];
      }
    },
    charDirection() {
      return {
        transform: this.isFacingLeft ? 'scale(-1, 1)' : 'none',
      };
    },
    charJump() {
      return {
        bottom: this.isJumping ? '50px' : '0',
      };
    },
    charPosition() {
      if (this.currentAct === 'ActVI') {
        return {
          char: {
            top: '40%',
          },
          hitbox: {
            bottom: '10%',
          },
        };
      }
      return {
        char: {
          top: '20%',
        },
        hitbox: {
          bottom: '30%',
        },
      };
    },
    healthPercentage() {
      return (this.health / this.maxHealth) * 100;
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    emitter.on('switch-character', this.switchCharacter);
    emitter.on('update-walking-speed', this.updateWalkingSpeed);
    emitter.on('update-running-speed', this.updateRunningSpeed);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    emitter.off('switch-character', this.switchCharacter);
    emitter.off('update-walking-speed', this.updateWalkingSpeed);
    emitter.off('update-running-speed', this.updateRunningSpeed);

    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  },
  methods: {
    performAttack(attackType) {
      const attack = this.attacks[attackType];
      const direction = this.isFacingLeft ? 'left' : 'right';

      emitter.emit('character-attack', {
        x: this.hitbox.x,
        attackType,
        damage: attack.damage,
        direction,
      });
    },

    applyDamage(damage) {
      this.health -= damage;
      if (this.health <= 0) {
        this.keyPressed = 'dead';
        this.health = 0;

        emitter.emit('character-dead', this.currentCharacter);
      }
    },

    handleKeyUp(event) {
      if (event.repeat) return;

      const isShiftReleased = event.code === 'ShiftLeft' || event.code === 'ShiftRight';

      if (isShiftReleased) {
        const shouldReturnToWalk = this.prevKeyPressed === 'walk';
        const shouldReturnToAttack = this.prevKeyPressed === 'attack';

        if (shouldReturnToWalk || shouldReturnToAttack) {
          this.keyPressed = this.prevKeyPressed;
        }
        return;
      }

      if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
        clearInterval(this.scrollInterval);
        this.scrollInterval = null;
        this.prevKeyPressed = this.keyPressed !== 'idle' ? this.keyPressed : this.prevKeyPressed;
        this.keyPressed = 'idle';
      }

      if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && (this.keyPressed === 'run' || this.keyPressed === 'attack2')) {
        this.keyPressed = this.prevKeyPressed;
      }

      switch (event.code) {
        case 'ArrowRight':
        case 'ArrowLeft':
          break;
        default:
          this.keyPressed = 'idle';
          break;
      }
    },

    handleKeyDown(event) {
      if (event.repeat) return;

      const isShiftPressed = event.shiftKey;
      const { keyPressed } = this;

      const speed = isShiftPressed ? this.runningSpeed : this.walkingSpeed;
      let direction = null;

      if (event.code === 'ArrowRight') {
        direction = 'right';
        this.isFacingLeft = false;
        this.keyPressed = isShiftPressed ? 'run' : 'walk';
      } else if (event.code === 'ArrowLeft') {
        direction = 'left';
        this.isFacingLeft = true;
        this.keyPressed = isShiftPressed ? 'run' : 'walk';
      }

      if (direction) {
        if (!this.scrollInterval) {
          this.scrollInterval = setInterval(() => {
            const proposedX = this.hitbox.x + (((this.isFacingLeft ? -1 : 1) * speed) / 4);
            if (proposedX >= 0 && proposedX <= this.screenWidth - 100) {
              this.hitbox.x = proposedX;
            }
            this.updateCharacterPosition();
            this.$emit('update:position', direction, speed);
          }, 20);
        }
      }

      if (event.code === 'Space') {
        this.prevKeyPressed = isShiftPressed && keyPressed === 'idle' ? 'attack' : keyPressed;
        this.keyPressed = isShiftPressed ? 'attack2' : 'attack';

        this.performAttack(isShiftPressed ? 'attack2' : 'attack');
        return;
      }

      this.prevKeyPressed = keyPressed === 'run' ? 'walk' : keyPressed;

      if (isShiftPressed && (this.keyPressed === 'walk' || this.keyPressed === 'run')) {
        this.keyPressed = 'run';
      }

      if (event.code === 'ArrowUp' && !this.isJumping) {
        this.keyPressed = 'jump';
        this.isJumping = true;

        setTimeout(() => {
          this.isJumping = false;
        }, 100);
      }

      if (isShiftPressed && (this.keyPressed === 'attack' || this.keyPressed === 'attack2')) {
        this.keyPressed = 'attack2';
      }

      switch (event.code) {
        case 'ArrowRight':
          this.isFacingLeft = false;
          this.keyPressed = isShiftPressed ? 'run' : 'walk';
          break;
        case 'ArrowLeft':
          this.isFacingLeft = true;
          this.keyPressed = isShiftPressed ? 'run' : 'walk';
          break;
        case 'ArrowUp':
          this.keyPressed = 'jump';
          break;
        case 'Space':
          this.keyPressed = isShiftPressed ? 'attack2' : 'attack';
          break;
        default:
          break;
      }
    },

    updateCharacterPosition() {
      const minHitboxX = 0;
      const maxHitboxX = this.screenWidth - 300;

      this.hitbox.x = Math.max(minHitboxX, Math.min(this.hitbox.x, maxHitboxX));
      emitter.emit('update-position', this.hitbox.x);
    },

    updateAnimationState() {
      if (this.keyPressed.includes('walk') || this.keyPressed.includes('run')) {
        this.keyPressed = (this.isShiftPressed ? 'run' : 'walk');
      }
      if (this.keyPressed.includes('attack')) {
        this.keyPressed = (this.isShiftPressed ? 'attack2' : 'attack');
      }
    },

    switchCharacter() {
      const currentIndex = this.characters.indexOf(this.currentCharacter);
      const nextIndex = (currentIndex + 1) % this.characters.length;
      this.currentCharacter = this.characters[nextIndex];
    },

    updateWalkingSpeed(walkingSpeed) {
      this.walkingSpeed = walkingSpeed;
    },

    updateRunningSpeed(runningSpeed) {
      this.runningSpeed = runningSpeed;
    },
  },
};
</script>

<style lang="scss">
.health-bar-outer {
  position: absolute;
  top: 40%; /* Position the health bar above the character */
  width: 200px; /* Fixed width or relative to character size */
  height: 10px;
  background-color: grey; /* Background color representing lost health */
  border: 1px solid black;
  z-index: 999;
  color: white;
}

.health-bar-inner {
  height: 100%;
  background-color: green; /* Foreground color representing current health */
}

</style>
