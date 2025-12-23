import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ListMusic as FileMusic } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const UploadBox = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      toast({
        title: "Formato inválido",
        description: "Por favor, envie apenas arquivos PDF",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB",
        variant: "destructive",
      });
      return;
    }

    onFileSelect(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        bg-[#1a1a1a] rounded-2xl card-shadow p-12 text-center cursor-pointer
        transition-all duration-300 border-2 border-dashed
        ${isDragging ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#3a3a3a] hover:border-[#D4AF37]/50'}
      `}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      
      <label htmlFor="file-upload" className="cursor-pointer">
        <motion.div
          animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isDragging ? (
            <FileMusic className="w-20 h-20 text-[#D4AF37] mx-auto mb-6" />
          ) : (
            <Upload className="w-20 h-20 text-[#D4AF37] mx-auto mb-6" />
          )}
        </motion.div>
        
        <h3 className="text-2xl font-semibold mb-3 text-[#EAEAEA]">
          {isDragging ? 'Solte o arquivo aqui' : 'Arraste seu PDF aqui'}
        </h3>
        
        <p className="text-[#EAEAEA]/70 mb-6">
          ou clique para selecionar um arquivo
        </p>
        
        <div className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8] text-[#121212] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
          Selecionar Arquivo
        </div>
        
        <p className="text-sm text-[#EAEAEA]/50 mt-6">
          Formatos aceitos: PDF (máx. 10MB)
        </p>
      </label>
    </motion.div>
  );
};

export default UploadBox;