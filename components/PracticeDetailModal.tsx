
import React, { useEffect } from 'react';
import type { Practice } from '../types';
import { XIcon } from './icons';

interface PracticeDetailModalProps {
    practice: Practice;
    onClose: () => void;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h4 className="text-md font-bold text-red-700 border-b-2 border-red-200 pb-2 mb-3">{title}</h4>
        <div className="text-gray-700 text-base leading-relaxed">{children}</div>
    </div>
);

const PracticeDetailModal: React.FC<PracticeDetailModalProps> = ({ practice, onClose }) => {
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in-up"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-5 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{practice.nomeDaPratica}</h2>
                        <p className="text-gray-500">{practice.cbmDeOrigem}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-2"
                        aria-label="Fechar"
                    >
                        <XIcon className="w-6 h-6"/>
                    </button>
                </header>
                <main className="p-8 overflow-y-auto">
                    <DetailSection title="Resumo da Prática">
                        <p>{practice.resumo}</p>
                    </DetailSection>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                             <DetailSection title="Responsável">
                                <p>{practice.responsavel}</p>
                            </DetailSection>
                             <DetailSection title="Status da Implementação">
                                <p>{practice.status}</p>
                            </DetailSection>
                        </div>
                        <div>
                           <DetailSection title="Áreas de Impacto">
                                <ul className="list-disc list-inside">
                                    {practice.areasDeImpacto.map(area => <li key={area}>{area}</li>)}
                                </ul>
                            </DetailSection>
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mt-4 mb-4 pt-4 border-t">Detalhamento para Apresentação</h3>
                    
                    <DetailSection title="Tema da Apresentação">
                        <p>{practice.temaApresentacao}</p>
                    </DetailSection>

                    <DetailSection title="Problema Abordado">
                        <p>{practice.problemaAbordado}</p>
                    </DetailSection>
                    
                    <DetailSection title="Metodologia / Passos de Implementação">
                        <p>{practice.metodologia}</p>
                    </DetailSection>

                    <DetailSection title="Resultados Alcançados (Indicadores Chave)">
                        <p>{practice.resultados}</p>
                    </DetailSection>

                    <DetailSection title="Lições Aprendidas (Pontos de Atenção)">
                        <p>{practice.licoesAprendidas}</p>
                    </DetailSection>
                    
                    {practice.comentariosAdicionais && (
                         <DetailSection title="Comentários Adicionais">
                            <p>{practice.comentariosAdicionais}</p>
                        </DetailSection>
                    )}
                </main>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PracticeDetailModal;
