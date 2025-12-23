import React, { useState } from 'react';
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
    } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { useAuth } from "@/contexts/AuthContext";

    const ForgotPasswordDialog = ({ open, onOpenChange }) => {
      const { sendPasswordResetEmail } = useAuth();
      const [email, setEmail] = useState('');
      const [loading, setLoading] = useState(false);

      const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        await sendPasswordResetEmail(email);
        setLoading(false);
        onOpenChange(false);
      };

      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-[#3a3a3a] text-white">
            <DialogHeader>
              <DialogTitle className="gold-text">Redefinir Senha</DialogTitle>
              <DialogDescription className="text-[#EAEAEA]/70">
                Digite seu e-mail e enviaremos um link para você redefinir sua senha.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePasswordReset}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email-reset" className="text-right text-[#EAEAEA]">
                    Email
                  </Label>
                  <Input
                    id="email-reset"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-3 bg-[#2a2a2a] border-[#3a3a3a] text-[#EAEAEA] focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8] text-[#121212] hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    };

    export default ForgotPasswordDialog;