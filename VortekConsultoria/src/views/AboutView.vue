<template>
  <div class="page-dark">
    <section class="hero-dark">
      <v-container class="py-10">
        <v-row align="center" justify="start">
          <v-col cols="12" md="10" lg="8">
            <h1 class="hero__title">Sobre mim</h1>
            <p class="hero__subtitle">
              Escreva aqui um resumo curto e marcante sobre você ou sua consultoria.
            </p>
            <div class="hero__cta">
              <RouterLink to="/contate">
                <v-btn size="large" class="btn-primary" prepend-icon="mdi-email-fast">
                  Fale comigo
                </v-btn>
              </RouterLink>
              <RouterLink to="/">
                <v-btn size="large" variant="text" class="btn-ghost" append-icon="mdi-arrow-right">
                  Voltar à Home
                </v-btn>
              </RouterLink>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="section">
      <v-container>
        <h2 class="section__title">Quem sou</h2>

        <v-card class="card mb-6" elevation="4">
          <v-card-title class="card__title">
            <v-icon class="mr-2">mdi-account-badge</v-icon>
            Apresentação
          </v-card-title>
          <v-card-text class="card__text">
            <p>Escreva aqui sua história, propósito e o que o motiva.</p>
            <p>Detalhe sua atuação, como ajuda clientes e o diferencial do seu trabalho.</p>
          </v-card-text>
        </v-card>

        <v-card class="card mb-6" elevation="4">
          <v-card-title class="card__title">
            <v-icon class="mr-2">mdi-target-account</v-icon>
            Missão, Visão e Valores
          </v-card-title>
          <v-card-text class="card__text">
            <ul>
              <li><strong>Missão:</strong> descreva sua missão.</li>
              <li><strong>Visão:</strong> descreva sua visão de futuro.</li>
              <li><strong>Valores:</strong> liste de 3 a 5 valores essenciais.</li>
            </ul>
          </v-card-text>
        </v-card>

        <v-card class="card mb-6" elevation="4">
          <v-card-title class="card__title">
            <v-icon class="mr-2">mdi-star-circle</v-icon>
            Experiência e Especialidades
          </v-card-title>
          <v-card-text class="card__text">
            <ul>
              <li>Descreva áreas de atuação principais.</li>
              <li>Principais resultados alcançados.</li>
              <li>Setores ou tipos de clientes atendidos.</li>
            </ul>
          </v-card-text>
        </v-card>

        <v-card class="card mb-6" elevation="4">
          <v-card-title class="card__title">
            <v-icon class="mr-2">mdi-certificate</v-icon>
            Certificações e Parcerias
          </v-card-title>
          <v-card-text class="card__text">
            <ul>
              <li>Liste certificações relevantes.</li>
              <li>Parcerias estratégicas e afiliações.</li>
              <li>Prêmios ou reconhecimentos.</li>
            </ul>
          </v-card-text>
        </v-card>

        <v-card class="card mb-6" elevation="4">
          <v-card-title class="card__title">
            <v-icon class="mr-2">mdi-chat-processing</v-icon>
            Depoimentos ou Cases
          </v-card-title>
          <v-card-text class="card__text">
            <p>Inclua um ou dois depoimentos curtos ou resumos de casos de sucesso.</p>
          </v-card-text>
          <v-card-actions>
            <RouterLink to="/contate">
              <v-btn class="btn-primary" prepend-icon="mdi-email-fast">
                Entre em contato
              </v-btn>
            </RouterLink>
          </v-card-actions>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "SobreView",
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
  background: linear-gradient(180deg, var(--bg-dark) 0%, #111111 50%, #0b0b0b 100%);
  color: var(--text);
  min-height: 100vh;
}
.hero-dark {
  background: linear-gradient(180deg, rgba(255, 122, 26, 0.12) 0%, rgba(255, 154, 60, 0.06) 100%);
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
.section {
  padding: 56px 0;
}
.section__title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 800;
  margin-bottom: 18px;
  color: var(--text);
}
.card {
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
.card__title {
  font-weight: 700;
  color: var(--text);
}
.card__text {
  color: var(--muted);
}
.btn-primary {
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #111 !important;
  font-weight: 800;
}
.btn-ghost {
  color: var(--text) !important;
  font-weight: 600;
}
.mb-6 {
  margin-bottom: 24px;
}

</style>
