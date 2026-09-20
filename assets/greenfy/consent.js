/* Greenfy: integração sem interface visual. A autorização vem do gestor de consentimento do site. */
(function () {
  'use strict';
  // Não cria banners, botões, cookies ou autorizações automáticas.
  // O integrador define window.greenfyConsent e emite greenfy:consent.
  // Preferências do antigo piloto não são reutilizadas sem interface de revogação.
  if (typeof window.greenfyConsent === 'undefined') {
    window.greenfyConsent = { analytics: false, ads: false };
  }
})();
