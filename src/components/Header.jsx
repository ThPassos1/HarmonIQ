import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Music, LogOut, LayoutDashboard, Gem } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useAuth } from '@/contexts/AuthContext';
    import { toast } from '@/components/ui/use-toast';

    const Header = () => {
      const navigate = useNavigate();
      const { session, signOut } = useAuth();

      const handleLogout = async () => {
        await signOut();
        toast({
          title: "Logout realizado",
          description: "Até logo!",
        });
        navigate('/');
      };

      return (
        <header className="border-b border-[#2a2a2a] bg-[#121212]/80 backdrop-blur-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#F4E5B8] p-2 rounded-xl">
                <Music className="w-6 h-6 text-[#121212]" />
              </div>
              <span className="text-2xl font-bold gold-text">HarmonIQ</span>
            </button>

            <nav className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/pricing')}
                variant="ghost"
                className="text-[#EAEAEA] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <Gem className="w-4 h-4 mr-2" />
                Planos
              </Button>
              {session ? (
                <>
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="ghost"
                    className="text-[#EAEAEA] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-[#EAEAEA] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate('/login')}
                    variant="ghost"
                    className="text-[#EAEAEA] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate('/register')}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8] text-[#121212] hover:opacity-90"
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </nav>
          </div>
        </header>
      );
    };

    export default Header;