import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsList from '@/components/ProductsList';
import { Store as StoreIcon } from 'lucide-react';

const Store = () => {
  return (
    <>
      <Helmet>
        <title>Loja - HarmonIQ</title>
        <meta name="description" content="Explore nossa coleção de produtos." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-block bg-gradient-to-br from-[#D4AF37] to-[#F4E5B8] p-4 rounded-2xl mb-4">
                <StoreIcon className="w-12 h-12 text-[#121212]" />
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] bg-clip-text text-transparent">
                Nossa Loja
              </h1>
              <p className="text-xl text-[#EAEAEA]/80 max-w-2xl mx-auto">
                Descubra produtos exclusivos para aprimorar sua jornada musical.
              </p>
            </motion.div>
            
            <ProductsList />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Store;