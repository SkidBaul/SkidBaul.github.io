/* =========================================================
   Einfache Vorschau-Sperre (Kunden-Preview)
   ---------------------------------------------------------
   HINWEIS: Das ist KEIN echter Schutz. Das Passwort steht im
   Quelltext und kann von Technikkundigen umgangen werden.
   Es hält nur zufällige Besucher fern, solange die Seite
   noch nicht offiziell veröffentlicht ist.

   >>> PASSWORT HIER ÄNDERN: <<<
========================================================= */
(function () {
  var PASSWORD = "daxinger2026";          // <-- gewünschtes Passwort
  var KEY = "dax_preview_auth";

  // Bereits freigeschaltet? Dann nichts tun.
  try { if (localStorage.getItem(KEY) === "1") return; } catch (e) {}

  // Inhalt sofort verbergen, bis das Passwort stimmt
  var style = document.createElement("style");
  style.textContent =
    "body>*:not(#gate){visibility:hidden!important}" +
    "#gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;" +
    "background:linear-gradient(135deg,#0d2b1a,#1B4332 60%,#2d6a4f);" +
    "font-family:'Inter',system-ui,sans-serif;padding:24px}" +
    "#gate .box{background:#fff;border-radius:16px;padding:40px 36px;max-width:380px;width:100%;" +
    "text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.35)}" +
    "#gate h2{font-family:'Playfair Display',Georgia,serif;color:#1B4332;font-size:1.5rem;margin:0 0 8px}" +
    "#gate p{color:#6b7280;font-size:.9rem;margin:0 0 24px;line-height:1.5}" +
    "#gate input{width:100%;padding:12px 14px;border:1px solid #d1d5db;border-radius:8px;" +
    "font-size:1rem;margin-bottom:14px;box-sizing:border-box}" +
    "#gate input:focus{outline:2px solid #40916c;border-color:#40916c}" +
    "#gate button{width:100%;padding:12px;background:#40916c;color:#fff;border:none;border-radius:8px;" +
    "font-size:.95rem;font-weight:600;cursor:pointer;transition:background .2s}" +
    "#gate button:hover{background:#2d6a4f}" +
    "#gate .err{color:#c0392b;font-size:.85rem;min-height:1.2em;margin-top:6px}";
  document.head.appendChild(style);

  function build() {
    var g = document.createElement("div");
    g.id = "gate";
    g.innerHTML =
      '<div class="box">' +
        '<h2>Geschützte Vorschau</h2>' +
        '<p>Diese Website befindet sich noch in der Vorschau.<br>Bitte Passwort eingeben.</p>' +
        '<form id="gateForm">' +
          '<input type="password" id="gatePw" placeholder="Passwort" autocomplete="current-password" />' +
          '<button type="submit">Ansehen</button>' +
          '<div class="err" id="gateErr"></div>' +
        '</form>' +
      '</div>';
    document.body.appendChild(g);

    var pw  = g.querySelector("#gatePw");
    var err = g.querySelector("#gateErr");
    pw.focus();

    g.querySelector("#gateForm").addEventListener("submit", function (e) {
      e.preventDefault();
      if (pw.value === PASSWORD) {
        try { localStorage.setItem(KEY, "1"); } catch (e) {}
        style.remove();
        g.remove();
      } else {
        err.textContent = "Falsches Passwort.";
        pw.value = "";
        pw.focus();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
