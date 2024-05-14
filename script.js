let timers = []; // Globale Variable zur Speicherung der Timer-IDs
let running = []; // Globale Variable zur Speicherung des Status der Timer (Gestartet/Gestoppt)
let currentPage = 1; // Variable zur Speicherung der aktuellen Seite

// Funktion zum Starten des Timers
function startTimer(index) {
  const timerElement = document.getElementById(`timer${index}`);
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  timers[index] = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
    timerElement.innerText = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
  }, 1000); // Timer läuft alle 1 Sekunde
}

// Funktion zum Stoppen des Timers
function stopTimer(index) {
  clearInterval(timers[index]);
}

// Funktion zum Formatieren der Zeit (führende Nullen hinzufügen)
function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// Tastenkombinationen verarbeiten
document.addEventListener("keydown", function(event) {
  if (event.key === "1") {
    startStopTimer(1);
  } else if (event.key === "2") {
    startStopTimer(2);
  } else if (event.key === "3") {
    startStopTimer(3);
  } else if (event.key === "4") {
    startStopTimer(4);
  } else if (event.key === "5") {
    startStopTimer(5);
  } else if (event.key === "6") {
    startStopTimer(6);
  } else if (event.key === "7") {
    startStopTimer(7);
  } else if (event.key === "8") {
    startStopTimer(8);
  } else if (event.key === "9") {
    startStopTimer(9);
  } else if (event.key === "0") {
    startStopTimer(10);
  }
});

// Automatischer Seitenwechsel alle 30 Sekunden
setInterval(() => {
  if (currentPage === 1) {
    document.getElementById("page1").classList.add("hidden");
    document.getElementById("page2").classList.remove("hidden");
    currentPage = 2;
  } else {
    document.getElementById("page2").classList.add("hidden");
    document.getElementById("page1").classList.remove("hidden");
    currentPage = 1;
  }
}, 30000);

// Funktion zum Starten oder Stoppen des Timers
function startStopTimer(index) {
  if (!running[index]) {
    startTimer(index);
    running[index] = true;
  } else {
    stopTimer(index);
    running[index] = false;
  }
}

// Timer aktualisieren
function updateTimer() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  document.getElementById('timer').innerText = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// WebSocket-Verbindung herstellen
var socket = new WebSocket("ws://localhost:8080");

// Eventlistener für Ereignisse der WebSocket-Verbindung
socket.onopen = function(event) {
    console.log("WebSocket-Verbindung geöffnet.");
};

socket.onmessage = function(event) {
    console.log("Nachricht empfangen:", event.data);
    // Hier kannst du die empfangene Nachricht weiterverarbeiten, z.B. den Timer aktualisieren
    updateTimer(event.data);
};

socket.onclose = function(event) {
    console.log("WebSocket-Verbindung geschlossen.");
};

// Funktion zum Senden von Daten über die WebSocket-Verbindung
function sendWebSocketData(data) {
    socket.send(data);
}
