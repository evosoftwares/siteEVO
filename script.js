/**
 * script.js
 *
 * Contém os scripts JavaScript personalizados para a landing page EVO.
 * Inclui funcionalidades como:
 * - Atualização dinâmica do ano no copyright.
 * - Fechamento automático do menu navbar mobile ao clicar em um link.
 * - Lógica para os botões de sugestão e envio de mensagem para WhatsApp.
 *
 * Este script é carregado com o atributo 'defer' no HTML,
 * garantindo que seja executado após o parse do HTML,
 * tornando o wrapper DOMContentLoaded desnecessário aqui.
 */

'use strict'; // Ativa o modo estrito do JavaScript para melhor controle de erros e boas práticas.

/**
 * @function setCurrentYear
 * @description Atualiza o conteúdo do elemento com ID 'current-year' para exibir o ano atual.
 * Usado geralmente na seção de copyright do rodapé.
 */
function setCurrentYear() {
  // Tenta selecionar o elemento HTML que mostrará o ano.
  const yearElement = document.getElementById('current-year');
  // Verifica se o elemento foi encontrado no DOM.
  if (yearElement) {
    // Se encontrado, define seu conteúdo de texto para o ano atual.
    yearElement.textContent = new Date().getFullYear();
  } else {
    // Loga um aviso no console do navegador se o elemento não for encontrado.
    console.warn("Elemento com ID 'current-year' não encontrado no DOM.");
  }
}

/**
 * @function setupNavbarCollapse
 * @description Configura o comportamento de fechamento automático da barra de navegação
 * (menu hambúrguer) em dispositivos móveis quando um link de navegação é clicado.
 */
function setupNavbarCollapse() {
  // Seleciona o container colapsável da navbar.
  const navbarCollapse = document.getElementById('navbarNav');
  // Verifica se o container da navbar existe.
  if (navbarCollapse) {
    // Seleciona todos os links de navegação dentro do container colapsável.
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    // Tenta obter a instância do componente Collapse do Bootstrap associada ao elemento.
    let bsCollapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
    // Se nenhuma instância existir (pode acontecer em carregamentos dinâmicos), inicializa uma nova.
    if (!bsCollapseInstance) {
      console.log("Inicializando instância do Bootstrap Collapse para #navbarNav.");
      bsCollapseInstance = new bootstrap.Collapse(navbarCollapse, { toggle: false }); // Inicializa sem abrir/fechar.
    }

    // Adiciona um ouvinte de evento de clique para cada link da navegação.
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Verifica se o botão toggler (hambúrguer) está visível.
        // Isso indica que estamos em uma visualização mobile/tablet onde o menu colapsa.
        const toggler = document.querySelector('.navbar-toggler');
        // 'getComputedStyle' obtém os estilos CSS aplicados ao elemento.
        if (toggler && getComputedStyle(toggler).display !== 'none') {
          // Se o toggler está visível E o menu está atualmente aberto ('show')...
          if (navbarCollapse.classList.contains('show')) {
            // ...chama o método 'hide()' da instância do Bootstrap Collapse para fechar o menu.
             if (bsCollapseInstance) { // Verifica se a instância foi criada com sucesso
               bsCollapseInstance.hide();
             }
          }
        }
      });
    });
  } else {
    console.warn("Elemento da Navbar com ID 'navbarNav' não encontrado.");
  }
}

/**
 * @function setupWhatsAppIntegration
 * @description Configura a interatividade dos botões de sugestão e do botão de envio
 * na seção de orçamento para preparar e abrir uma conversa no WhatsApp.
 */
function setupWhatsAppIntegration() {
  // Seleciona todos os botões de sugestão.
  const suggestionButtons = document.querySelectorAll('.btn-suggestion');
  // Seleciona a área de texto onde o usuário digita ou onde a sugestão é inserida.
  const whatsappInput = document.getElementById('whatsapp-sugestao-input');
  // Seleciona o botão final que envia a mensagem para o WhatsApp.
  const sendWhatsappBtn = document.getElementById('send-whatsapp-btn');

  // --- IMPORTANTE: Defina seu número de WhatsApp aqui ---
  // Substitua '5511999999999' pelo seu número completo com código do país e DDD.
  const seuNumeroWhatsApp = "5511983362246"; // <-- SUBSTITUA AQUI SEU NÚMERO
  const baseWhatsappUrl = `https://wa.me/${seuNumeroWhatsApp}?text=`;
  // --- Fim da configuração do número ---

  // Verifica se os elementos essenciais (input e botão de envio) foram encontrados.
  if (whatsappInput && sendWhatsappBtn) {

    // --- Lógica para os Botões de Sugestão ---
    suggestionButtons.forEach(button => {
      // Para cada botão de sugestão, adiciona um ouvinte de clique.
      button.addEventListener('click', () => {
        // Obtém o texto do botão clicado (o tipo de projeto).
        const suggestion = button.textContent;
        // Define o valor da área de texto com uma frase padrão + a sugestão.
        // Isso sobrescreve qualquer texto anterior do usuário.
        whatsappInput.value = `Preciso de um orçamento para um app tipo: ${suggestion}. `;
        // Coloca o foco na área de texto para que o usuário possa continuar digitando se quiser.
        whatsappInput.focus();
      });
    });

    // --- Lógica para o Botão de Envio para WhatsApp ---
    sendWhatsappBtn.addEventListener('click', () => {
      // Adiciona um ouvinte de clique ao botão principal de envio.
      // Obtém o valor da área de texto e remove espaços em branco extras do início e fim.
      let message = whatsappInput.value.trim();
      // Se a mensagem estiver vazia após remover os espaços...
      if (!message) {
        // ...define uma mensagem padrão.
        message = "Olá, vim através do site e desejo um orçamento personalizado.";
      }
      // Codifica a mensagem para ser usada em uma URL (substitui espaços por %20, etc.).
      const encodedMessage = encodeURIComponent(message);
      // Abre o link do WhatsApp em uma nova aba, já com o número e a mensagem formatados.
      window.open(baseWhatsappUrl + encodedMessage, '_blank', 'noopener,noreferrer');
    });

  } else {
    // Loga um aviso se os elementos principais para a integração com WhatsApp não forem encontrados.
    console.warn("Elementos de integração com WhatsApp não encontrados (whatsapp-sugestao-input ou send-whatsapp-btn). Funcionalidade pode não operar.");
  }
}


// --- INICIALIZAÇÃO DAS FUNCIONALIDADES ---
// Chama as funções para configurar tudo assim que o script for executado (após o DOM estar pronto, devido ao 'defer').
setCurrentYear();
setupNavbarCollapse();
setupWhatsAppIntegration();
