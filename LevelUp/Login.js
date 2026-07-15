document.addEventListener('DOMContentLoaded', () => {
  const perfilBtn = document.getElementById('perfil-login');
  const modalLogin = document.getElementById('login-modal');
  const modalRegistro = document.getElementById('registro-modal');
  
  const btnAbrirRegistro = document.querySelector('.abrir-registro');
  const btnAbrirLogin = document.querySelector('.abrir-login');
  const btnCerrar = document.querySelectorAll('.cerrar');
  
  const formLogin = document.getElementById('form-login');
  const formRegistro = document.getElementById('form-registro');
  const msgLogin = document.getElementById('mensaje-login');
  const msgRegistro = document.getElementById('mensaje-registro');

  const abrirModal = (modal) => modal.style.display = 'flex';
  const cerrarModal = (modal) => {
    modal.style.display = 'none';
    // Limpiar mensajes al cerrar
    msgLogin.style.display = 'none';
    msgRegistro.style.display = 'none';
  }

  // Función para mostrar mensaje
  function mostrarMensaje(contenedor, texto, tipo) {
    contenedor.textContent = texto;
    contenedor.className = `mensaje ${tipo}`; // exito o error
    contenedor.style.display = 'block';
    setTimeout(() => { contenedor.style.display = 'none'; }, 3000); // se oculta solo en 3s
  }

  // Abrir Login
  perfilBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    abrirModal(modalLogin);
  });

  // Cambiar entre modales
  btnAbrirRegistro?.addEventListener('click', (e) => {
    e.preventDefault();
    cerrarModal(modalLogin);
    abrirModal(modalRegistro);
  });

  btnAbrirLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    cerrarModal(modalRegistro);
    abrirModal(modalLogin);
  });

  // Cerrar con X o click fuera
  btnCerrar.forEach(btn => {
    btn.onclick = () => cerrarModal(document.getElementById(btn.dataset.cerrar));
  });
  window.onclick = (e) => {
    if (e.target.classList.contains('modal')) cerrarModal(e.target);
  }

  // 1. SUBMIT LOGIN
  formLogin?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validación campos vacíos
    if (nombre === '' || password === '') {
      mostrarMensaje(msgLogin, 'Completa todos los campos', 'error');
      return;
    }

    // SIMULACIÓN: Login correcto solo si admin/1234
    if (nombre === 'admin' && password === '1234') {
      mostrarMensaje(msgLogin, 'Inicio de sesión exitoso!', 'exito');
      localStorage.setItem('usuario', JSON.stringify({ nombre, password }));
      setTimeout(() => {
        window.location.href = 'home-log.html';
      }, 1500); // Espera 1.5s para que vea el mensaje
    } else {
      mostrarMensaje(msgLogin, 'Nombre o contraseña incorrectos', 'error');
    }
  });

  // 2. SUBMIT REGISTRO
  formRegistro?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formRegistro);
    const datos = Object.fromEntries(formData.entries());

    // Validación campos vacíos
    if (Object.values(datos).some(campo => campo.trim() === '')) {
      mostrarMensaje(msgRegistro, 'Completa todos los campos', 'error');
      return;
    }

    // Validación email
    if (!datos.correo.includes('@')) {
      mostrarMensaje(msgRegistro, 'Ingresa un correo válido', 'error');
      return;
    }

    // Validación contraseñas
    if (datos.contraseña !== datos.contraseñaRepetida) {
      mostrarMensaje(msgRegistro, 'Las contraseñas no coinciden', 'error');
      return;
    }

    // Si todo ok
    mostrarMensaje(msgRegistro, 'Registro exitoso! Redirigiendo...', 'exito');
    localStorage.setItem('usuario', JSON.stringify(datos));
    
    setTimeout(() => {
      window.location.href = 'perfil.html';
    }, 1500);
  });
});