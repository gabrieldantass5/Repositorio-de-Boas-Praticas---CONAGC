
import React, { useState, useMemo } from 'react';
import { initialPractices } from './data/practices';
import type { Practice, ImpactArea, ImplementationStatus } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PracticeCard from './components/PracticeCard';
import PracticeDetailModal from './components/PracticeDetailModal';
import Dashboard from './components/Dashboard';
import PracticeForm from './components/PracticeForm';

type View = 'repository' | 'addPractice';

const App: React.FC = () => {
    const [practices, setPractices] = useState<Practice[]>(initialPractices);
    const [selectedCBMs, setSelectedCBMs] = useState<string[]>([]);
    const [selectedImpactAreas, setSelectedImpactAreas] = useState<ImpactArea[]>([]);
    const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<ImplementationStatus | null>(null);
    const [currentView, setCurrentView] = useState<View>('repository');

    const uniqueCBMs = useMemo(() => [...new Set(practices.map(p => p.cbmDeOrigem))], [practices]);
    const uniqueImpactAreas = useMemo(() => [...new Set(practices.flatMap(p => p.areasDeImpacto))] as ImpactArea[], [practices]);

    const filteredPractices = useMemo(() => {
        return practices.filter(practice => {
            const cbmMatch = selectedCBMs.length === 0 || selectedCBMs.includes(practice.cbmDeOrigem);
            const impactAreaMatch = selectedImpactAreas.length === 0 || practice.areasDeImpacto.some(area => selectedImpactAreas.includes(area));
            const statusMatch = selectedStatus === null || practice.status === selectedStatus;
            return cbmMatch && impactAreaMatch && statusMatch;
        });
    }, [practices, selectedCBMs, selectedImpactAreas, selectedStatus]);
    
    const handleCBMChange = (cbm: string) => {
        setSelectedCBMs(prev =>
            prev.includes(cbm) ? prev.filter(item => item !== cbm) : [...prev, cbm]
        );
    };

    const handleImpactAreaChange = (area: ImpactArea) => {
        setSelectedImpactAreas(prev =>
            prev.includes(area) ? prev.filter(item => item !== area) : [...prev, area]
        );
    };

    const handleStatusSelect = (status: ImplementationStatus) => {
        setSelectedStatus(prev => (prev === status ? null : status));
    };

    const clearFilters = () => {
        setSelectedCBMs([]);
        setSelectedImpactAreas([]);
        setSelectedStatus(null);
    };

    const handleAddPractice = (newPractice: Practice) => {
        setPractices(prev => [newPractice, ...prev]);
        setCurrentView('repository');
    };
    
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header currentView={currentView} onViewChange={setCurrentView} />
            <main>
                {currentView === 'repository' ? (
                    <div className="flex flex-col md:flex-row">
                        <Sidebar
                            uniqueCBMs={uniqueCBMs}
                            uniqueImpactAreas={uniqueImpactAreas}
                            selectedCBMs={selectedCBMs}
                            selectedImpactAreas={selectedImpactAreas}
                            onCBMChange={handleCBMChange}
                            onImpactAreaChange={handleImpactAreaChange}
                            onClearFilters={clearFilters}
                        />
                        <div className="flex-1 p-4 md:p-8">
                            <div className="mb-8">
                                <Dashboard 
                                    practices={filteredPractices}
                                    selectedStatus={selectedStatus}
                                    onStatusSelect={handleStatusSelect}
                                />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Práticas Encontradas ({filteredPractices.length})
                            </h2>
                            {filteredPractices.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredPractices.map((practice, index) => (
                                        <PracticeCard
                                            key={index}
                                            practice={practice}
                                            onSelect={() => setSelectedPractice(practice)}
                                        />
                                    ))}
                                </div>
                            ) : (
                               <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                                    <p className="text-gray-500 text-lg">Nenhuma prática encontrada com os filtros selecionados.</p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Limpar Filtros
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <PracticeForm onAddPractice={handleAddPractice} />
                )}
            </main>
            {selectedPractice && (
                <PracticeDetailModal
                    practice={selectedPractice}
                    onClose={() => setSelectedPractice(null)}
                />
            )}
        </div>
    );
};

export default App;
