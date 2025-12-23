import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Download, Clock, ListMusic as FileMusic, Coins } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext.jsx';


const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState({ name: "", credits: 10 });
  const [conversions, setConversions] = useState([]);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
    if (user) {
      setProfile({
        name: user.name,
        credits: 10,
      });

      setConversions([]);
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Dashboard - HarmonIQ</title></Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold gold-text mb-2">Olá, {profile.name}!</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-[#1a1a1a] p-6 rounded-2xl card-shadow">
                <Coins className="w-10 h-10 text-[#D4AF37]" />
                <span className="text-3xl gold-text font-bold">{profile.credits}</span>
                <p className="text-[#EAEAEA]/70 mt-2">Créditos disponíveis</p>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl card-shadow">
                <FileMusic className="w-10 h-10 text-[#D4AF37]" />
                <span className="text-3xl gold-text font-bold">{conversions.length}</span>
                <p className="text-[#EAEAEA]/70 mt-2">Conversões totais</p>
              </div>

              <div className="bg-gradient-to-br from-[#D4AF37] to-[#F4E5B8] p-6 rounded-2xl cursor-pointer"
                onClick={() => navigate('/upload')}
              >
                <h3 className="text-lg font-semibold">Nova conversão</h3>
                <p className="text-sm opacity-70">Clique para converter uma partitura</p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl p-6 card-shadow">
              <h3 className="text-2xl gold-text font-bold mb-6">Histórico de conversões</h3>

              <p className="text-center text-[#EAEAEA]/70 py-12">Nenhuma conversão ainda</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
