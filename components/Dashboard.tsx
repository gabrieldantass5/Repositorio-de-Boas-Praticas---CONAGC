import React, { useMemo } from 'react';
import type { Practice, ImpactArea } from '../types';
import { ImplementationStatus } from '../types';
// Todos os gráficos foram removidos conforme solicitação.

interface DashboardProps {
    practices: Practice[];
}

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042']; // Green, Blue, Yellow, Orange
// Removidos helpers e labels relacionados ao gráfico de pizza

// Mantemos apenas o dashboard de Status; utilidades dos gráficos de barras foram removidas.

const Dashboard: React.FC<DashboardProps> = ({ practices }) => {

    const statusData = useMemo(() => {
        const counts: { [key in ImplementationStatus]: number } = {
            [ImplementationStatus.Consolidada]: 0,
            [ImplementationStatus.FaseInicial]: 0,
            [ImplementationStatus.Piloto]: 0,
            [ImplementationStatus.Descontinuada]: 0
        };
        practices.forEach(p => {
            if (p.status in counts) {
                counts[p.status]++;
            }
        });
        return (Object.keys(counts) as ImplementationStatus[])
          .map(name => ({ name, value: counts[name] }))
          .filter(item => item.value > 0);
    }, [practices]);

    // Removidos dashboards de Área de Impacto e Responsável

    const uniqueCBMsCount = useMemo(() => new Set(practices.map(p => p.cbmDeOrigem)).size, [practices]);

    
    
    // Mapa de cores removido junto com o gráfico de status

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Visão Geral</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-center">
                 <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-500">Total de Práticas</h4>
                    <p className="text-3xl font-bold text-red-600">{practices.length}</p>
                </div>
                 <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-500">CBMs Participantes</h4>
                    <p className="text-3xl font-bold text-red-600">{uniqueCBMsCount}</p>
                </div>
                 <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-500">Práticas Consolidadas</h4>
                    <p className="text-3xl font-bold text-green-600">{statusData.find(s => s.name === ImplementationStatus.Consolidada)?.value || 0}</p>
                </div>
                 <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-500">Em Fase Inicial</h4>
                    <p className="text-3xl font-bold text-blue-600">{statusData.find(s => s.name === ImplementationStatus.FaseInicial)?.value || 0}</p>
                </div>
            </div>

            {/* Seção de gráficos removida. Mantidos apenas os cards de resumo acima. */}
        </div>
    );
};

export default Dashboard;
