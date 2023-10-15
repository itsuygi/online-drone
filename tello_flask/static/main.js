function takeoff() {
    var url = "/take_off"

    var button = document.getElementById("takeoff");
    var defaultText = button.innerHTML

    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    button.disabled = true;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url ); // false for synchronous request
    xmlHttp.onload  = function() {
      button.innerHTML = defaultText
      button.disabled = false
    };
    xmlHttp.send( null );
};
function land() {
    var url = "/land"

    var button = document.getElementById("land");
    var defaultText = button.innerHTML

    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    button.disabled = true;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url ); // false for synchronous request
    xmlHttp.onload  = function() {
      button.innerHTML = defaultText
      button.disabled = false
    };
    xmlHttp.send( null );
};

function move(direction) {
    var url = "/move?direction=" + direction

    var button = document.getElementById("move-"+direction);
    var defaultText = button.innerHTML

    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url ); // false for synchronous request
    xmlHttp.onload  = function() {
      button.innerHTML = defaultText
    };
    xmlHttp.send( null );
};

function flip(direction) {
    var url = "/flip?direction=" + direction

    var button = document.getElementById("flip-"+direction);
    var defaultText = button.innerHTML

    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url ); // false for synchronous request
    xmlHttp.onload  = function() {
      button.innerHTML = defaultText
    };
    xmlHttp.send( null );
};

function rotate(direction) {
    var url = "/rotate?direction=" + direction

    var button = document.getElementById("rotate-"+direction);
    var defaultText = button.innerHTML

    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url ); // false for synchronous request
    xmlHttp.onload  = function() {
      button.innerHTML = defaultText
    };
    xmlHttp.send( null );
};

function reconnect() {
  var button = document.getElementById("connect-button");
  button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Connecting...';
  button.disabled = true;

  var url = "/connect"

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url ); // false for synchronous request
  xmlHttp.send( null );

  window.location.replace("/");
};

function updateInfo() {
  var url = "/get_info"

  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', url, true);
  req.onload  = function() {
    var jsonResponse = req.response;
    
    for (let v in jsonResponse) {
      var element = document.getElementById(v)
      element.innerHTML = jsonResponse[v]
    }

  };
  req.send(null);
};

function refreshStream() {
    var url = "/video_feed?t="
    var element = document.getElementById("video_feed")
    
    element.src = url + new Date().getTime();
  };

var infoUpdateInterval = setInterval(function() {
    updateInfo()
}, 3000);
var streamRefreshInterval = setInterval(function() {
    
}, 60000);
