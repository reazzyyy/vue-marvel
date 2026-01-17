<script setup>
import Spinner from '@/components/common/BaseSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useMarvelService from '@/composables/MarvelService'
const { loading, error, getComic } = useMarvelService()

const route = useRoute()
const singleComic = ref(null)

const onComicLoaded = (comic) => {
  singleComic.value = comic
  console.log(singleComic.value)
}

const updateComic = () => {
  if (!route.params.id) {
    return
  }
  getComic(route.params.id).then(onComicLoaded)
}

watch(
  () => route.params,
  (newVal) => {
    if (newVal.id) {
      updateComic(newVal.id)
    }
  },
  { immediate: true },
)
</script>

<template>
  <Spinner v-if="loading" />
  <ErrorMessage v-if="error" />
  <div v-if="singleComic" class="single-comic">
    <img :src="singleComic.thumbnail" :alt="singleComic.title" class="single-comic__img" />
    <div class="single-comic__info">
      <h2 class="single-comic__name">{{ singleComic.title }}</h2>
      <p class="single-comic__descr">
        {{ singleComic.description }}
      </p>
      <p class="single-comic__descr">{{ singleComic.pageCount }} pages</p>
      <p class="single-comic__descr">Language: {{ singleComic.language }}</p>
      <div class="single-comic__price">{{ singleComic.price }}</div>
    </div>
    <router-link to="/comics" class="single-comic__back"> Back to all </router-link>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/variables.scss' as *;

.single-comic {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 293px 550px auto;
  column-gap: 50px;
  align-items: start;
  &__img {
    width: 293px;
    height: 450px;
  }
  &__name {
    font-weight: bold;
    font-size: 22px;
    line-height: 29px;
  }
  &__descr {
    font-size: 18px;
    line-height: 24px;
    margin-top: 25px;
  }
  &__price {
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: $main-color;
    margin-top: 25px;
  }
  &__back {
    justify-self: end;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    &:hover {
      color: $main-color;
    }
  }
}
</style>
