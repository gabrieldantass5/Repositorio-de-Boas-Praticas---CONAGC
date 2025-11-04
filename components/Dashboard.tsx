import React, { useMemo } from 'react';
import type { Practice } from '../types';
import { ImplementationStatus } from '../types';

interface DashboardProps {
    practices: Practice[];
}

const StatCard: React.FC<{ title: string; value: number | string; color: string; }> = ({ title, value, color }) => (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-transform transform hover:scale-105">
        <h4 className="text-base font-medium text-gray-500">{title}</h4>
        <p className={`text-5xl font-bold ${color} mt-2`}>{value}</p>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ practices }) => {

    const statusCounts = useMemo(() => {
        const counts: { [key in ImplementationStatus]?: number } = {};
        for (const practice of practices) {
            counts[practice.status] = (counts[practice.status] || 0) + 1;
        }
        return counts;
    }, [practices]);

    const uniqueCBMsCount = useMemo(() => new Set(practices.map(p => p.cbmDeOrigem)).size, [practices]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Visão Geral</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        </div>
    );
};

export default Dashboard;
