import React, { useState, useEffect, useMemo } from 'react';
import type { Practice, ImpactArea } from '../types';
import { ImplementationStatus } from '../types';

interface DashboardProps {
    practices: Practice[];
}

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042']; // Green, Blue, Yellow, Orange
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't render label for small slices

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontWeight="bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ practices }) => {
    const [recharts, setRecharts] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // A more robust way to load the Recharts library dynamically.
        // We check if it's already loaded. If not, we create a script tag,
        // and only once it's successfully loaded, we set the state.
        if ((window as any).Recharts) {
            setRecharts((window as any).Recharts);
            return;
        }

        const scriptSrc = "https://unpkg.com/recharts/umd/Recharts.min.js";
        
        // Avoid adding the script multiple times if the component re-renders quickly
        // or if multiple dashboard instances were ever on the same page.
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
        if (existingScript) {
             // If it exists, it might be in the process of loading. We can listen to its load event
             // or simply fall back to polling for this edge case.
             const intervalId = setInterval(() => {
                if ((window as any).Recharts) {
                    setRecharts((window as any).Recharts);
                    clearInterval(intervalId);
                }
            }, 100);
            return () => clearInterval(intervalId);
        }

        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;

        script.onload = () => {
            if ((window as any).Recharts) {
                setRecharts((window as any).Recharts);
            } else {
                setError("A biblioteca de gráficos foi carregada, mas não está disponível. Por favor, recarregue a página.");
            }
        };
        
        script.onerror = () => {
            setError("Falha ao carregar a biblioteca de gráficos. Verifique sua conexão com a internet.");
        };

        document.body.appendChild(script);

    }, []);

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

    const impactData = useMemo(() => {
        const counts: { [key: string]: number } = {};
        practices.forEach(p => {
            p.areasDeImpacto.forEach(area => {
                counts[area] = (counts[area] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [practices]);
    
    const responsibleData = useMemo(() => {
        const counts: { [key: string]: number } = {};
        practices.forEach(p => {
            const responsible = p.responsavel || 'Não informado';
            counts[responsible] = (counts[responsible] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [practices]);

    const uniqueCBMsCount = useMemo(() => new Set(practices.map(p => p.cbmDeOrigem)).size, [practices]);

    if (error) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Visão Geral</h2>
                <div className="text-center py-20 flex justify-center items-center text-red-600">
                    <p className="text-lg">{error}</p>
                </div>
            </div>
        );
    }

    if (!recharts) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Visão Geral</h2>
                <div className="text-center py-20 flex justify-center items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-500 text-lg">Carregando dashboards...</p>
                </div>
            </div>
        );
    }

    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } = recharts;
    
    const statusColorMap: { [key in ImplementationStatus]: string } = {
        [ImplementationStatus.Consolidada]: COLORS[0],
        [ImplementationStatus.FaseInicial]: COLORS[1],
        [ImplementationStatus.Piloto]: COLORS[2],
        [ImplementationStatus.Descontinuada]: COLORS[3],
    };

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

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-semibold text-gray-700 mb-4 text-center">Práticas por Área de Impacto</h3>
                     <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={impactData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12, width: 140, textAnchor: 'start' }} interval={0} />
                                <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.7)'}}/>
                                <Bar dataKey="value" fill="#dc2626" name="Nº de Práticas" barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-4 text-center">Práticas por Responsável</h3>
                     <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={responsibleData} layout="vertical" margin={{ top: 5, right: 30, left: 90, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis dataKey="name" type="category" width={200} tick={{ fontSize: 12, width: 190, textAnchor: 'start' }} interval={0} />
                                <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.7)'}}/>
                                <Bar dataKey="value" fill="#0088FE" name="Nº de Práticas" barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-2 xl:col-span-1">
                    <h3 className="font-semibold text-gray-700 mb-4 text-center">Distribuição por Status</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                           <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {statusData.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={statusColorMap[entry.name as ImplementationStatus]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
