import React, { useState, useEffect } from 'react';

export default function PagBankPayment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'basic',
    paymentMethod: 'pix'
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [showPixKey, setShowPixKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const PIX_KEY = 'orai24698@gmail.com'; // Sua chave PIX

  const plans = {
    basic: { name: 'Plano Básico', price: 30, description: 'Acesso básico' },
    premium: { name: 'Plano Premium', price: 80, description: 'Acesso completo' }
  };

  // Carregar script do PagBank
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.pagbank.com.br/connect/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('⏳ Processando pagamento...');
    setError('');

    try {
      // Validar dados
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error('Por favor, preencha todos os campos obrigatórios');
      }

      const selectedPlan = plans[formData.plan];

      // Se escolheu PIX, mostrar a chave
      if (formData.paymentMethod === 'pix') {
        setStatus(`✅ Chave PIX exibida. Transfira R$ ${selectedPlan.price} para: ${PIX_KEY}`);
        setShowPixKey(true);
        setLoading(false);
        return;
      }

      // Chamar API para criar a transação no PagBank (para cartão e boleto)
      const response = await fetch('/api/pagbank/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: formData.plan,
          amount: selectedPlan.price,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          },
          paymentMethod: formData.paymentMethod
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

      const data = await response.json();

      if (data.redirectUrl) {
        // Redirecionar para o checkout do PagBank
        window.location.href = data.redirectUrl;
      } else {
        setStatus('✅ Pagamento iniciado! Você será redirecionado...');
      }
    } catch (err) {
      console.error('Erro:', err);
      setError(err.message || 'Erro ao processar pagamento. Tente novamente.');
      setStatus('');
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-black to-zinc-900 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          💳 Escolha seu Plano
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Plano Básico */}
          <div className={`rounded-3xl p-8 border-2 transition ${
            formData.plan === 'basic'
              ? 'bg-blue-500/10 border-blue-500'
              : 'bg-zinc-900 border-zinc-700 hover:border-blue-500'
          }`}>
            <div className="text-4xl mb-4">💙</div>
            <h3 className="text-2xl font-bold text-blue-400 mb-2">Plano Básico</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">R$ 30</span>
              <span className="text-gray-400">/mês</span>
            </div>
            <button
              onClick={() => setFormData({ ...formData, plan: 'basic' })}
              className={`w-full py-2 rounded-2xl font-bold mb-6 transition ${
                formData.plan === 'basic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              Selecionar
            </button>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✅ Atendimento via email</li>
              <li>✅ 3 designs por mês</li>
              <li>✅ Suporte 24h</li>
              <li>✅ Análise de redes sociais</li>
            </ul>
          </div>

          {/* Plano Premium */}
          <div className={`rounded-3xl p-8 border-2 transition scale-105 ${
            formData.plan === 'premium'
              ? 'bg-gradient-to-b from-blue-500 to-blue-600 border-blue-400'
              : 'bg-zinc-900 border-zinc-700 hover:border-blue-500'
          }`}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                ⭐ MAIS POPULAR
              </span>
            </div>
            <div className="text-4xl mb-4">💎</div>
            <h3 className={`text-2xl font-bold mb-2 ${
              formData.plan === 'premium' ? 'text-white' : 'text-blue-400'
            }`}>Plano Premium</h3>
            <div className="mb-6">
              <span className={`text-4xl font-bold ${
                formData.plan === 'premium' ? 'text-white' : 'text-white'
              }`}>R$ 80</span>
              <span className={`${
                formData.plan === 'premium' ? 'text-blue-100' : 'text-gray-400'
              }`}>/mês</span>
            </div>
            <button
              onClick={() => setFormData({ ...formData, plan: 'premium' })}
              className={`w-full py-2 rounded-2xl font-bold mb-6 transition ${
                formData.plan === 'premium'
                  ? 'bg-white text-blue-600 hover:bg-gray-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Selecionar
            </button>
            <ul className={`space-y-2 text-sm ${
              formData.plan === 'premium' ? 'text-white' : 'text-gray-300'
            }`}>
              <li>✅ Atendimento prioritário</li>
              <li>✅ 10 designs por mês</li>
              <li>✅ Suporte 24/7</li>
              <li>✅ Automação de marketing</li>
              <li>✅ Consultoria mensal</li>
            </ul>
          </div>
        </div>

        {/* Formulário de Pagamento */}
        <div className="bg-zinc-900 border-2 border-blue-500 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">📋 Dados do Pagamento</h3>

          <form onSubmit={handlePaymentClick} className="space-y-6">
            {/* Dados Pessoais */}
            <div>
              <label className="block text-white font-semibold mb-2">👤 Nome Completo *</label>
              <input
                type="text"
                name="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-blue-500 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">📧 Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-blue-500 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">📱 WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-blue-500 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div>
              <label className="block text-white font-semibold mb-3">💳 Forma de Pagamento</label>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { value: 'pix', label: '🟢 PIX', color: 'green' },
                  { value: 'card', label: '💳 Cartão', color: 'blue' },
                  { value: 'boleto', label: '📄 Boleto', color: 'purple' }
                ].map(method => (
                  <label key={method.value} className={`p-3 rounded-2xl border-2 cursor-pointer transition ${
                    formData.paymentMethod === method.value
                      ? `bg-${method.color}-500/20 border-${method.color}-500`
                      : 'bg-black border-zinc-700 hover:border-blue-500'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-white font-semibold">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Exibir Chave PIX se selecionado */}
            {showPixKey && formData.paymentMethod === 'pix' && (
              <div className="bg-green-500/20 border-2 border-green-500 rounded-3xl p-6">
                <h4 className="text-green-400 font-bold text-lg mb-4">🟢 Chave PIX</h4>
                <div className="bg-black rounded-2xl p-4 border border-green-500 mb-4">
                  <p className="text-gray-400 mb-2 text-sm">Chave PIX (Email)</p>
                  <p className="text-green-400 font-mono text-lg break-all">{PIX_KEY}</p>
                </div>
                <button
                  type="button"
                  onClick={copyPixKey}
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-2xl mb-4 transition"
                >
                  {copied ? '✅ Copiado!' : '📋 Copiar Chave PIX'}
                </button>
                <div className="bg-black rounded-2xl p-4 border border-green-500">
                  <p className="text-white font-bold mb-3">📝 Como funciona:</p>
                  <ol className="text-gray-300 space-y-2 text-sm">
                    <li>1️⃣ Copie a chave PIX acima</li>
                    <li>2️⃣ Abra seu banco ou app de PIX</li>
                    <li>3️⃣ Transfira R$ {plans[formData.plan].price} para a chave</li>
                    <li>4️⃣ Envie o comprovante via WhatsApp</li>
                    <li>5️⃣ Ative seu acesso em minutos! ✨</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Resumo */}
            <div className="bg-black rounded-2xl p-6 border border-blue-700">
              <h4 className="text-white font-bold mb-4">📊 Resumo do Pedido</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Plano:</span>
                  <span className="text-blue-400 font-bold">{plans[formData.plan].name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor:</span>
                  <span className="text-green-400 font-bold text-lg">R$ {plans[formData.plan].price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Forma:</span>
                  <span className="text-blue-400 font-bold">
                    {formData.paymentMethod === 'pix' ? 'PIX' : formData.paymentMethod === 'card' ? 'Cartão' : 'Boleto'}
                  </span>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-2xl">
                ❌ {error}
              </div>
            )}

            {status && (
              <div className={`p-4 rounded-2xl ${
                status.includes('✅')
                  ? 'bg-green-500/20 border border-green-500 text-green-400'
                  : 'bg-blue-500/20 border border-blue-500 text-blue-400'
              }`}>
                {status}
              </div>
            )}

            {/* Botão Pagar */}
            {!showPixKey && (
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.email || !formData.phone}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 rounded-2xl transition text-lg"
              >
                {loading ? '⏳ Processando...' : `💰 Pagar R$ ${plans[formData.plan].price}`}
              </button>
            )}

            {/* Segurança */}
            <div className="text-center text-gray-400 text-sm space-y-1">
              <p>🔒 Pagamento seguro e protegido</p>
              <p>✅ Acesso imediato após confirmação</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
