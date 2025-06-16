<template>
  <div class="construction-page">
    <div class="content">
      <img src="@/assets/img/LogoInvestimentos.png" alt="Logo Investimentos" class="logo" />
      <h1>Estamos em Construção</h1>
      <p>Desculpe pela inconveniência. Estamos trabalhando para melhorar a sua experiência!</p>
      <div class="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
          <circle cx="50" cy="50" r="40" fill="#1b5c51"/>
          <path d="M30,50 L50,30 L70,50 L50,70 Z" fill="#2E756BFF"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConstructionPage',
};
</script>

<style scoped>
.construction-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #328577FF;
  color: #fff;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.content {
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.logo {
  max-width: 300px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5rem;
  color: #eee8e8;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 20px;
}

.svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
