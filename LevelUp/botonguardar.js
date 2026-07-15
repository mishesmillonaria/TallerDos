document.addEventListener('DOMContentLoaded', () => {
  const botonesGuardar = document.querySelectorAll('.botoncito_rata, .botón_rata'); // las 2 clases
  const toast = document.getElementById('toast-guardado');
  // Agarra todos los i dentro de .reaction y .reacciónChiquita
  const iconos = document.querySelectorAll('.reaction i, .reacciónChiquita i, votes i');

  iconos.forEach(icono => {
    icono.addEventListener('click', () => {
      icono.classList.toggle('activo'); // si tiene la clase la saca, si no la pone
    });
});
  botonesGuardar.forEach(boton => {
    boton.addEventListener('click', () => {
      // Mostrar toast
      toast.classList.add('mostrar');
      
      // Ocultarlo después de 2 segundos
      setTimeout(() => {
        toast.classList.remove('mostrar');
      }, 2000);
    });
  });
});