<template>
    <div class="video-player">
        <video ref="videoPlayerReference" class="video-js"></video>
    </div>
</template>

<script setup lang="ts">
import videojs from 'video.js'
import { computed, defineProps, onMounted, onUnmounted, ref, onUpdated } from 'vue'

interface Props {
    src: string
}
const props = defineProps<Props>()

const srcValue = computed(() => props.src)

let videoPlayerReference = ref(null)
let videoPlayer = null

const options = {
    autoplay: true,
    muted: true,
    loop: true,
    controls: false,
    fluid: true,
    sources: [
        {
            src: srcValue.value,
            type: 'video/mp4'
        }
    ]
}

onMounted(() => {
    videoPlayer = videojs(videoPlayerReference.value, options)
})

onUnmounted(() => {
    if (videoPlayer) {
        videoPlayer.dispose()
    }
})

onUpdated(() => {
    if (videoPlayer) {
        videoPlayer.src(srcValue.value)
    }
})
</script>
