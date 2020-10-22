<template>
    <div>
        <!-- <h1>api 基本介绍</h1>
        <div ref="div1"></div>
        <div v-if="showRef" ref="div2"></div>-->
        <base-props></base-props> 
        <p>{{ aRef }}</p>
        <p>{{ bRef }}</p>
        <p ref="xx">{{bReactive}}</p>
    </div>
</template>

<script>
import baseProps from './components/setup'

import { paramFun, reactiveFun } from './example'
import { isRef, toRefs, watchEffect, ref, toRef, reactive, watch } from 'vue'
export default {
    name: 'example',
    props: {
        msg: String
    },
    beforeCreate() {
        console.log('beforeCreate--------------')
        console.log(this.msg1)
    },
    setup (props, context) {
        console.log('setup--------------')
        console.log(isRef, toRefs, ref)

        // 参数介绍
        paramFun(this, props, context.attrs, context.emit, context.slots, context.refs)
        watchEffect(() => {
            console.log(context.refs)
        })

        // 响应式系统
        reactiveFun(toRef(props, 'msg'))

        watchEffect(() => {
            console.log(props.msg)
        })

        console.log(reactive)
        console.group('test -----------------')

        let aRef = ref(0)
        let aReactvie = reactive({
            bRef: 1,
            cRef: 2
        })
        console.log(aReactvie)
        let bReactive = ref(1)

        watchEffect(() => {
            console.log('test', bReactive.value)
        }, {
            onTrack () {
                console.log('开始监听')
            },
            onTrigger () {
                console.log('触发更新')
            }
        })
        watchEffect(() => {
            console.log('test', aReactvie.bRef)
        })
        watch([aRef, bReactive], ([aNew, bnew], [aold, bold]) => {
            // console.log(arguments)
            console.log('test watch', aNew, aold)
            console.log('test watch', bnew, bold)
        })

        setTimeout(() => {
            aRef.value = 10
            aReactvie.bRef = 10
            bReactive.value = 10
        }, 1000)


        console.groupEnd()
        return {
            showRef: false,
            aRef,
            ...toRefs(aReactvie),
            bReactive
        }
    },
    components: {
        baseProps
    },
    mounted () {
    },
    data () {
        return {
            msg1: 'xxxx'
        }
    }
}
</script>

<style>

</style>