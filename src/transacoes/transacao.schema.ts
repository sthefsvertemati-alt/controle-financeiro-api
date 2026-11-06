import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'transacoes', versionKey: false })
export class Transacao {
  @Prop({ type: String, required: true, trim: true })
  descricao!: string;

  @Prop({ type: Number, required: true, min: 0.01 })
  valor!: number;

  @Prop({
    type: String,
    required: true,
    enum: ['receita', 'despesa'],
  })
  tipo!: 'receita' | 'despesa';

  @Prop({ type: String, required: true, trim: true })
  categoria!: string;

  @Prop({ type: Boolean, required: true })
  consumoConsciente!: boolean;
}

export const TransacaoSchema = SchemaFactory.createForClass(Transacao);