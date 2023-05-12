<template>
    <div>
        <video ref="videoPlayerReference" class="video-js"></video>
    </div>
</template>

<script setup lang="ts">
import videojs from 'video.js'
import { onMounted, onUnmounted, ref } from 'vue'

let videoPlayerReference = ref(null)
let videoPlayer = null

const options = {
    playsinline: true,
    autoplay: true,
    muted: true,
    loop: true,
    controls: false,
    fluid: true,
    sources: [
        {
            src: 'johannes.mp4',
            type: 'video/mp4'
        }
    ]
}

onMounted(() => {
    console.log(videoPlayerReference.value)
    videoPlayer = videojs(videoPlayerReference.value, options, () => {
        videoPlayer.log('onPlayerReady', this)
    })
})

onUnmounted(() => {
    if (videoPlayer) {
        videoPlayer.dispose()
    }
})
</script>
