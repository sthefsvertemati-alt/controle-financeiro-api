import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error as MongooseError, Model } from 'mongoose';
import { Transacao } from './transacao.schema';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<Transacao>,
  ) {}

  async criar(dados: Transacao) {
    try {
      const transacao = new this.transacaoModel({
        descricao: dados.descricao,
        valor: dados.valor,
        tipo: dados.tipo,
        categoria: dados.categoria,
        consumoConsciente: dados.consumoConsciente,
      });

      return await transacao.save();
    } catch (erro) {
      if (erro instanceof MongooseError.ValidationError) {
        throw new BadRequestException(
          'Transação inválida. Confira os campos informados.',
        );
      }

      throw erro;
    }
  }

  async listar() {
    const historico = await this.transacaoModel.find().lean().exec();

    let receitasCentavos = 0;
    let despesasCentavos = 0;
    let impulsoCentavos = 0;

    for (const transacao of historico) {
      const valorCentavos = Math.round(transacao.valor * 100);

      if (transacao.tipo === 'receita') {
        receitasCentavos += valorCentavos;
      } else if (transacao.tipo === 'despesa') {
        despesasCentavos += valorCentavos;

        if (transacao.consumoConsciente === false) {
          impulsoCentavos += valorCentavos;
        }
      }
    }

    return {
      historico,
      metricas: {
        saldoTotal: (receitasCentavos - despesasCentavos) / 100,
        totalDespesas: despesasCentavos / 100,
        totalGastoImpulso: impulsoCentavos / 100,
      },
    };
  }
}