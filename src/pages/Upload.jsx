import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext.jsx';

const Upload = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Login necessário",
        description: "Faça login para converter partituras",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleFileUpload = (file) => {
    setIsProcessing(true);
    setFileName(file.name);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setIsComplete(true);
            toast({
              title: "Conversão concluída!",
              description: "Seu arquivo MIDI está pronto para download",
            });
          }, 600);
          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  const handleDownload = () => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${fileName.replace('.pdf', '.midi')}`,
    });
  };

  const handleNewConversion = () => {
    setIsProcessing(false);
    setIsComplete(false);
    setProgress(0);
    setFileName('');
  };

  return (
    <>
      <Helmet><title>Upload - HarmonIQ</title></Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full">
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl font-bold gold-text text-center mb-8">Converter Partitura</h2>

              {!isProcessing && !isComplete && <UploadBox onFileSelect={handleFileUpload} />}

              {isProcessing && (
                <div className="bg-[#1a1a1a] p-8 rounded-2xl card-shadow">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-center text-[#EAEAEA]/70">{fileName}</p>

                  <div className="w-full bg-[#2a2a2a] rounded-full h-4 overflow-hidden mt-4">
                    <motion.div className="h-full gold-gradient" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {isComplete && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1a1a1a] p-8 rounded-2xl card-shadow text-center"
                >
                  <CheckCircle className="w-20 h-20 text-[#D4AF37] mx-auto mb-4" />
                  <p className="text-[#EAEAEA]/70 mb-6">Seu arquivo MIDI está pronto</p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={handleDownload} className="bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8] text-[#121212]">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar MIDI
                    </Button>
                    <Button onClick={handleNewConversion} variant="outline"
                      className="border-2 border-[#D4AF37] text-[#D4AF37]"
                    >
                      Nova Conversão
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Upload;
