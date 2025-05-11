    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let masa, altura, epInicial, y, v, t, a, tiempoTotal;
    const g = 9.81;
    let animando = false;

    function iniciar() {
      masa = parseFloat(document.getElementById('masa').value);
      altura = parseFloat(document.getElementById('altura').value);

      // Valores iniciales
      epInicial = masa * g * altura;
      v = 0;
      t = 0;
      a = g;
      tiempoTotal = Math.sqrt((2 * altura) / g); // tiempo de caída
      y = 0;
      animando = true;

      document.getElementById('velocidadFinal').textContent = (Math.sqrt(2 * g * altura)).toFixed(2);
      requestAnimationFrame(simular);

      document.getElementById('tiempo').textContent=tiempoTotal.toFixed(2)
    }

    function simular(timestamp) {
      if (!animando) return;

      t += 0.016; // ~60fps
      y = 0.5 * g * t * t;

      if (y >= altura) {
        y = altura;
        animando = false;
      }

      const ep = masa * g * (altura - y);
      const ek = epInicial - ep;

      actualizarEnergia(ep, ek);
      dibujar(y / altura); // normalizamos

      if (animando) requestAnimationFrame(simular);
    }

    function actualizarEnergia(ep, ek) {
      document.getElementById('energiaP').textContent = ep.toFixed(2);
      document.getElementById('energiaK').textContent = ek.toFixed(2);

      //document.getElementById('barraEp').style.fontSize = (ep / epInicial * 50) + "px";
      document.getElementById('si1').style.width = (ep / epInicial * 250) + "px";
      document.getElementById('barraEp').textContent = `Ep: ${ep.toFixed(0)} J`;
    

      //document.getElementById('barraEk').style.fontSize = (ek / epInicial * 50) + "px";
      document.getElementById('si2').style.width = (ek / epInicial * 250) + "px";
      document.getElementById('barraEk').textContent = `Ek: ${ek.toFixed(0)} J`;
    }

    function dibujar(proporcion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const h = canvas.height - 50;
      const posY = proporcion * h;

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 30 + posY, 20, 0, Math.PI * 2);
      ctx.fill();
    }

    dibujar(0); // posición inicial


let empezar = document.getElementById('empezar')
empezar.addEventListener('click', iniciar)