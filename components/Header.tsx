
import React from 'react';
import { CollectionIcon, PlusCircleIcon } from './icons';

type View = 'repository' | 'addPractice';

interface HeaderProps {
    currentView: View;
    onViewChange: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
    
    const navItems = [
        { id: 'repository', label: 'Repositório', icon: <CollectionIcon className="w-5 h-5 mr-2" /> },
        { id: 'addPractice', label: 'Adicionar Prática', icon: <PlusCircleIcon className="w-5 h-5 mr-2" /> },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Repositório de Boas Práticas de Gestão</h1>
                            <p className="text-sm text-gray-500">Comitê Nacional de Gestão Corporativa da LIGABOM (CONAGC)</p>
                        </div>
                    </div>
                </div>
                <nav className="flex space-x-4 border-b border-gray-200">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id as View)}
                            className={`flex items-center py-3 px-1 text-sm font-medium transition-colors duration-200 ease-in-out
                                ${currentView === item.id 
                                    ? 'border-b-2 border-red-600 text-red-600' 
                                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                            `}
                            aria-current={currentView === item.id ? 'page' : undefined}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
