/* Escolha específica para a mensuração Greenfy; não controla ferramentas de terceiros. */
(function () {
  'use strict';
  if (window.__greenfyConsentUI) return;
  window.__greenfyConsentUI = true;
  var storageKey = 'greenfy_measurement_consent_v1';
  function apply(allowed) {
    window.greenfyConsent = { analytics: allowed, ads: false };
    window.dispatchEvent(new Event('greenfy:consent'));
  }
  function init() {
    // Integrações de consentimento já existentes têm prioridade.
    if (typeof window.greenfyConsent !== 'undefined') return;
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch (_) {}
    var valid = saved && typeof saved.allowed === 'boolean' && Number.isFinite(saved.at) && Date.now() >= saved.at && Date.now() - saved.at < 180 * 86400000;
    if (valid) apply(saved.allowed);
    var host = document.createElement('div');
    host.setAttribute('data-greenfy-consent-ui', '');
    document.body.appendChild(host);
    var shadow = host.attachShadow({ mode: 'open' });
    var style = document.createElement('style');
    style.textContent = ':host{font-family:Arial,sans-serif;color:#17211b}section{position:fixed;z-index:2147483646;bottom:16px;left:16px;max-width:360px;width:calc(100vw - 64px);padding:16px;background:#fff;border:1px solid #cdd6d0;border-radius:12px;box-shadow:0 4px 24px #0003;font-size:14px;line-height:1.5}h2{font-size:16px;margin:0 0 8px}p{margin:0 0 12px}button{font:inherit;cursor:pointer;border:1px solid #8b9b90;border-radius:6px;padding:9px 12px;background:#fff;color:#17211b;margin:4px}button:focus-visible{outline:3px solid #2563eb}button.accept{background:#17623d;color:#fff}button.settings{position:fixed;z-index:2147483645;bottom:8px;left:8px;font-size:12px} [hidden]{display:none!important}';
    shadow.appendChild(style);
    var box = document.createElement('section');
    box.setAttribute('role', 'region');box.setAttribute('aria-label', 'Preferência de mensuração Greenfy');
    var title = document.createElement('h2');title.textContent = 'Medição de uso desta página';box.appendChild(title);
    var text = document.createElement('p');text.textContent = 'Você permite que o Greenfy registre visitas, visualização das ofertas e cliques para melhorar esta página? A escolha é opcional e não impede sua compra. Esta preferência controla somente o Greenfy.';box.appendChild(text);
    var reject = document.createElement('button');reject.type = 'button';reject.textContent = 'Não permitir';box.appendChild(reject);
    var accept = document.createElement('button');accept.type = 'button';accept.textContent = 'Permitir';accept.className = 'accept';box.appendChild(accept);
    var settings = document.createElement('button');settings.type = 'button';settings.className = 'settings';settings.textContent = 'Medição Greenfy';
    function choose(allowed) { try { localStorage.setItem(storageKey, JSON.stringify({ allowed: allowed, at: Date.now() })); } catch (_) {} apply(allowed);box.hidden = true;settings.hidden = false;settings.focus(); }
    reject.addEventListener('click', function () { choose(false); });accept.addEventListener('click', function () { choose(true); });
    settings.addEventListener('click', function () { box.hidden = false;settings.hidden = true;reject.focus(); });
    box.hidden = !!valid;settings.hidden = !valid;shadow.appendChild(box);shadow.appendChild(settings);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
