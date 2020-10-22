<template>
  <div>
    <api 
      v-if="module === 'Api'"
      msg="Welcome to Your Vue.js App"
      head="i am head"
      :foo="foo"
    />

    <example 
      v-else-if="module === 'Example'"
      :msg="msg"
    />
  </div>
</template>

<script>
import api from './views/api'
import example from './views/example'

export default {
  name: 'App',
  data () {
    return {
      foo: 1,
      // 当前模块
      module: 'Example',
      msg: 'hello world'
    }
  },
  components: {
    api,
    example
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this[`init${this.module}`] && this[`init${this.module}`]()
    },
    initApi () {
      // 改变props 的值，看 toRef 的监听
      setTimeout(() => {
        this.foo = 10
      }, 2000)
    },
    initExample () {
      setTimeout(() => {
        this.msg = 'change'
      }, 1000)
    }
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
