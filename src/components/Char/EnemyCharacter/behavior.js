import emitter from '@/eventBus';

export default {
  methods: {
    moveEnemy(speed) {
      if (['walk', 'run'].includes(this.enemyState)) {
        const proposedX = this.positionX + (this.direction * speed);

        let startX;
        let endX;
        if (this.direction < 0) {
          startX = this.positionX - 50;
          endX = this.positionX;
        } else {
          startX = this.positionX;
          endX = this.positionX + 50;
        }

        if (proposedX < startX) {
          this.positionX = startX;
          this.direction = 1;
        } else if (proposedX > endX) {
          this.positionX = endX;
          this.direction = -1;
        } else {
          this.positionX = proposedX;
        }
        this.updateEnemyCharacterPosition();
      }
    },

    startMoveInterval() {
      if (this.enemyInterval) {
        clearInterval(this.enemyInterval);
      }
      const speed = this.enemyState === 'walk' ? 4 : 8;
      this.enemyInterval = setInterval(() => {
        this.moveEnemy(speed);
      }, 20);
    },

    updateEnemyCharacterPosition() {
      this.$emit('update-enemy-position', this.positionX);
    },

    updatePositionIfPlayerMove({ direction, speed, playerPositionX }) {
      const leftEdge = 0;
      const rightEdge = this.screenWidth - 350;

      if (direction === 'right' && playerPositionX < rightEdge) {
        this.positionX -= speed;
      } else if (direction === 'left' && playerPositionX > leftEdge) {
        this.positionX += speed;
      }

      this.playerPositionX = playerPositionX;
    },

    applyDamage({ damage, enemyId, direction }) {
      const isFacingEnemy = (this.direction === 1 && direction === 'left')
                        || (this.direction === -1 && direction === 'right');

      if (this.enemyId === enemyId && isFacingEnemy) {
        this.health -= damage;
        if (this.health <= 0) {
          clearInterval(this.enemyInterval);
          clearInterval(this.enemyStateInterval);
          this.enemyState = 'dead';
          this.health = 0;

          emitter.emit('enemy-dead', this.enemyId);
        }
      }
    },

    installEnemyState() {
      const distanceToPlayer = this.positionX - this.playerPositionX;
      this.direction = distanceToPlayer > 0 ? -1 : 1;

      const now = Date.now();
      if (now < this.attackCooldown) {
        return;
      }

      if (this.currentCharacter === 'Demon' || this.currentCharacter === 'Dragon') {
        if (Math.abs(distanceToPlayer) <= this.attackRange) {
          this.attack();
          this.attackCooldown = now + this.attackCooldownDuration;
        } else if (Math.abs(distanceToPlayer) <= 900) {
          this.changeState('walk');
        } else {
          this.changeState('idle');
        }
      } else if (Math.abs(distanceToPlayer) <= this.attackRange) {
        if (this.lastAttack === 'attack2') {
          this.attack();
          this.lastAttack = 'attack';
        } else {
          this.attack2();
          this.lastAttack = 'attack2';
        }
        this.attackCooldown = now + this.attackCooldownDuration;
      } else if (Math.abs(distanceToPlayer) <= 900) {
        this.changeState('run');
      } else if (Math.abs(distanceToPlayer) <= 1600) {
        this.changeState('walk');
      } else {
        this.changeState('idle');
      }
    },

    attack() {
      this.enemyState = 'attack';
      setTimeout(() => {
        if (this.enemyState === 'attack') {
          emitter.emit('enemy-attack', { damage: 2, enemyId: this.enemyId });
        }
      }, 100);
    },

    attack2() {
      this.enemyState = 'attack2';
      setTimeout(() => {
        if (this.enemyState === 'attack2') {
          emitter.emit('enemy-attack', { damage: 2, enemyId: this.enemyId });
        }
      }, 100);
    },

    stopAndIdleEnemy() {
      if (this.enemyInterval) {
        clearInterval(this.enemyInterval);
        this.enemyInterval = null;
      }
      if (this.enemyStateInterval) {
        clearInterval(this.enemyStateInterval);
        this.enemyStateInterval = null;
      }
      this.enemyState = 'idle';
    },

    refreshEnemyHealth() {
      this.health = 100;
      this.enemyStateInterval = setInterval(this.installEnemyState, 100);
      emitter.emit('refresh-enemy', this.enemyId);
    },

    changeState(newState) {
      if (this.enemyInterval) {
        clearInterval(this.enemyInterval);
        this.enemyInterval = null;
      }
      this.enemyState = newState;
      this.enemyStateTime = 0;

      if (['walk', 'run'].includes(newState)) {
        this.startMoveInterval();
      }
    },
  },

  mounted() {
    emitter.on('switch-enemy-character', this.switchCharacter);
    emitter.on('update:position', this.updatePositionIfPlayerMove);
    emitter.on('character-attack', this.applyDamage);
    emitter.on('refresh-enemy-health', this.refreshEnemyHealth);
    emitter.on('character-dead', this.stopAndIdleEnemy);
    this.enemyStateInterval = setInterval(this.installEnemyState, 100);
  },

  beforeUnmount() {
    emitter.off('switch-enemy-character', this.switchCharacter);
    emitter.off('update:position', this.updatePositionIfPlayerMove);
    emitter.off('character-attack', this.applyDamage);
    emitter.off('refresh-enemy-health', this.refreshEnemyHealth);
    emitter.off('character-dead', this.stopAndIdleEnemy);
  },
};
