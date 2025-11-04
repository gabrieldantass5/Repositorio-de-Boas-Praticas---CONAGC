import React, { useMemo } from 'react';
import type { Practice } from '../types';
import { ImplementationStatus } from '../types';

interface DashboardProps {
    practices: Practice[];
    selectedStatus: ImplementationStatus | null;
    onStatusSelect: (status: ImplementationStatus) => void;
}

const StatCard: React.FC<{ title: string; value: number | string; color: string; }> = ({ title, value, color }) => (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-transform transform hover:scale-105">
        <h4 className="text-base font-medium text-gray-500">{title}</h4>
        <p className={`text-5xl font-bold ${color} mt-2`}>{value}</p>
    </div>
);

const STATUS_ORDER: ImplementationStatus[] = [
    ImplementationStatus.Consolidada,
    ImplementationStatus.FaseInicial,
    ImplementationStatus.Piloto,
    ImplementationStatus.Descontinuada,
];

const barColors: { [key in ImplementationStatus]: string } = {
    [ImplementationStatus.Consolidada]: 'bg-green-500',
    [ImplementationStatus.FaseInicial]: 'bg-blue-500',
    [ImplementationStatus.Piloto]: 'bg-yellow-500',
    [ImplementationStatus.Descontinuada]: 'bg-red-500',
};


const Dashboard: React.FC<DashboardProps> = ({ practices, selectedStatus, onStatusSelect }) => {

    const statusCounts = useMemo(() => {
        const counts: Record<ImplementationStatus, number> = {
            [ImplementationStatus.Consolidada]: 0,
            [ImplementationStatus.FaseInicial]: 0,
            [ImplementationStatus.Piloto]: 0,
            [ImplementationStatus.Descontinuada]: 0,
        };
        for (const practice of practices) {
            counts[practice.status]++;
        }
        return counts;
    }, [practices]);

    const uniqueCBMsCount = useMemo(() => new Set(practices.map(p => p.cbmDeOrigem)).size, [practices]);

    const chartData = useMemo(() => STATUS_ORDER.map(status => ({
        status,
        count: statusCounts[status] || 0,
    })), [statusCounts]);
    
    const maxCount = useMemo(() => Math.max(...chartData.map(d => d.count), 1), [chartData]);


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Visão Geral</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard 
                    title="Total de Práticas" 
                    value={practices.length} 
                    color="text-red-600"
                />
                <StatCard 
                    title="CBMs Participantes" 
                    value={uniqueCBMsCount} 
                    color="text-red-600"
                />
                <StatCard 
                    title="Práticas Consolidadas" 
                    value={statusCounts[ImplementationStatus.Consolidada] || 0} 
                    color="text-green-600"
                />
                <StatCard 
                    title="Em Fase Inicial" 
                    value={statusCounts[ImplementationStatus.FaseInicial] || 0} 
                    color="text-blue-600"
                />
            </div>

            {/* Bar Chart Section */}
            <div>
                <h3 className="text-2xl font-bold text-slate-700 mb-6">Distribuição por Status</h3>
                <div className="space-y-2">
                    {chartData.map(({ status, count }) => {
                        const isSelected = selectedStatus === status;
                        const isFiltering = selectedStatus !== null;

                        return (
                            <div 
                                key={status}
                                className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-3 cursor-pointer p-1 rounded-md transition-all duration-200 ${isSelected ? 'bg-red-50' : 'hover:bg-gray-100'} ${isFiltering && !isSelected ? 'opacity-50' : 'opacity-100'}`}
                                onClick={() => onStatusSelect(status)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onStatusSelect(status); }}
                                aria-pressed={isSelected}
                            >
                                <span className="text-sm font-medium text-gray-600 justify-self-start pr-2 w-32">{status}</span>
                                <div className="bg-gray-200 rounded-full h-5" title={`${status}: ${count}`}>
                                    <div
                                        className={`${barColors[status]} h-5 rounded-full transition-all duration-500 ease-out`}
                                        style={{ width: count > 0 ? `${(count / maxCount) * 100}%` : '0%' }}
                                        role="progressbar"
                                        aria-valuenow={count}
                                        aria-valuemin={0}
                                        aria-valuemax={maxCount}
                                        aria-label={`${status}: ${count}`}
                                    >
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-gray-800 w-8 text-right">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;