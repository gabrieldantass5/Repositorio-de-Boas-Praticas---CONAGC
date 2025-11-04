
import React from 'react';
import type { Practice } from '../types';

interface PracticeCardProps {
    practice: Practice;
    onSelect: () => void;
}

const statusColors: { [key: string]: string } = {
    'Consolidada': 'bg-green-100 text-green-800',
    'Fase inicial': 'bg-blue-100 text-blue-800',
    'Piloto': 'bg-yellow-100 text-yellow-800',
    'Descontinuada': 'bg-red-100 text-red-800',
};


const PracticeCard: React.FC<PracticeCardProps> = ({ practice, onSelect }) => {
    return (
        <div 
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full"
            onClick={onSelect}
        >
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-red-600">{practice.cbmDeOrigem}</p>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[practice.status]}`}>
                        {practice.status}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">{practice.nomeDaPratica}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{practice.resumo}</p>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                <p className="text-xs text-gray-500 mb-2 font-semibold">Áreas de Impacto:</p>
                <div className="flex flex-wrap gap-2">
                    {practice.areasDeImpacto.slice(0, 3).map(area => (
                        <span key={area} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-md">
                            {area}
                        </span>
                    ))}
                    {practice.areasDeImpacto.length > 3 && (
                         <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-md">
                            +{practice.areasDeImpacto.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PracticeCard;
