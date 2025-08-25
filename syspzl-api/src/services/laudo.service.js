import { Document, Packer, Paragraph, TextRun, ImageRun } from 'docx';
import { fileURLToPath } from 'url';
import path from 'path';

// Função auxiliar para converter cm para EMUs (unidade que o docx usa)
function cmToEMU(cm) {
  return Math.round(cm * 360000);
}

class LaudoService {
  async generateLaudo(laudoData, fotos) {
    const { codigoFiscal, numeroAuto, nomeAutuado, orientacoes } = laudoData;
    const ano = new Date().getFullYear();

    // Monta a linha de título
    const titulo = `${codigoFiscal} - ${numeroAuto}/${ano} - ${nomeAutuado}`.toUpperCase();

    const children = [
      new Paragraph({
        children: [new TextRun({ text: titulo, bold: true, size: 24 })], // 12pt font
      }),
      new Paragraph({ text: "" }), // Linha em branco
    ];

    // Adiciona as imagens ao documento
    fotos.forEach((foto, index) => {
      // O frontend envia as orientações como uma string 'retrato,paisagem,...' ou um array
      const orientacao = Array.isArray(orientacoes) ? orientacoes[index] : orientacoes.split(',')[index];
      
      let width, height;
      if (orientacao === 'retrato') {
        width = cmToEMU(10);
        height = cmToEMU(14);
      } else { // Paisagem (padrão)
        width = cmToEMU(15);
        height = cmToEMU(7);
      }

      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: foto.buffer, // Pega a imagem da memória
              transformation: {
                width: width,
                height: height,
              },
            }),
          ],
        })
      );
      children.push(new Paragraph({ text: "" })); // Linha em branco entre fotos
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: children,
      }],
    });

    // Converte o documento em um buffer para ser enviado na resposta
    const buffer = await Packer.toBuffer(doc);
    return buffer;
  }
}

export default new LaudoService();