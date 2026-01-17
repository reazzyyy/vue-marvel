<template>
  <header class="app__header">
    <h1 class="app__title">
      <router-link to="/"> <span>Marvel</span> information portal </router-link>
    </h1>
    <nav class="app__menu">
      <ul>
        <li><router-link to="/">Characters</router-link></li>
        /
        <li><router-link to="/comics">Comics</router-link></li>
      </ul>
    </nav>
  </header>
</template>
<style lang="scss" scoped>
@use '../../assets/variables.scss' as *;
.router-link-active {
  color: $main-color;
}
.app {
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__title {
    font-weight: bold;
    font-size: 28px;
    line-height: 37px;
    span {
      color: $main-color;
    }
  }
  &__menu {
    ul {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      li {
        margin: 0 8px;
        a:hover {
          color: $main-color;
        }
      }
    }
  }
}
</style>
