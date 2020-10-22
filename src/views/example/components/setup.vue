<template>
    <div>
        {{text}}
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'base-props',
    setup () {
        // console.log(props, context)
        const text = ref('base props')
        return {
            text
        }
    },
    created() {
    }
}
</script>

<style></style>