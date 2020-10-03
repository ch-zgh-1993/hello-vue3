<template>
    <div ref="root"></div>
</template>

<script>
import { readonlyF } from './reactiveApi'
import { mounted, refFun } from './lifeHooks'
export default {
    setup () {

        readonlyF()

        // 生命周期
        mounted()

        const refs = refFun()

        return {
            ...refs
        }
    },
    mounted () {
        console.log(this.$refs)
    }
}
</script>

<style scoped>
    
</style>