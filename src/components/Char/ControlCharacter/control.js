import emitter from '@/eventBus';

export default {
  methods: {
    handleKeyDown(event) {
      if (event.repeat) return;

      const isShiftPressed = event.shiftKey;
      const { keyPressed } = this;

      let speed = this.player.walkingSpeed;

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
        speed = isShiftPressed ? this.player.runningSpeed : this.player.walkingSpeed;

        if (!this.scrollInterval) {
          this.scrollInterval = setInterval(() => {
            speed = this.keyPressed === 'run' ? this.player.runningSpeed : this.player.walkingSpeed;
            let proposedX = this.positionX + (((this.isFacingLeft ? -1 : 1) * speed) / 4);

            if (proposedX < 0) {
              proposedX = 0;
            } else if (proposedX > this.screenWidth - this.characterWidth) {
              proposedX = this.screenWidth - this.characterWidth;
            }

            this.positionX = proposedX;
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

            if (this.player.currentCharacter.name === 'archer' && (attackType === 'attack2' || attackType === 'attack3')) {
              this.shootArrow(attackType);
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
      const attack = this.player.attacks[attackType];
      const direction = this.isFacingLeft ? 'left' : 'right';

      const isCrit = Math.random() < this.player.critChance;

      let finalAttack = attack;

      if (isCrit) {
        finalAttack = { ...attack, damage: attack.damage * this.player.critFactor };
      }

      if (this.player.currentCharacter.name === 'archer' && (attackType === 'attack2' || attackType === 'attack3')) {
        this.shootArrow(attackType);
      }

      emitter.emit('character-attack', {
        damage: finalAttack.damage,
        enemyId: this.enemyId,
        direction,
        isCrit,
      });
    },

    shootArrow(attackType) {
      if (this.player.currentCharacter.name === 'archer') {
        const newArrow = {
          isActive: true,
          hasHit: false,
          positionX: this.isFacingLeft ? this.positionX - 10 : this.positionX + 10,
          speed: 15,
          flightTime: 1000,
          direction: this.isFacingLeft ? 'left' : 'right',
        };

        this.arrows.push(newArrow);

        if (!this.arrowUpdateInterval) {
          this.arrowUpdateInterval = setInterval(() => {
            this.arrows = this.arrows.filter((arrow) => {
              if (arrow.isActive) {
                this.updateArrow(arrow, attackType);
              }
              return arrow.isActive;
            });
            if (this.arrows.length === 0) {
              clearInterval(this.arrowUpdateInterval);
              this.arrowUpdateInterval = null;
            }
          }, 20);
        }
      }
    },

    /* eslint-disable no-param-reassign */
    updateArrow(arrowParam, attackType) {
      const directionMultiplier = arrowParam.direction === 'left' ? -1 : 1;
      arrowParam.flightTime -= 20;

      if (
        this.arrowHitsEnemy(arrowParam)
          || arrowParam.flightTime <= 0
      ) {
        arrowParam.isActive = false;
        this.arrows = this.arrows.filter((arrowItem) => arrowItem.isActive);
        if (this.arrowHitsEnemy(arrowParam) && !arrowParam.hasHit) {
          this.performAttack(attackType);
          arrowParam.hasHit = true;
        }
      } else {
        arrowParam.positionX += arrowParam.speed * directionMultiplier;
      }
    },
    /* eslint-enable no-param-reassign */

    arrowHitsEnemy(arrow) {
      if (Math.abs(arrow.positionX - this.enemyPositionX) <= 30) {
        return true;
      }
      return false;
    },

    applyDamage({ damage, enemyId, enemyPositionX }) {
      this.enemyPositionX = enemyPositionX;
      this.enemyId = enemyId;
      this.player.health -= damage;
      this.damageIndicators.push(damage);
      if (this.player.health <= 0) {
        this.keyPressed = 'dead';
        this.player.health = 0;
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);

        emitter.emit('character-dead' /* who is dead? */);
      }
    },

    removeDamageIndicator(index) {
      this.damageIndicators.splice(index, 1);
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
      this.player.walkingSpeed = walkingSpeed;
    },

    updateRunningSpeed(runningSpeed) {
      this.player.runningSpeed = runningSpeed;
    },

    handleEnemyPosition({ enemyId, enemyPositionX }) {
      this.enemyId = enemyId;
      this.enemyPositionX = enemyPositionX;
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    emitter.on('switch-character', this.switchCharacter);
    emitter.on('update-walking-speed', this.updateWalkingSpeed);
    emitter.on('update-running-speed', this.updateRunningSpeed);
    emitter.on('enemy-position', this.handleEnemyPosition);
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
    emitter.off('enemy-position', this.handleEnemyPosition);
    emitter.off('enemy-attack', this.applyDamage);
    emitter.off('mobile-move', this.handleMobileMove);
    emitter.off('mobile-stop-move', this.handleMobileStopMove);
    emitter.off('mobile-attack', this.handleMobileAttack);
    emitter.off('mobile-stop-attack', this.handleMobileStopAttack);
  },
};
