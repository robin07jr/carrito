document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
  
    // Obtener los valores de usuario y contraseña ingresados
    var username = document.getElementById('usuario').value;
    var password = document.getElementById('contrasena').value;
  
    // Aquí debes realizar la validación de los datos ingresados, comparándolos con los datos almacenados en tu sistema
  
    // Ejemplo de validación básica: usuario y contraseña deben ser "admin"
    if (username === 'admin' && password === '123') {
      // Redireccionar a la página de inicio
      window.location.href = "inicio.html";
    } else {
      alert('Verifica los datos ingresados');
    }
  });
  