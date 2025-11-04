
import React, { useState } from 'react';
import { Practice, ImplementationStatus, ImpactArea } from '../types';

interface PracticeFormProps {
    onAddPractice: (practice: Practice) => void;
}

const PracticeForm: React.FC<PracticeFormProps> = ({ onAddPractice }) => {
    const [formData, setFormData] = useState<Omit<Practice, 'areasDeImpacto' | 'status'> & { areasDeImpacto: ImpactArea[], status: ImplementationStatus | '' }>({
        nomeDaPratica: '',
        cbmDeOrigem: '',
        responsavel: '',
        areasDeImpacto: [],
        status: '',
        resumo: '',
        temaApresentacao: '',
        problemaAbordado: '',
        metodologia: '',
        resultados: '',
        licoesAprendidas: '',
        comentariosAdicionais: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validate = (currentFormData: typeof formData): Record<string, string> => {
        const newErrors: Record<string, string> = {};
        if (!currentFormData.nomeDaPratica) newErrors.nomeDaPratica = 'O nome da prática é obrigatório.';
        if (!currentFormData.cbmDeOrigem) newErrors.cbmDeOrigem = 'O CBM de origem é obrigatório.';
        if (!currentFormData.responsavel) newErrors.responsavel = 'O responsável é obrigatório.';
        if (!currentFormData.status) newErrors.status = 'O status é obrigatório.';
        if (currentFormData.areasDeImpacto.length === 0) newErrors.areasDeImpacto = 'Selecione pelo menos uma área de impacto.';
        if (!currentFormData.resumo) newErrors.resumo = 'O resumo é obrigatório.';
        return newErrors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (touched[name]) {
            const validationErrors = validate(newFormData);
            setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name } = e.target;
        if (!touched[name]) {
            setTouched(prev => ({ ...prev, [name]: true }));
        }
        const validationErrors = validate(formData);
        setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
    };

    const handleImpactAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const area = value as ImpactArea;
        
        setTouched(prev => ({ ...prev, areasDeImpacto: true }));

        setFormData(prev => {
            const newAreas = checked
                ? [...prev.areasDeImpacto, area]
                : prev.areasDeImpacto.filter(a => a !== area);
            const newFormData = { ...prev, areasDeImpacto: newAreas };
            
            const validationErrors = validate(newFormData);
            setErrors(currentErrors => ({ ...currentErrors, areasDeImpacto: validationErrors.areasDeImpacto }));
            
            return newFormData;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const allTouched = Object.keys(formData).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {} as Record<string, boolean>);
            setTouched(allTouched);
            return;
        }
        
        onAddPractice(formData as Practice);
    };

    const FormField: React.FC<{ label: string; name: string; children: React.ReactNode; required?: boolean; error?: string }> = ({ label, name, children, required, error }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Adicionar Nova Prática de Gestão</h2>
                <p className="text-gray-500 mb-6">Preencha os campos abaixo para submeter uma nova boa prática ao repositório.</p>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <FormField label="Nome da Prática" name="nomeDaPratica" required error={touched.nomeDaPratica ? errors.nomeDaPratica : undefined}>
                        <input type="text" id="nomeDaPratica" name="nomeDaPratica" value={formData.nomeDaPratica} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                    </FormField>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="CBM de Origem" name="cbmDeOrigem" required error={touched.cbmDeOrigem ? errors.cbmDeOrigem : undefined}>
                            <input type="text" id="cbmDeOrigem" name="cbmDeOrigem" value={formData.cbmDeOrigem} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                        </FormField>
                        <FormField label="Responsável" name="responsavel" required error={touched.responsavel ? errors.responsavel : undefined}>
                            <input type="text" id="responsavel" name="responsavel" value={formData.responsavel} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                        </FormField>
                    </div>

                    <FormField label="Status da Implementação" name="status" required error={touched.status ? errors.status : undefined}>
                        <select id="status" name="status" value={formData.status} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white">
                            <option value="" disabled>Selecione um status</option>
                            {Object.values(ImplementationStatus).map(status => <option key={status} value={status}>{status}</option>)}
                        </select>
                    </FormField>

                    <FormField label="Áreas de Impacto" name="areasDeImpacto" required error={touched.areasDeImpacto ? errors.areasDeImpacto : undefined}>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
                            {Object.values(ImpactArea).map(area => (
                                <label key={area} className="flex items-center cursor-pointer">
                                    <input type="checkbox" value={area} onChange={handleImpactAreaChange} checked={formData.areasDeImpacto.includes(area)} className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                                    <span className="ml-3 text-sm text-gray-600">{area}</span>
                                </label>
                            ))}
                        </div>
                    </FormField>

                    <FormField label="Resumo da Prática" name="resumo" required error={touched.resumo ? errors.resumo : undefined}>
                        <textarea id="resumo" name="resumo" rows={3} value={formData.resumo} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white" />
                    </FormField>
                    
                    <FormField label="Tema da Apresentação" name="temaApresentacao">
                        <input type="text" id="temaApresentacao" name="temaApresentacao" value={formData.temaApresentacao} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                    </FormField>

                    <FormField label="Problema Abordado" name="problemaAbordado">
                        <textarea id="problemaAbordado" name="problemaAbordado" rows={3} value={formData.problemaAbordado} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white" />
                    </FormField>

                    <FormField label="Metodologia / Passos de Implementação" name="metodologia">
                        <textarea id="metodologia" name="metodologia" rows={3} value={formData.metodologia} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white" />
                    </FormField>

                    <FormField label="Resultados Alcançados (Indicadores Chave)" name="resultados">
                        <textarea id="resultados" name="resultados" rows={3} value={formData.resultados} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white" />
                    </FormField>

                    <FormField label="Lições Aprendidas (Pontos de Atenção)" name="licoesAprendidas">
                        <textarea id="licoesAprendidas" name="licoesAprendidas" rows={3} value={formData.licoesAprendidas} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white" />
                    </FormField>

                    <FormField label="Comentários Adicionais" name="comentariosAdicionais">
                        <textarea id="comentariosAdicionais" name="comentariosAdicionais" rows={3} value={formData.comentariosAdicionais} onChange={handleInputChange} onBlur={handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white" />
                    </FormField>

                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Salvar Prática
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PracticeForm;
