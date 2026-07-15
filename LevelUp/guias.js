document.addEventListener('DOMContentLoaded', () => {
  const formGuia = document.getElementById('form-guia');

  formGuia?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(formGuia);
    const guia = Object.fromEntries(formData.entries());

    console.log('Guía a publicar:', guia);

    // Guardar en localStorage de ejemplo
    let guias = JSON.parse(localStorage.getItem('guias')) || [];
    guias.push(guia);
    localStorage.setItem('guias', JSON.stringify(guias));

    alert('Guía publicada con éxito!');
    
    window.location.href = 'perfil.html'; // vuelve a donde estaban las guías guardadas
  });
  const contenedor = document.getElementById('ultima-guia-contenedor');
  const guias = JSON.parse(localStorage.getItem('guias')) || [];

  if(guias.length > 0) {
    // Agarra la última guía del array
    const ultimaGuia = guias[guias.length - 1]; 

    // La pinta en el div
    contenedor.innerHTML = `
      <div class="guia-card">
        <span class="juego-tag">${ultimaGuia.juego}</span>
        <h3>${ultimaGuia.titulo}</h3>
        <p>${ultimaGuia.cuerpo.substring(0, 150)}...</p> 
      </div>
    `;
  } else {
    // Si no hay guías, muestra el mensaje
    contenedor.innerHTML = '<p style="text-align:center; color:#777;">Aún no has creado ninguna guía.</p>';
  }
});