<script setup>
import Skeleton from '@/components/common/BaseSkeleton.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import Spinner from '@/components/common/BaseSpinner.vue'
import { useCharactersStore } from '@/stores/characters'
import { storeToRefs } from 'pinia'
const store = useCharactersStore()


const { selectedCharacter, charInfoLoading, error } = storeToRefs(store)
console.log(selectedCharacter);

</script>

<template>
  <div class="char__info">
    <Skeleton v-if="!(selectedCharacter || charInfoLoading || error)" />
    <ErrorMessage v-if="error" />
    <Spinner v-if="charInfoLoading" />

    <template v-if="!(loading || error || !selectedCharacter)">
      <div class="char__basics">
        <img :src="selectedCharacter.thumbnail" :alt="selectedCharacter.name" />
        <div>
          <div class="char__info-name">{{ selectedCharacter.name }}</div>
          <div class="char__btns">
            <a :href="selectedCharacter.homepage" class="button button__main">
              <div class="inner">homepage</div>
            </a>
            <a :href="selectedCharacter.wiki" class="button button__secondary">
              <div class="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div class="char__descr">
        {{ selectedCharacter.description }}
      </div>
      <div class="char__comics">Comics:</div>
      <ul class="char__comics-list">
        <li class="char__comics-item" v-for="comic in selectedCharacter.comics" :key="comic.id">
          {{ comic }}
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/variables.scss' as *;
.char {
  &__info {
    padding: 25px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 5;
    background-color: #fff;
    &-name {
      font-weight: bold;
      font-size: 22px;
      line-height: 29px;
      text-transform: uppercase;
    }
    .skeleton {
      margin-top: 30px;
    }
  }
  &__basics {
    display: grid;
    grid-template-columns: 150px auto;
    column-gap: 25px;
    img {
      width: 150px;
      height: 150px;
      object-fit: cover;
    }
  }
  &__btns {
    margin-top: 35px;
    a:nth-child(2) {
      margin-top: 10px;
    }
  }
  &__descr {
    margin-top: 15px;
    font-size: 14px;
    line-height: 18px;
  }
  &__comics {
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    margin-top: 10px;
    &-list {
      position: relative;
      margin-top: 10px;
    }
    &-item {
      width: 100%;
      padding: 0px 10px;
      line-height: 25px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      margin-top: 10px;
    }
  }
  &__select {
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
  }
}
</style>
