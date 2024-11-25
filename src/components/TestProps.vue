<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
    props:['name'] // get value from other components, get from LoginView.vue:5
}
</script>

<style>

</style>