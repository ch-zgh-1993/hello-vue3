<template>
  <api 
    msg="Welcome to Your Vue.js App"
    head="i am head"
    :foo="foo"
  />
</template>

<script>
import api from './views/api'

export default {
  name: 'App',
  data () {
    return {
      foo: 1
    }
  },
  components: {
    api
  },
  mounted () {
    // 改变props 的值，看 toRef 的监听
    setTimeout(() => {
      this.foo = 10
    }, 2000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
