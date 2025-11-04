import React, { useMemo } from 'react';
import type { Practice } from '../types';
import { ImplementationStatus } from '../types';
import { DownloadIcon } from './icons';

// Add type declaration for jspdf
declare global {
    interface Window {
        jspdf: any;
    }
}

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

    const handleExportPDF = () => {
        if (practices.length === 0 || typeof window.jspdf === 'undefined') {
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape' });

        doc.setFontSize(18);
        doc.text("Relatório de Boas Práticas - CONAGC", 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        const generationDate = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        doc.text(`Relatório gerado em: ${generationDate}`, 14, 30);
        doc.text(`Total de práticas filtradas: ${practices.length}`, 14, 36);

        const tableColumn = ["Nome da Prática", "CBM", "Responsável", "Status", "Áreas de Impacto"];
        const tableRows: (string | number)[][] = [];

        practices.forEach(practice => {
            const practiceData = [
                practice.nomeDaPratica,
                practice.cbmDeOrigem,
                practice.responsavel,
                practice.status,
                practice.areasDeImpacto.join('; ')
            ];
            tableRows.push(practiceData);
        });

        (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 45,
            theme: 'striped',
            styles: {
                font: 'helvetica',
                fontSize: 8,
                cellPadding: 2,
                overflow: 'linebreak',
            },
            headStyles: {
                fillColor: [189, 3, 11],
                textColor: 255,
                fontStyle: 'bold',
            },
            columnStyles: {
                0: { cellWidth: 80 },
                1: { cellWidth: 20 },
                2: { cellWidth: 40 },
                3: { cellWidth: 30 },
                4: { cellWidth: 'auto' },
            },
            didDrawPage: function (data: any) {
                const pageCount = doc.internal.getNumberOfPages();
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.text(`Página ${data.pageNumber} de ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
            }
        });

        doc.save("boas_praticas_conagc.pdf");
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Visão Geral</h2>
                <button
                    onClick={handleExportPDF}
                    disabled={practices.length === 0}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    aria-label="Exportar práticas filtradas para PDF"
                >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Exportar PDF
                </button>
            </div>

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