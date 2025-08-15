/**
 * Remove todos os caracteres que não são letras ou números de uma string.
 * Ideal para limpar dados como CPF, CNPJ e placas antes de enviar para a API.
 * @param {string} value - A string a ser limpa.
 * @returns {string} A string contendo apenas letras e números.
 */
export function cleanInput(value = '') {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Aplica máscara de CPF ou CNPJ dinamicamente a um campo de input.
 * Deve ser usado como um listener para o evento 'input'.
 * @param {Event} event - O evento de input do campo.
 */
export function maskCpfCnpj(event) {
  let value = cleanInput(event.target.value);
  value = value.replace(/[^0-9]/g, ''); // Remove tudo que não é número

  if (value.length <= 11) { // Formato CPF: ###.###.###-##
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else { // Formato CNPJ: ##.###.###/####-##
    value = value.slice(0, 14); // Limita a 14 dígitos
    value = value.replace(/(\d{2})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1/$2');
    value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
  event.target.value = value;
}

/**
 * Aplica máscara de placa de veículo (padrão Mercosul: AAA1B23).
 * Também converte para maiúsculas.
 * @param {Event} event - O evento de input do campo.
 */
export function maskPlaca(event) {
  // 1. Limpa, converte para maiúsculo e limita a 7 caracteres
  let value = cleanInput(event.target.value).toUpperCase();
  value = value.slice(0, 7);

  value = value.replace(/^([A-Z0-9]{3})([A-Z0-9]+)/, '$1-$2');

  // 3. Atualiza o valor do input no navegador
  event.target.value = value;
}

/**
 * Força o conteúdo de um campo de input a ficar em maiúsculas.
 * @param {Event} event - O evento de input do campo.
 */
export function forceUppercase(event) {
  event.target.value = event.target.value.toUpperCase();
}


/**
 * Remove todos os caracteres não numéricos de um campo de input.
 * Deve ser usado como um listener para o evento 'input'.
 * @param {Event} event - O evento de input do campo.
 * @returns {void}
 */
export function maskOnlyNumbers(event) {
  // Limpa o valor, permitindo apenas números
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
}


/**
 * Aplica máscara de CEP brasileiro (formato: 00000-000).
 * Deve ser usado como um listener para o evento 'input'.
 * @param {Event} event - O evento de input do campo.
 */
export function maskCep(event) {
  let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é número
  value = value.slice(0, 8); // Limita a 8 dígitos
  if (value.length > 5) {
    value = value.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
  }
  event.target.value = value;
}