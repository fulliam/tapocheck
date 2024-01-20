export default {
  ActI: [
    {
      enemyId: 'war',
      initialCharacter: 'Warrior',
      initialPositionX: 1100,
      initialHealth: 30,
      initialMaxHealth: 30,
      initialAttack: 3,
      attackRange: 210,
      currencyDrop: [
        {
          currencyId: 'silver', type: 'coin', amount: 5, chance: 0.5,
        },
        {
          currencyId: 'gold', type: 'coin', amount: 3, chance: 0.3,
        },
        {
          currencyId: 'blue', type: 'gem', amount: 1, chance: 0.1,
        },
      ],
    },
    {
      enemyId: 'war1',
      initialCharacter: 'Warrior',
      initialPositionX: 1900,
      initialHealth: 30,
      initialMaxHealth: 30,
      initialAttack: 3,
      attackRange: 210,
    },
    {
      enemyId: 'war2',
      initialCharacter: 'Warrior',
      initialPositionX: 2600,
      initialHealth: 30,
      initialMaxHealth: 30,
      initialAttack: 3,
      attackRange: 210,
    },
  ],
  ActII: [
    // Описание врагов для Act II
  ],
  // Дополнительные акты и их враги...
};
