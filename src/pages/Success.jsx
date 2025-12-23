import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Success = () => {
  return (
    <>
      <Helmet>
        <title>Compra Concluída - HarmonIQ</title>
        <meta name="description" content="Sua compra foi realizada com sucesso!" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] p-8 md:p-12 rounded-2xl card-shadow text-center max-w-2xl w-full"
          >
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 gold-text">Pagamento Aprovado!</h1>
            <p className="text-lg text-[#EAEAEA]/80 mb-8">
              Obrigado pela sua compra! Em breve você receberá um e-mail com os detalhes do seu pedido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/store">
                <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8] text-[#121212] hover:opacity-90 px-8 py-6 rounded-xl font-semibold">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Continuar Comprando
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="w-full border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-6 rounded-xl font-semibold">
                  Ir para o Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Success;