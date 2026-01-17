<template>
  <div class="skeleton">
    <p class="char__select">Please select a character to see information</p>
    <div class="skeleton__wrapper">
      <div class="pulse skeleton__header">
        <div class="pulse skeleton__circle"></div>
        <div class="pulse skeleton__mini"></div>
      </div>
      <div class="pulse skeleton__block"></div>
      <div class="pulse skeleton__block"></div>
      <div class="pulse skeleton__block"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  &__header {
    display: grid;
    grid-template-columns: 40px auto;
    column-gap: 10px;
    align-items: center;
  }
  &__circle {
    width: 40px;
    height: 40px;
    background-color: #c4c4c4;
    border-radius: 100%;
  }
  &__mini {
    width: 100%;
    height: 16px;
    background-color: #c4c4c4;
  }
  &__block {
    height: 35px;
    width: 100%;
    background-color: #c4c4c4;
    margin-top: 15px;
  }
}
</style>
