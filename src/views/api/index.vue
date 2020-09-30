<template>
    <div></div>
</template>

<script>
import { readonlyF } from './reactiveApi'
import { mounted } from './lifeHooks'
export default {
    setup () {

        readonlyF()

        // 生命周期
        mounted()

        return {

        }
    }
}
</script>

<style scoped>
    
</style>