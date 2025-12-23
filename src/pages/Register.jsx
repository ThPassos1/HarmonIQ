import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music, Mail, Lock, User as UserIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from '@/components/ui/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { user, loginWithToken } = useAuth(); // ⬅ usado para logar após registro

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Erro ao cadastrar",
          description: data.error || "Não foi possível registrar",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // SALVA TOKEN E FAZ LOGIN AUTOMÁTICO
      loginWithToken(data.token);

      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo, ${name}!`,
      });

      navigate('/dashboard');

    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet><title>Cadastro - HarmonIQ</title></Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full"
          >
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-[#D4AF37] to-[#F4E5B8] p-4 rounded-2xl mb-4">
                <Music className="w-12 h-12 text-[#121212]" />
              </div>
              <h2 className="text-4xl font-bold gold-text mb-2">Criar Conta</h2>
              <p className="text-[#EAEAEA]/70">Comece a converter suas partituras</p>
            </div>

            <div className="bg-[#1a1a1a] p-8 rounded-2xl card-shadow">
              <form onSubmit={handleRegister} className="space-y-6">

                <div>
                  <Label htmlFor="name" className="text-[#EAEAEA]">Nome</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="pl-12 bg-[#2a2a2a]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#EAEAEA]">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="pl-12 bg-[#2a2a2a]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-[#EAEAEA]">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-12 bg-[#2a2a2a]"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8] text-[#121212] h-12 text-lg font-semibold"
                >
                  {loading ? "Criando..." : "Criar Conta"}
                </Button>

              </form>

              <div className="mt-6 text-center">
                <p className="text-[#EAEAEA]/70">
                  Já tem uma conta?{" "}
                  <button onClick={() => navigate('/login')}
                    className="text-[#D4AF37] hover:underline font-semibold">
                    Faça login
                  </button>
                </p>
              </div>

            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Register;
