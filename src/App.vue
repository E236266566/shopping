<template>
  <div class="app">
    <Header></Header>
    <hr />
    <router-view></router-view>
    <hr />
    <Footer v-show="$route.meta.show"></Footer>
    <hr />
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
export default {
  name: 'app',
  components: {
    Header,
    // eslint-disable-next-line vue/no-unused-components
    Footer
  },
  mounted() {
    this.$store.dispatch('categoryList')
  }
}
</script>

<style></style>
