<script setup>
import img from '@/assets/error.gif'
</script>

<template>
  <img
    :src="img"
    alt="Error GIF"
    style="
      display: 'block';
      width: '250px';
      height: '250px';
      objectfit: 'contain';
      margin: '0 auto';
    "
  />
</template>
