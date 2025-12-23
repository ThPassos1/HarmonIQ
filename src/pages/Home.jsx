import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music, Sparkles, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>HarmonIQ - Transforme Partituras em Som com Inteligência</title>
        <meta name="description" content="Converta suas partituras em PDF para arquivos MIDI automaticamente com inteligência artificial." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="bg-gradient-to-br from-[#D4AF37] to-[#F4E5B8] p-6 rounded-3xl shadow-2xl"
                >
                  <Music className="w-16 h-16 text-[#121212]" />
                </motion.div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] bg-clip-text text-transparent">
                Transforme partituras em som com inteligência
              </h1>
              
              <p className="text-xl md:text-2xl text-[#EAEAEA]/80 mb-12 max-w-3xl mx-auto">
                Converta seus arquivos PDF de partituras em MIDI de forma automática e inteligente
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  onClick={() => navigate('/upload')}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8] text-[#121212] hover:opacity-90 text-lg px-8 py-6 rounded-xl font-semibold shadow-lg hover-lift"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Começar Agora
                </Button>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-lg px-8 py-6 rounded-xl font-semibold"
                >
                  Fazer Login
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#1a1a1a] p-8 rounded-2xl card-shadow hover-lift"
                >
                  <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">Conversão Inteligente</h3>
                  <p className="text-[#EAEAEA]/70">
                    Tecnologia avançada para converter partituras com precisão
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#1a1a1a] p-8 rounded-2xl card-shadow hover-lift"
                >
                  <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">Rápido e Fácil</h3>
                  <p className="text-[#EAEAEA]/70">
                    Upload simples e conversão em segundos
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-[#1a1a1a] p-8 rounded-2xl card-shadow hover-lift"
                >
                  <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">Qualidade Premium</h3>
                  <p className="text-[#EAEAEA]/70">
                    Arquivos MIDI de alta qualidade prontos para uso
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;