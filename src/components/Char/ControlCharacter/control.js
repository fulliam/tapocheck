import emitter from '@/eventBus';

export default {
  methods: {
    handleKeyDown(event) {
      if (event.repeat) return;

      const isShiftPressed = event.shiftKey;
      const { keyPressed } = this;

      let speed = this.walkingSpeed;

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
        this.keyPressed = isShiftPressed ? 'run' : 'walk';
        speed = isShiftPressed ? this.runningSpeed : this.walkingSpeed;

        if (!this.scrollInterval) {
          this.scrollInterval = setInterval(() => {
            speed = this.keyPressed === 'run' ? this.runningSpeed : this.walkingSpeed;
            const proposedX = this.positionX + (((this.isFacingLeft ? -1 : 1) * speed) / 4);
            if (proposedX >= 0 && proposedX <= this.screenWidth - 100) {
              this.positionX = proposedX;
            }
            this.updateCharacterPositionX();
            emitter.emit('update:position', { direction, speed, playerPositionX: this.positionX });
          }, 20);
        }
      }

      if (event.code === 'Space') {
        let attackType;
        if (event.ctrlKey) {
          attackType = 'attack3';
          this.keyPressed = attackType;
        } else if (isShiftPressed && keyPressed === 'idle') {
          attackType = 'attack2';
          this.keyPressed = attackType;
        } else if (isShiftPressed) {
          attackType = 'attack2';
          this.keyPressed = attackType;
        } else {
          attackType = 'attack';
          this.keyPressed = attackType;
        }

        this.prevKeyPressed = this.keyPressed;

        if (!this.attackInterval) {
          this.attackInterval = setInterval(() => {
            if (this.scrollInterval) {
              clearInterval(this.scrollInterval);
            }
            this.performAttack(attackType);
          }, this.animationLen * 100);
        }
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

      const isCtrlReleased = event.code === 'ControlLeft' || event.code === 'ControlRight';

      if (isCtrlReleased) {
        const shouldReturnToAttack = this.prevKeyPressed === 'attack';

        if (shouldReturnToAttack) {
          this.keyPressed = this.prevKeyPressed;
        }
        return;
      }

      if (event.code === 'Space') {
        clearInterval(this.attackInterval);
        this.attackInterval = null;
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

    handleMobileMove(direction) {
      let event;

      if (direction === 'left') {
        event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
      } else if (direction === 'right') {
        event = new KeyboardEvent('keydown', { code: 'ArrowRight' });
      }

      if (event) {
        this.handleKeyDown(event);
      }
    },

    handleMobileStopMove(direction) {
      let event;

      if (direction === 'left') {
        event = new KeyboardEvent('keyup', { code: 'ArrowLeft' });
      } else if (direction === 'right') {
        event = new KeyboardEvent('keyup', { code: 'ArrowRight' });
      }

      if (event) {
        this.handleKeyUp(event);
      }
    },

    handleMobileAttack(attackType) {
      let event;

      if (attackType === 'attack') {
        event = new KeyboardEvent('keydown', { code: 'Space', shiftKey: false });
      } else if (attackType === 'attack2') {
        event = new KeyboardEvent('keydown', { code: 'Space', shiftKey: true });
      } else if (attackType === 'attack3') {
        event = new KeyboardEvent('keydown', { code: 'Space', ctrlKey: true });
      }

      if (event) {
        this.handleKeyDown(event);
      }
    },

    handleMobileStopAttack() {
      const event = new KeyboardEvent('keyup', { code: 'Space' });
      this.handleKeyUp(event);
    },

    performAttack(attackType) {
      const attack = this.attacks[attackType];
      const direction = this.isFacingLeft ? 'left' : 'right';

      emitter.emit('character-attack', {
        damage: attack.damage,
        enemyId: this.enemyId,
        direction,
      });
    },

    applyDamage({ damage, enemyId }) {
      this.enemyId = enemyId;
      this.health -= damage;
      if (this.health <= 0) {
        this.keyPressed = 'dead';
        this.health = 0;

        emitter.emit('character-dead' /* who is dead? */);
      }
    },

    updateCharacterPositionX() {
      const minHitboxX = 0;
      const maxHitboxX = this.screenWidth - 300;

      this.positionX = Math.max(minHitboxX, Math.min(this.positionX, maxHitboxX));
      emitter.emit('update:char-positionX', this.positionX);
    },

    updateAnimationState() {
      if (this.keyPressed.includes('walk') || this.keyPressed.includes('run')) {
        this.keyPressed = (this.isShiftPressed ? 'run' : 'walk');
      }
      if (this.keyPressed.includes('attack')) {
        this.keyPressed = (this.isShiftPressed ? 'attack2' : 'attack');
      }
    },

    updateWalkingSpeed(walkingSpeed) {
      this.walkingSpeed = walkingSpeed;
    },

    updateRunningSpeed(runningSpeed) {
      this.runningSpeed = runningSpeed;
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    emitter.on('switch-character', this.switchCharacter);
    emitter.on('update-walking-speed', this.updateWalkingSpeed);
    emitter.on('update-running-speed', this.updateRunningSpeed);
    emitter.on('enemy-attack', this.applyDamage);
    emitter.on('mobile-move', this.handleMobileMove);
    emitter.on('mobile-stop-move', this.handleMobileStopMove);
    emitter.on('mobile-attack', this.handleMobileAttack);
    emitter.on('mobile-stop-attack', this.handleMobileStopAttack);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    emitter.off('switch-character', this.switchCharacter);
    emitter.off('update-walking-speed', this.updateWalkingSpeed);
    emitter.off('update-running-speed', this.updateRunningSpeed);
    emitter.off('enemy-attack', this.applyDamage);
    emitter.off('mobile-move', this.handleMobileMove);
    emitter.off('mobile-stop-move', this.handleMobileStopMove);
    emitter.off('mobile-attack', this.handleMobileAttack);
    emitter.off('mobile-stop-attack', this.handleMobileStopAttack);
  },
};