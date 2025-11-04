
export enum ImplementationStatus {
    Piloto = 'Piloto',
    FaseInicial = 'Fase inicial',
    Consolidada = 'Consolidada',
    Descontinuada = 'Descontinuada',
}

export enum ImpactArea {
    PlanejamentoEstrategico = 'Planejamento estratégico',
    GovernancaCorporativa = 'Governança corporativa',
    GestaoDeRiscos = 'Gestão de Riscos',
    GestaoDeProjetos = 'Gestão de Projetos',
    GestaoDePessoas = 'Gestão de Pessoas',
    OrcamentoEFinancas = 'Orçamento e Finanças',
    LogisticaEPatrimonio = 'Logística e Patrimônio',
    ProcessosEQualidade = 'Processos e Qualidade',
}

export interface Practice {
    nomeDaPratica: string;
    cbmDeOrigem: string;
    responsavel: string;
    areasDeImpacto: ImpactArea[];
    status: ImplementationStatus;
    resumo: string;
    temaApresentacao: string;
    problemaAbordado: string;
    metodologia: string;
    resultados: string;
    licoesAprendidas: string;
    comentariosAdicionais: string;
}
