import { render, screen, fireEvent } from '@testing-library/react';
import PracticeForm from './PracticeForm';
import { ImplementationStatus, ImpactArea } from '../types';

describe('PracticeForm', () => {
  it('renders the form', () => {
    render(<PracticeForm onAddPractice={() => {}} />);
    expect(screen.getByLabelText(/Nome da Prática/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', () => {
    const onAddPractice = vi.fn();
    render(<PracticeForm onAddPractice={onAddPractice} />);

    fireEvent.change(screen.getByLabelText(/Nome da Prática/i), { target: { value: 'Test Practice' } });
    fireEvent.change(screen.getByLabelText(/CBM de Origem/i), { target: { value: 'Test CBM' } });
    fireEvent.change(screen.getByLabelText(/Responsável/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Status da Implementação/i), { target: { value: "Fase inicial" } });
    fireEvent.click(screen.getByLabelText(ImpactArea.LogisticaEPatrimonio));
    fireEvent.change(screen.getByLabelText(/Resumo da Prática/i), { target: { value: 'Test Summary' } });

    fireEvent.click(screen.getByText(/Salvar Prática/i));

    expect(onAddPractice).toHaveBeenCalledWith({
      nomeDaPratica: 'Test Practice',
      cbmDeOrigem: 'Test CBM',
      responsavel: 'Test User',
      status: "Fase inicial",
      areasDeImpacto: [ImpactArea.LogisticaEPatrimonio],
      resumo: 'Test Summary',
      temaApresentacao: '',
      problemaAbordado: '',
      metodologia: '',
      resultados: '',
      licoesAprendidas: '',
      comentariosAdicionais: '',
    });
  });

  it('shows an error message when a required field is empty', () => {
    render(<PracticeForm onAddPractice={() => {}} />);

    fireEvent.click(screen.getByText(/Salvar Prática/i));

    expect(screen.getByText('O nome da prática é obrigatório.')).toBeInTheDocument();
  });
});
