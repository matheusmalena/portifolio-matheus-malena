<template>
  <section class="contact section" id="contact"
      aria-label="uma seção falando se interessou com o meu trabalho, entrar em contato.">
      <div class="max-width">
        <div data-aos="fade-down">
          <h2 class="title">Contato</h2>
        </div>

        <div class="contact-content">
          <div class="column left" data-aos="fade-down">
            <div class="text">Se Interessou?</div>

            <p>Obrigado por acompanhar minha trajetória até aqui! Que tal colocarmos a sua ideia no papel e darmos vida
              a um novo projeto? Sinta-se à vontade para entrar em contato, e juntos vamos transformar ideias em
              realidade!</p>


            <div class="icons">
              <div class="row info-icons">
                <i class="fas fa-user"></i>
                <div class="info">
                  <div class="head">Nome</div>
                  <div class="sub-title">Matheus Malena</div>
                </div>
              </div>

              <div class="row info-icons">
                <i class="fas fa-map-marker-alt"></i>
                <div class="info">
                  <div class="head">Endereço</div>
                  <div class="sub-title">Peruibe - SP</div>
                </div>
              </div>

              <div class="row info-icons">
                <i class="fas fa-envelope"></i>
                <div class="info">
                  <div class="head">Email</div>
                  <div class="sub-title">matheusmalena28@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          <div class="column right" data-aos="fade-up">
            <div class="text">Fale comigo</div>

            <form action="https://formsubmit.co/matheusmalena28@gmail.com" method="POST" class="input-area">
              <div class="fields">
                <div class="field ">
                  <input type="text" name="nome" placeholder="Nome" required>
                </div>
                <div class="field number">
                  <input type="tel" name="numero" placeholder="Numero" required>
                </div>
              </div>
              <div class="field email">
                <input type="email" name="email" placeholder="Email" required>
              </div>
              <div class="field">
                <input type="text" name="assunto" placeholder="Assunto" required>
              </div>
              <div class="textarea">
                <textarea cols="30" rows="10" name="mensagem" placeholder="Mensagem" required></textarea>
              </div>
              <div class="button">
                <button type="submit">Enviar</button>
              </div>
              <input type="hidden" name="_subject" value="New submission!">
            </form>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'Contact'
};
</script>

<style scoped>
/* -------- CONTACT SECTION -------- */
.contact .title::after {
  content: "mensagem";
  color: var(--color-purple-light);
  background: var(--color-black);
  white-space: nowrap;
}

.contact .contact-content .column {
  width: calc(50% - 30px);
}

.contact .contact-content .text {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 10px;
  background: linear-gradient(90deg, rgba(195, 236, 254, 1) 1%, rgba(70, 130, 180, 1) 38%, rgba(195, 236, 254, 1) 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
  display: inline-block;
}

.contact .contact-content .left p {
  text-align: justify;
}

.contact .contact-content .left .icons {
  margin: 10px 0;
}

.contact .contact-content .right {
  margin-bottom: 210px;
}

.contact .contact-content .row {
  display: flex;
  width: 90% !important;
  height: 65px;
  align-items: center;
 }

 .info-icons {
  display: flex;
  align-items: center !important;
 }

.contact .contact-content .row .info {
  margin: -50px 0 0 25px;
}

.contact .contact-content .row i {
  background: linear-gradient(90deg, rgba(195, 236, 254, 1) 1%, rgba(70, 130, 180, 1) 38%, rgba(195, 236, 254, 1) 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.3s ease;
  display: inline-block;
}

.contact .contact-content .info .head {
  font-weight: 500;
}

.contact .contact-content .info .sub-title {
  color: var(--color-clean-white);
}

.contact .contact-content .input-area input:focus,
.contact .contact-content .input-area textarea:focus,
.contact .contact-content .input-area input.active {
  border: 2px solid var(--color-purple-light);
}


.contact .right form .fields {
  display: flex;
}

.contact .right form .field,
.contact .right form .fields .field {
  height: 45px;
  width: 100%;
  margin-bottom: 10px;
}

.contact .right form .textarea {
  height: 80px;
  width: 100%;
}

.contact .right form .textarea {
  height: 80px;
  width: 100%;
}

.contact .right form .name {
  margin-right: 10px;
}

.contact .right form .number {
  margin-left: 10px;
}

.contact .right form .field input,
.contact .right form .textarea textarea {
  height: 100%;
  width: 100%;
  border: 2px solid var(--clean-light-gray); 
  border-radius: 10px;
  outline: none;
  padding: 0 15px;
  font-size: 17px;
  font-family: 'poppins', sans-serif;
}

.contact .right form .textarea textarea {
  padding-top: 10px;
  resize: none;
}

.contact .right form .button {
  height: 47px;
  width: 170px;
  margin-top: 15px;
}

.contact .right form .button button{
  width: 100%;
  height: 100%;
  border: 2px solid var(--color-purple-light);
  background: linear-gradient(90deg, rgba(195, 236, 254, 1) 1%, rgba(70, 130, 180, 1) 38%, rgba(195, 236, 254, 1) 70%);
  background-size: 200% 100%;
  background-position: 0 0;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 1.2s ease;
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  border-radius: 30px;
  cursor: pointer;
}

.contact .right form .button button:hover {
  background-position: 100% 0;
  color: black;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
}

/* -------- RESPONSIVO -------- */
@media (max-width: 768px) {
  .contact-title {
    font-size: 2.2rem;
  }

  .contact-description {
    font-size: 1rem;
  }
}
</style>
