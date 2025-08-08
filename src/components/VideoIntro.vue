<template>
  <div v-if="mostrar" class="video-overlay">
    <button class="fechar-btn" @click="fecharVideo">✕</button>
    <video
      src="/video/vortek-all.mp4"
      autoplay
      muted
      playsinline
      @ended="fecharVideo"
    ></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mostrar: true
    };
  },
  methods: {
    fecharVideo() {
      this.mostrar = false;
      this.$emit("video-finalizado");
    }
  }
};
</script>

<style scoped>
.video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fechar-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 24px;
  padding: 5px 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

.fechar-btn:hover {
  background: rgba(255, 0, 0, 0.7);
}
</style>
