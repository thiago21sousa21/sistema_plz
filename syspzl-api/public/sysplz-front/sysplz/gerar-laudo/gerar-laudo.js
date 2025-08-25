import { API_URL } from '../../config.js';

const form = document.getElementById('form-laudo');
const fotosContainer = document.getElementById('fotos-container');
const btnAddFoto = document.getElementById('btn-add-foto');
const loadingOverlay = document.getElementById('loading-overlay');
let fotoCounter = 0;

function addFotoInput() {
  if (fotoCounter >= 6) {
    alert("Limite de 6 fotos atingido.");
    return;
  }
  fotoCounter++;
  const isMap = fotoCounter === 6;
  const row = document.createElement('div');
  row.className = 'foto-row';
  row.innerHTML = `
    <div class="form-group">
      <label for="foto-${fotoCounter}">${isMap ? `Foto do Mapa (última)` : `Foto ${fotoCounter}`}</label>
      <input type="file" id="foto-${fotoCounter}" name="foto" accept="image/*" required>
    </div>
    <div class="form-group">
      <label for="orientacao-${fotoCounter}">Orientação</label>
      <select id="orientacao-${fotoCounter}" name="orientacao">
        <option value="paisagem">Paisagem (15x7cm)</option>
        <option value="retrato">Retrato (10x14cm)</option>
      </select>
    </div>
  `;
  fotosContainer.appendChild(row);
  feather.replace(); // Re-ativa os ícones se houver algum
}

async function handleFormSubmit(event) {
  event.preventDefault();
  loadingOverlay.classList.remove('hidden');

  const formData = new FormData();
  formData.append('codigoFiscal', document.getElementById('codigo-fiscal').value);
  formData.append('numeroAuto', document.getElementById('numero-auto').value);
  formData.append('nomeAutuado', document.getElementById('nome-autuado').value);

  const fotoInputs = document.querySelectorAll('input[name="foto"]');
  const orientacaoSelects = document.querySelectorAll('select[name="orientacao"]');
  
  const orientacoes = [];
  fotoInputs.forEach((input, index) => {
    if (input.files[0]) {
      formData.append('fotos', input.files[0]);
      orientacoes.push(orientacaoSelects[index].value);
    }
  });
  formData.append('orientacoes', orientacoes.join(','));

  try {
    const response = await axios.post(`${API_URL}/laudos/gerar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob', // MUITO IMPORTANTE: para receber um arquivo
    });

    // Cria um link temporário para forçar o download do arquivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const fileName = `laudo_${formData.get('numeroAuto')}_${new Date().getFullYear()}.docx`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Erro ao gerar laudo:", error);
    alert("Ocorreu um erro ao gerar o laudo. Verifique o console para mais detalhes.");
  } finally {
    loadingOverlay.classList.add('hidden');
  }
}

btnAddFoto.addEventListener('click', addFotoInput);
form.addEventListener('submit', handleFormSubmit);

// Adiciona o primeiro input de foto ao carregar a página
addFotoInput();