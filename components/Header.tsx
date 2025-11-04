import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4zm8-2h-3v-2h-2v2h-3v2h3v2h2v-2h3v-2zM4 18h8v2H4v-2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
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