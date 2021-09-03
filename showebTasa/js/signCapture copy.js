/*  <!-- <canvas id="canvas" width="300" height="200" style="background: #ddd;"></canvas>
        <div class="gui">
          <button id="bt-clear">CLEAR</button>
           
        </div>  --> */
var signCapture = signCapture || {};

signCapture.GuardandoPNGs = (function() {
  var mousePressed = false;
  var lastX, lastY;
  var ctx;

  function initsign() {
    // init canvas
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    resetCanvas();

    // button events
   // document.getElementById('bt-save').onmouseup = sendToServer;
    document.getElementById('bt-clear').onmouseup = resetCanvas;

    // canvas events
    canvas.onmousedown = function(e) {
      draw(e.layerX-30, e.layerY);
      mousePressed = true;
    };

    canvas.onmousemove = function(e) {
      if (mousePressed) {
        draw(e.layerX-30, e.layerY);
      }
    };

    canvas.onmouseup = function(e) {
      mousePressed = false;
    };
    
    canvas.onmouseleave = function(e) {
      mousePressed = false;
    };
  }

 // var canvasEl = document.getElementById('canvas');
 canvas.width = 250;
 canvas.height = 250;
  
  canvas.addEventListener('touchstart', function(e){
    draw(e.changedTouches[0].pageX-30, e.changedTouches[0].pageY);
    draw(e.changedTouches[1].pageX-30, e.changedTouches[1].pageY);
  });
  
  canvas.addEventListener('touchmove', function(e){
    e.preventDefault();
    draw(e.changedTouches[0].pageX-30, e.changedTouches[0].pageY);
    draw(e.changedTouches[1].pageX-30, e.changedTouches[1].pageY);
  });
  
  /* draw = function(x, y)
  {
    ctx.beginPath();
    ctx.fillStyle = '#333';
    ctx.arc(x, y, 2, 2, 150 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }; */



  function draw(x, y) {
    if (mousePressed) 
    {
      ctx.beginPath();
      ctx.strokeStyle ="#333" 
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
    else{
        ctx.beginPath();
        ctx.fillStyle = '#333';
        ctx.strokeStyle ="#333"
        ctx.arc(x, y, 2, 2, 150 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
    }
    lastX = x; lastY = y;
  }

  function sendToServer() {
    var data = canvas.toDataURL('image/png');
    console.log(data)

   /*  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      // request complete
      if (xhr.readyState == 4) {
        window.open('http://www.lossignCapture.com/blog/posts/guardando-pngs-html5/snapshots/'+xhr.responseText,'_blank');
      }
    }
    xhr.open('POST','http://www.lossignCapture.com/blog/posts/guardando-pngs-html5/snapshot.php',true);
    xhr.setRequestHeader('Content-Type', 'application/upload');
    xhr.send(data); */
  }
  
  function resetCanvas() {
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  return {
    'initsign': initsign
  };
});


window.onload = function() {
  new signCapture.GuardandoPNGs().initsign();
};