import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Check, Gem, Star } from 'lucide-react';
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';

    const plans = [
      {
        name: 'Gratuito',
        price: '0.00',
        duration: 'mensal',
        limit: '5 conversões',
        features: ['5 conversões/mês', 'Suporte básico'],
        buttonText: 'Comece de Graça',
        isFeatured: false,
      },
      {
        name: 'Premium',
        price: '19.90',
        duration: 'mensal',
        limit: '100 conversões',
        features: ['100 conversões/mês', 'Suporte prioritário', 'Qualidade de áudio aprimorada'],
        buttonText: 'Assinar Premium',
        isFeatured: true,
      },
      {
        name: 'Pro',
        price: '199.00',
        duration: 'anual',
        limit: '1500 conversões',
        features: ['1500 conversões/ano', 'Suporte dedicado 24/7', 'Acesso antecipado a novos recursos', 'Armazenamento em nuvem'],
        buttonText: 'Assinar Pro',
        isFeatured: false,
      },
    ];

    const Pricing = () => {
      const { toast } = useToast();

      const handleSubscription = (planName) => {
        toast({
          title: `🚀 Plano ${planName}`,
          description: "🚧 Este recurso ainda não foi implementado, mas não se preocupe! Você pode solicitá-lo em seu próximo prompt! 🚀",
        });
      };

      return (
        <>
          <Helmet>
            <title>Planos - HarmonIQ</title>
            <meta name="description" content="Escolha o plano perfeito para suas necessidades de conversão de partituras." />
          </Helmet>
          
          <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-1 px-4 py-12">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <div className="inline-block bg-gradient-to-br from-[#D4AF37] to-[#F4E5B8] p-4 rounded-2xl mb-4">
                    <Gem className="w-12 h-12 text-[#121212]" />
                  </div>
                  <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] bg-clip-text text-transparent">
                    Planos Flexíveis para Você
                  </h1>
                  <p className="text-xl text-[#EAEAEA]/80 max-w-2xl mx-auto">
                    Escolha o plano que melhor se adapta ao seu ritmo e comece a converter.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * (index + 1) }}
                      className={`bg-[#1a1a1a] p-8 rounded-2xl card-shadow relative flex flex-col ${plan.isFeatured ? 'border-2 border-[#D4AF37] scale-105' : ''}`}
                    >
                      {plan.isFeatured && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8] text-[#121212] px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          MAIS POPULAR
                        </div>
                      )}
                      
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2 gold-text">{plan.name}</h3>
                        <p className="text-[#EAEAEA]/70 mb-6">{plan.limit}</p>
                        
                        <div className="mb-8">
                          <span className="text-5xl font-bold">R${plan.price}</span>
                          <span className="text-[#EAEAEA]/70">/{plan.duration}</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-green-400" />
                              <span className="text-[#EAEAEA]/90">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        onClick={() => handleSubscription(plan.name)}
                        className={`w-full mt-auto text-lg font-semibold py-6 rounded-xl ${plan.isFeatured ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8] text-[#121212] hover:opacity-90' : 'bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}
                      >
                        {plan.buttonText}
                      </Button>
                    </motion.div>
                  ))}
                </div>
                 <div className="text-center mt-16">
                    <p className="text-[#EAEAEA]/70">
                        Para implementar pagamentos com cartão de crédito, você pode usar o Stripe.
                    </p>
                    <p className="text-[#EAEAEA]/70">
                        Confira <a href="https://www.hostinger.com/support/hostinger-horizons-how-to-sell-subscriptions-with-stripe/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline font-semibold">este artigo</a> para aprender como vender assinaturas com o Stripe.
                    </p>
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </>
      );
    };

    export default Pricing;