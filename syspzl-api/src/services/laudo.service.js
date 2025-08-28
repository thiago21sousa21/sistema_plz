import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import ImageModule from 'docxtemplater-image-module-free';

// Função auxiliar para converter cm para pixels (aproximadamente) para o módulo de imagem
function cmToPixels(cm) {
  return Math.round(cm * 37.795);
}

class LaudoService {
  async generateLaudo(laudoData, fotos) {
    // 1. Carrega o conteúdo do arquivo modelo .docx
    const templatePath = path.join(process.cwd(), 'templates', 'modelo-laudo.docx');
    const content = fs.readFileSync(templatePath, 'binary');

    // 2. Descompacta o conteúdo do Word (um .docx é um .zip)
    const zip = new PizZip(content);

    // 3. Configura o módulo de imagem
    const imageModule = new ImageModule({
      // Função que é chamada para cada tag de imagem
      getImage: (tag) => {
        // 'tag' aqui é o buffer da imagem que passamos nos dados
        return tag;
      },
      // Função que define o tamanho da imagem
      getSize: (img, tagValue, tagName) => {
        // Por enquanto, vamos manter um tamanho fixo para todas as imagens
        // A lógica de retrato/paisagem pode ser adicionada aqui depois se necessário
        const width = cmToPixels(15);
        const height = cmToPixels(7);
        return [width, height];
      },
    });

    // 4. Cria a instância do Docxtemplater com o módulo de imagem
    const doc = new Docxtemplater(zip, {
      modules: [imageModule],
      // Em caso de tags não encontradas, não quebra a aplicação
      nullGetter: () => "",
    });

    // 5. Prepara o objeto de dados que corresponde às tags no modelo
    const dataToRender = {
      codigo_fiscal: laudoData.codigoFiscal,
      numero_auto: laudoData.numeroAuto,
      ano: new Date().getFullYear(),
      nome_autuado: laudoData.nomeAutuado,
      // Passamos os buffers das fotos para a tag de loop {#fotos}
      fotos: fotos.map(f => f.buffer),
    };

    // 6. Preenche o modelo com os dados
    doc.render(dataToRender);

    // 7. Gera o novo documento .docx como um buffer
    const buffer = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    return buffer;
  }
}

export default new LaudoService();