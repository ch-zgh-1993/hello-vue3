<template>
    <div ref="root">
        <p v-for="(i, item) in ps" :class="`ps-${i}`" :key="i" :ref="el => {refDivs[i] = el}">
            {{ item }}
        </p>

        <p>我是一个不更新的值: {{d1}}</p>

        <!-- customRef -->
        <input v-model="text">
    </div>
</template>

<script>
import { reactive, toRef, watchEffect } from 'vue'
import { readonlyF } from './reactiveApi'
import { mounted, refFun } from './lifeHooks'
import { tools1, seniorApi } from './reactiveTools'
export default {
    props: {
        head: String,
        foo: Number
    },
    setup (props) {

        readonlyF()

        // 生命周期
        mounted()

        const refs = refFun()

        const ps = reactive([1, 2, 3])

        // 响应式工具
        const {a} = tools1(toRef(props, 'foo'))
        // 打印对象是不行的，Proxy 侦听的是对象的操作，get, set, deletProperty, 根据具体类型来增加，比如 has, ownsKey
        watchEffect(() => {
            console.log(props.foo)
        })
        // 被解构,则失去响应性
        watchEffect(() => {
            console.log('composition 输出的值', a.value)
        })

        let d1 = 1

        setTimeout(() => {
            d1 = 2
        }, 1000)


        // 高级响应式 api
        const {text} = seniorApi()

        return {
            ...refs,
            ps,
            d1,
            text
        }
    },
    mounted () {
        console.log(this.$refs)
    }
}
</script>

<style scoped>
    
</style>