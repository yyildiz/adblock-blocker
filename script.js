var wins = [];
var blockedHtml = `<div class="blocked flashAndJump">
<h1 >Looks like you have an adblock enabled...</h1>
<h2>How dare you not want to see our <span class="yellow">shitty</span> and <span class="yellow">uninspired</span> ads?!?!</h2>
<iframe 
    class="background-noise"
    width="5"
    height="5"
    src="https://www.youtube.com/embed/xXhEz3hqlQE?autoplay=1&controls=0"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
</iframe>
</div>`;
(function () {
  var container = document.getElementById('container');
  var height = container.getClientRects()[0].height;
  if (height > 1) {
    window.adblock = false;
  } else {
    window.adblock = true;
    var blocked = document.createElement('div');
    blocked.innerHTML = blockedHtml;
    document.body.appendChild(blocked);
  }

  setInterval(() => {
    if (
      window.adblock &&
      document.getElementsByClassName('blocked').length == 0
    ) {
      window.traitor = true;
      var blocked = document.createElement('div');
      blocked.innerHTML = blockedHtml;
      document.body.appendChild(blocked);
      for (var i = 0; i < 5; i++) {
        openWindow();
      }
    }
    if (window.traitor) {
      moveWindow();
    }
  }, 500);
})();

function moveWindow() {
  wins
    .filter((win) => !win.closed)
    .map((win) => {
      var x = Math.random() * window.screen.availWidth;
      var y = Math.random() * window.screen.availHeight;
      win.onunload = () => openWindow();
      win.focus();
      win.resizeTo(x, y);
      win.moveTo(x, y);
    });
}

function openWindow() {
  var win = window.open('', '', '_blank ');
  wins.push(win);
}
