import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { Transacao } from './transacao.schema';

@Controller('transacoes')
export class TransacoesController {
  constructor(
    private readonly transacoesService: TransacoesService,
  ) {}

  @Post()
  criar(@Body() dados: Transacao) {
    return this.transacoesService.criar(dados);
  }

  @Get()
  listar() {
    return this.transacoesService.listar();
  }
}