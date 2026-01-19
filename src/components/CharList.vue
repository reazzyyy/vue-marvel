<script setup>
import { onMounted, useTemplateRef } from 'vue'
import Spinner from '@/components/common/BaseSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import { useCharactersStore } from '@/stores/characters'


const charItmesRefs = useTemplateRef('charItmes')

const store = useCharactersStore()

const focusOnItem = (id) => {
  charItmesRefs.value.forEach((el) => {
    el.classList.remove('char__item_selected')
  })
  charItmesRefs.value[id].classList.add('char__item_selected')
}

const onCharSelected = (id) => {
 store.selectCharacter(id)
}

onMounted(() => {
if (store.characters.length === 0) {
    store.loadCharacters()
  }
})

</script>

<template>
  <div class="char__list">
    <component :is="store.newItemLoading && Spinner"></component>
    <component :is="store.error && ErrorMessage"></component>
    <ul class="char__grid">
      <li
        class="char__item"
        v-for="(char, index) in store.characters"
        :key="char.id"
        ref="charItmes"
        @click="(focusOnItem(index), onCharSelected(char.id))"
      >
        <img
          v-if="char.thumbnail.includes('not_available')"
          style="object-fit: unset"
          :src="char.thumbnail"
          :alt="char.name"
        />
        <img v-else style="object-fit: cover" :src="char.thumbnail" :alt="char.name" />
        <div class="char__name">{{ char.name }}</div>
      </li>
    </ul>
    <button
      class="button button__main button__long"
      @click="store.loadCharacters()"
      :disabled="store.newItemLoading"
      v-if="!store.charEnded"
    >
      <div class="inner">load more</div>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/variables.scss' as *;
.char {
  &__content {
    margin-top: 50px;
    display: grid;
    grid-template-columns: 650px 425px;
    column-gap: 25px;
    align-items: start;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 200px);
    column-gap: 25px;
    row-gap: 30px;
  }
  &__item {
    width: 200px;
    height: 318px;
    background-color: $dark;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
    padding: 15px;
    cursor: pointer;
    transition: 0.3s transform;
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      transform: translate(-15px, -15px);
    }
    &_selected {
      box-shadow: 0 5px 20px $main-color;
      transform: translateY(-8px);
    }
  }
  &__name {
    font-weight: bold;
    font-size: 22px;
    line-height: 29px;
    text-transform: uppercase;
    color: #fff;
  }
}
</style>
