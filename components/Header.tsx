import React from 'react';

const Header: React.FC = () => {
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
            </div>
        </header>
    );
};

export default Header;