<script setup>
import { ref } from 'vue'
import CharList from '@/components/CharList.vue'
import CharInfo from '@/components/CharInfo.vue'

const selectedChar = ref(null)
</script>

<template>
  <div className="char__content">
    <CharList v-model="selectedChar" />
    <CharInfo :charId="selectedChar" />
  </div>
</template>
<style scoped lang="scss">
@use '../assets/variables.scss' as *;
.char__content {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 650px 425px;
  column-gap: 25px;
  align-items: start;
}
</style>
