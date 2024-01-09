<template>
  <div
    class="click-wrapper"
    @click="handleClick"
    @keyup.space="handleClick"
  >
    <p>Количество кликов: {{ click }}</p>
    <p>Деньги: {{ money }}$</p>
    <p>Один клик прибавляет: {{ clickLvl*moneyLvl }}$</p>
    <p>Автоматический клик прибавляет: {{ autoClickerLvl*clickLvl*moneyLvl }}$</p>
    <p>Прирост денег: {{ moneyLvl }}$</p>
  </div>

  <div class="buy-btn">
    <button
    @click="autoClicker"
    @keyup.enter="autoClicker"
    :disabled="money < autoClickerLvlCost"
  >
    Добавить автоматический клик: {{ autoClickerLvlCost }}$
  </button>

  <button
    @click="lvlUpMoney"
    @keyup.enter="lvlUpMoney"
    :disabled="money < moneyLvlUpCost"
  >
    Увеличить прирост денег: {{ moneyLvlUpCost }}$
    </button>

    <button
      @click="lvlUpClick"
      @keyup.enter="lvlUpClick"
      :disabled="money < clickLvlUpCost"
    >
    Увеличить количество кликов за раз: {{ clickLvlUpCost }}$
    </button>
  </div>
</template>

<script>
export default {
  name: 'ClickWrapper',
  data() {
    return {
      click: 0,
      clickLvl: 1,
      clickLvlUpCost: 5,
      money: 0,
      moneyLvl: 1,
      moneyLvlUpCost: 20,
      autoClickerLvl: 0,
      autoClickerLvlCost: 10,
    };
  },
  methods: {
    handleClick() {
      this.click += this.clickLvl;
      this.money += (this.moneyLvl * this.clickLvl);
    },
    autoClicker() {
      if (this.money >= this.autoClickerLvlCost) {
        setInterval(() => {
          this.click += 1;
          this.money += (this.moneyLvl * this.clickLvl);
        }, 1000);
        this.autoClickerLvl += 1;
        this.money -= this.autoClickerLvlCost;
        this.autoClickerLvlCost *= 15;
      }
    },
    lvlUpMoney() {
      if (this.money >= this.moneyLvlUpCost) {
        this.moneyLvl += 1;
        this.money -= this.moneyLvlUpCost;
        this.moneyLvlUpCost *= 15;
      }
    },
    lvlUpClick() {
      if (this.money >= this.clickLvlUpCost) {
        this.clickLvl += 1;
        this.money -= this.clickLvlUpCost;
        this.clickLvlUpCost *= 15;
      }
    },
  },
};
</script>

<style lang="scss">
@import url('../../assets/styles/ClickWrapper/index.scss');

.buy-btn {
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: 20px;
  width: 80%;
  position: absolute;
  bottom: 10%;

  & button {
    cursor: none;
  }
}
</style>
