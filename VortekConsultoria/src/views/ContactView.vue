<template>
  <div class="page-dark">
    <section class="hero-dark">
      <v-container class="py-10">
        <v-row align="center" justify="start">
          <v-col cols="12" md="10" lg="8">
            <h1 class="hero__title">Fale com a Vortek.</h1>
            <p class="hero__subtitle">
              Atendimento ágil e humano. WhatsApp, e-mail ou formulário — você escolhe.
            </p>

            <div class="hero__cta">
              <a :href="links.whatsapp" target="_blank" rel="noopener">
                <v-btn size="large" class="btn-primary" prepend-icon="mdi-whatsapp">
                  Chamar no WhatsApp
                </v-btn>
              </a>

              <RouterLink to="/">
                <v-btn size="large" variant="text" class="btn-ghost" prepend-icon="mdi-arrow-left">
                  Voltar para a Home
                </v-btn>
              </RouterLink>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12" md="5">
            <v-card class="card card--relative mb-6" elevation="4">

              <v-card-title class="card__title">
                <v-icon class="mr-2">mdi-headset</v-icon>
                Contatos diretos
              </v-card-title>

              <v-card-text class="card__text">
                <div class="info-line">
                  <v-icon class="mr-2">mdi-phone</v-icon>
                  <span>(47) 98800-7464</span>
                  <v-btn
                    variant="text"
                    size="small"
                    class="btn-ghost ml-2"
                    append-icon="mdi-content-copy"
                    @click="copiar('(47) 98800-7464')"
                  >
                    Copiar
                  </v-btn>
                </div>

                <div class="info-line">
                  <v-icon class="mr-2">mdi-email</v-icon>
                  <span>vortek@vortek.inf.br</span>
                  <v-btn
                    variant="text"
                    size="small"
                    class="btn-ghost ml-2"
                    append-icon="mdi-content-copy"
                    @click="copiar('vortek@vortek.inf.br')"
                  >
                    Copiar
                  </v-btn>
                </div>

                <div class="hero__cta mt-3">
                  <a :href="links.whatsapp" target="_blank" rel="noopener">
                    <v-btn class="btn-primary" prepend-icon="mdi-whatsapp">
                      WhatsApp
                    </v-btn>
                  </a>

                  <a :href="links.instagram" target="_blank" rel="noopener">
                    <v-btn variant="text" class="btn-ghost" append-icon="mdi-arrow-top-right">
                      Instagram
                    </v-btn>
                  </a>

                  <a :href="`mailto:${contato.email}`">
                    <v-btn variant="text" class="btn-ghost" append-icon="mdi-email">
                      Enviar e-mail
                    </v-btn>
                  </a>
                </div>
              </v-card-text>

              <v-card-actions>
                <RouterLink to="/about">
                  <v-btn variant="text" class="btn-ghost" append-icon="mdi-arrow-right">
                    Sobre nós
                  </v-btn>
                </RouterLink>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-snackbar v-model="snackbar.ativo" :timeout="2200">
      {{ snackbar.texto }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "ContateView",
  data() {
    return {
      links: {
        whatsapp:
          "https://wa.me/5547988007464?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20de%20seus%20servi%C3%A7os.",
        instagram: "https://www.instagram.com/vortek_cd/",
      },
      contato: {
        email: "vortek@vortek.inf.br",
      },
      form: {
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
      },
      formValido: false,
      rules: {
        req: (v) => (!!v && String(v).trim().length > 0) || "Campo obrigatório",
        email: (v) =>
          !v ||
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
          "E-mail inválido",
      },
      snackbar: {
        ativo: false,
        texto: "",
      },
    };
  },
  methods: {
    copiar(texto) {
      navigator.clipboard
        .writeText(texto)
        .then(() => this.abrirSnack("Copiado para a área de transferência."))
        .catch(() => this.abrirSnack("Não foi possível copiar."));
    },
    abrirSnack(t) {
      this.snackbar.texto = t;
      this.snackbar.ativo = true;
    },
    limparFormulario() {
      this.form = { nome: "", email: "", telefone: "", mensagem: "" };
      this.$refs.form?.resetValidation?.();
    },
    async enviarFormulario() {
      const ok = await this.$refs.form?.validate?.();
      if (!ok) {
        this.abrirSnack("Preencha os campos obrigatórios.");
        return;
      }
      const assunto = `Contato via site - ${this.form.nome}`;
      const corpo = [
        `Nome: ${this.form.nome}`,
        `E-mail: ${this.form.email}`,
        `Telefone: ${this.form.telefone || "-"}`,
        "",
        "Mensagem:",
        this.form.mensagem,
      ].join("\n");

      const mailto = `mailto:${this.contato.email}?subject=${encodeURIComponent(
        assunto
      )}&body=${encodeURIComponent(corpo)}`;
      window.location.href = mailto;
      this.abrirSnack("Abrindo seu cliente de e-mail…");
    },
  },
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
.card--relative {
  position: relative;
}
.card__title {
  font-weight: 700;
  color: var(--text);
}
.card__text {
  color: var(--muted);
}

.badge-img {
  position: absolute;
  top: 14px;
  right: 14px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: #1a1a1a;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
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
.mt-3 {
  margin-top: 12px;
}
.ml-2 {
  margin-left: 8px;
}

.info-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
  font-size: 1rem;
  color: var(--muted);
}
</style>
