<script setup>
import { ref, onMounted } from 'vue'
import Spinner from '@/components/common/BaseSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import useMarvelService from '@/composables/MarvelService'

const comicsList = ref([])
const { loading, error, getAllComics } = useMarvelService()
const offset = ref(0)
// const newItemLoading = ref(false)
const comicsEnded = ref(false)

const onRequest = () => {
  getAllComics(offset.value).then(onComicsLoaded)
}

const onComicsLoaded = (newComicsList) => {
  let ended = false
  if (newComicsList.length < 8) {
    ended = true
  }
  comicsList.value = [...comicsList.value, ...newComicsList]
  offset.value += 8
  comicsEnded.value = ended
}

onMounted(() => {
  onRequest()
})
</script>

<template>
  <div class="comics__list">
    <Spinner v-if="loading" />
    <ErrorMessage v-if="error" />
    <ul class="comics__grid">
      <li class="comics__item" v-for="comic in comicsList" :key="comic.id">
        <router-link :to="`/comics/${comic.id}`">
          <img :src="comic.thumbnail" :alt="comic.title" class="comics__item-img" />
          <div class="comics__item-name">{{ comic.title }}</div>
          <div class="comics__item-price">{{ comic.price }}</div>
        </router-link>
      </li>
    </ul>
    <button class="button button__main button__long" @click="onRequest" v-if="!comicsEnded">
      <div class="inner">load more</div>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/variables.scss' as *;
.comics {
  &__list {
    margin-top: 45px;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 225px);
    justify-content: space-between;
    row-gap: 55px;
  }
  &__item {
    transition: 0.3s transform;
    &-img {
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
      width: 225px;
      height: 345px;
    }
    &-name {
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
    }
    &-price {
      margin-top: 5px;
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.6);
      text-transform: uppercase;
    }
    &:hover {
      transform: translateY(-5px);
    }
  }
}
</style>
