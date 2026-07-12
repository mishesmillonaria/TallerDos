document.addEventListener('DOMContentLoaded', () => {
  const perfilBtn = document.getElementById('perfil-login');
  const modal = document.getElementById('login-modal');
  const cerrarBtn = document.querySelector('.cerrar');
  const form = document.getElementById('form-login');

  if (!perfilBtn || !modal || !form) return; // por si el script carga en otra pagina

  // 1. Abrir modal al click en perfil
  perfilBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
  });

  // 2. Cerrar modal con la X o click fuera
  cerrarBtn.onclick = () => modal.style.display = 'none';
  window.onclick = (e) => {
    if (e.target == modal) modal.style.display = 'none';
  }

  // 3. Submit: guardar en variables y redirigir
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const password = document.getElementById('password').value.trim();

    if (nombre === '' || password === '') {
      alert('Completa todos los campos');
      return;
    }

    // Guardar en variables para uso después
    window.usuarioLogueado = { nombre, password };
    
    // Guardar en localStorage para que persista
    localStorage.setItem('usuario', JSON.stringify({ nombre, password }));

    console.log('Datos guardados:', window.usuarioLogueado);

    // 4. Redirigir a HomeLog.html
    window.location.href = 'HomeLog.html';
  });
});