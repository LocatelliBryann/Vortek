<template>
  <div class="contato">
    <div class="conteudo">
      <img src="@/assets/img/LogoConsultoria.png" alt="Logo Consultoria" class="logo" />
      <p>Telefone: (47) 98800-7464</p>
      <p>Email: vortek@vortek.inf.br</p>
      <div class="botoes">
        <a href="https://wa.me/5547988007464?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20de%20seus%20servi%C3%A7os." target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" class="icone" />
        </a>
        <a href="https://www.instagram.com/vortek_cd/" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="icone" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>

body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #f0f0f0;
}

.contato {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.conteudo {
  background-color: rgba(217, 216, 216, 0.9);
  padding: 100px 200px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 350px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

.botoes {
  margin-top: 15px;
}

.icone {
  width: 40px;
  margin: 0 15px;
  cursor: pointer;
}

.icone:hover {
  opacity: 0.8;
}
</style>
