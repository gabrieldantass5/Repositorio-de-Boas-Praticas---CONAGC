
import React from 'react';
import type { ImpactArea } from '../types';
import { FilterIcon, XIcon } from './icons';

interface SidebarProps {
    uniqueCBMs: string[];
    uniqueImpactAreas: ImpactArea[];
    selectedCBMs: string[];
    selectedImpactAreas: ImpactArea[];
    onCBMChange: (cbm: string) => void;
    onImpactAreaChange: (area: ImpactArea) => void;
    onClearFilters: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    uniqueCBMs,
    uniqueImpactAreas,
    selectedCBMs,
    selectedImpactAreas,
    onCBMChange,
    onImpactAreaChange,
    onClearFilters,
}) => {
    return (
        <aside className="w-full md:w-80 lg:w-96 bg-white p-6 shadow-lg md:h-screen md:sticky md:top-20 flex-shrink-0">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FilterIcon className="w-6 h-6 mr-2 text-gray-500"/>
                    Filtros
                </h2>
                <button
                    onClick={onClearFilters}
                    className="flex items-center text-sm text-red-600 hover:text-red-800 font-semibold transition-colors"
                >
                    <XIcon className="w-4 h-4 mr-1"/>
                    Limpar
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Filtrar por CBM</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {uniqueCBMs.sort().map(cbm => (
                            <label key={cbm} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCBMs.includes(cbm)}
                                    onChange={() => onCBMChange(cbm)}
                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="ml-3 text-gray-600">{cbm}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Filtrar por Área de Impacto</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {uniqueImpactAreas.sort().map(area => (
                            <label key={area} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedImpactAreas.includes(area)}
                                    onChange={() => onImpactAreaChange(area)}
                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="ml-3 text-gray-600">{area}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
