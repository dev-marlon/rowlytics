<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
    total: number
    max: number
}
const props = defineProps<Props>()

const value = (props.total / props.max) * 100

const color = (value) => {
    if (value > 75 && value < 100) {
        return 'green'
    } else if (value > 50 && value < 75) {
        return 'lime'
    } else if (value > 25 && value < 50) {
        return 'orange'
    } else if (value > 0 && value < 25) {
        return 'red'
    } else {
        return '#000'
    }
}
</script>
<template>
    <v-progress-linear
        :model-value="value"
        :color="color(value)"
        height="10"
        striped
    ></v-progress-linear>
</template>
