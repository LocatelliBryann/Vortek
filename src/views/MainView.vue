<template>
  <div>
    <VideoIntro v-if="mostrarVideo" @video-finalizado="mostrarVideo = false" />

    <div v-else>
      <h1 style="text-align: center; margin-top: 50px;">Bem-vindo ao site!</h1>
    </div>
  </div>
</template>

<script>
import VideoIntro from "@/components/VideoIntro.vue";

export default {
  name: "MainView",
  components: {
    VideoIntro
  },
  data() {
  return {
    mostrarVideo: true
  };
},
mounted() {
  if (sessionStorage.getItem("videoAssistido")) {
    this.mostrarVideo = false;
  }
},
methods: {
  videoFinalizado() {
    this.mostrarVideo = false;
    sessionStorage.setItem("videoAssistido", "true");
  }
}
};
</script>
