<template>
  <div>
    <!-- mantém o vídeo -->
    <VideoIntro v-if="mostrarVideo" @video-finalizado="videoFinalizado" />

    <div v-else class="page-dark">
      <!-- HERO -->
      <section class="hero-dark">
        <v-container class="py-10">
          <v-row align="center" justify="start">
            <v-col cols="12" md="10" lg="8">
              <h1 class="hero__title">Suporte de TI ágil e seguro.</h1>
              <p class="hero__subtitle">
                Help desk humano, monitoramento 24×7, segurança, backups e nuvem.
              </p>

              <div class="hero__cta">
                <RouterLink to="/contate">
                  <v-btn size="large" class="btn-primary" prepend-icon="mdi-email-fast">
                    Fale com a gente
                  </v-btn>
                </RouterLink>

                <RouterLink to="/about">
                  <v-btn size="large" variant="text" class="btn-ghost" append-icon="mdi-arrow-right">
                    Sobre nós
                  </v-btn>
                </RouterLink>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- SERVIÇOS -->
      <section class="section">
        <v-container>
          <h2 class="section__title">Nossos serviços</h2>

          <!-- CARD CERTIFICADOS (com imagem redonda no canto) -->
          <v-card class="card card--relative mb-6" elevation="4">
            <!-- <v-avatar class="badge-img" size="72">
              <v-img src="../assets/img/TokenA3.png" alt="Token A3" cover />
            </v-avatar> -->

            <v-card-title class="card__title">
              <v-icon class="mr-2">mdi-certificate</v-icon>
              Certificados Digitais (A1/A2/A3)
            </v-card-title>

            <v-card-text class="card__text">
              Homologação e emissão de certificados digitais <strong>A1</strong> e
              <strong>A3</strong> para <strong>pessoa física</strong> e
              <strong>jurídica</strong>. Prontos para uso em sistemas fiscais,
              assinatura eletrônica e integrações.
            </v-card-text>

            <v-card-actions>
              <RouterLink to="/contate">
                <v-btn class="btn-primary" prepend-icon="mdi-cash-multiple">
                  Consultar valores
                </v-btn>
              </RouterLink>
            </v-card-actions>
          </v-card>

          <!-- CARD FORMATAÇÃO -->
          <v-card class="card mb-6" elevation="4">
            <v-card-title class="card__title">
              <v-icon class="mr-2">mdi-laptop</v-icon>
              Formatação & Otimização
            </v-card-title>
            <v-card-text class="card__text">
              Instalação limpa do sistema, drivers e aplicativos essenciais,
              ajustes de desempenho e antivírus configurado. Opcional de backup
              incluído.
            </v-card-text>
            <!-- <v-card-actions>
              <RouterLink to="/contate">
                <v-btn variant="text" class="btn-ghost" append-icon="mdi-arrow-right">
                  Falar com suporte
                </v-btn>
              </RouterLink>
            </v-card-actions> -->
          </v-card>

          <!-- CARD CONFIGURAÇÕES -->
          <v-card class="card mb-6" elevation="4">
            <v-card-title class="card__title">
              <v-icon class="mr-2">mdi-access-point-network</v-icon>
              Configurações & Redes
            </v-card-title>
            <v-card-text class="card__text">
              Instalação e configuração de impressoras, scanners, e-mails,
              compartilhamentos, redes Wi-Fi e cabeamento. Ajustes de políticas
              e integrações com nuvem.
            </v-card-text>
            <!-- <v-card-actions>
              <RouterLink to="/contate">
                <v-btn variant="text" class="btn-ghost" append-icon="mdi-arrow-right">
                  Solicitar atendimento
                </v-btn>
              </RouterLink>
            </v-card-actions> -->
          </v-card>
        </v-container>
      </section>
    </div>
  </div>
</template>

<script>
import VideoIntro from "@/components/VideoIntro.vue";

export default {
  name: "MainView",
  components: { VideoIntro },
  data() {
    return { mostrarVideo: true };
  },
  mounted() {
    if (sessionStorage.getItem("videoAssistido")) this.mostrarVideo = false;
  },
  methods: {
    videoFinalizado() {
      this.mostrarVideo = false;
      sessionStorage.setItem("videoAssistido", "true");
    }
  }
};
</script>

<style scoped>
:root {
  --bg-dark: #0b0b0b;
  --text: #ffffff;
  --muted: rgba(255, 255, 255, 0.82);
  --accent: #ff7a1a;
  --accent-2: #ff9a3c;
  --card-bg: #141414;
}

.page-dark {
  background: linear-gradient(
    180deg,
    var(--bg-dark) 0%,
    #111111 50%,
    #0b0b0b 100%
  );
  color: var(--text);
  min-height: 100vh;
}

/* HERO */
.hero-dark {
  background: linear-gradient(
    180deg,
    rgba(255, 122, 26, 0.12) 0%,
    rgba(255, 154, 60, 0.06) 100%
  );
}
.hero__title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  line-height: 1.1;
  color: var(--text);
}
.hero__subtitle {
  margin-top: 10px;
  font-size: 1.1rem;
  color: var(--muted);
}
.hero__cta {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* SEÇÕES */
.section {
  padding: 56px 0;
}
.section__title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 800;
  margin-bottom: 18px;
  color: var(--text);
}

/* CARDS */
.card {
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
.card--relative { position: relative; }
.card__title {
  font-weight: 700;
  color: var(--text);
}
.card__text {
  color: var(--muted);
}

/* Imagem redonda pequena no canto do card */
.badge-img {
  position: absolute;
  top: 14px;
  right: 14px;
  border: 2px solid rgba(255,255,255,0.2);
  background: #1a1a1a;
  box-shadow: 0 6px 18px rgba(0,0,0,.25);
}

/* BOTÕES */
.btn-primary {
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #111 !important;
  font-weight: 800;
}
.btn-ghost {
  color: var(--text) !important;
  font-weight: 600;
}

/* Espaçamento entre os cards */
.mb-6 { margin-bottom: 24px; }
</style>
