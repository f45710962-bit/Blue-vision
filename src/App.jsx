import React, { useState } from 'react';
import PixPayment from './components/PixPayment';

export default function BlueVisionApp() {
  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-blue-500">Blue Vision</h1>
            <p className="text-gray-400">Luxo • Tecnologia • Resultado</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-2xl shadow-lg">
            Entrar
          </button>
        </header>

        <section className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              A nova visão digital da quebrada.
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Plataforma premium para atendimento, divulgação, pagamentos e crescimento digital.
            </p>

            <div className="flex gap-4 mb-6">
              <button className="bg-blue-500 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-600">
                Começar
              </button>
              <button className="border border-blue-500 px-6 py-3 rounded-2xl hover:bg-blue-500/10">
                Ver Serviços
              </button>
            </div>
          </div>

          <PixPayment />
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Marketing Digital',
              desc: 'Divulgação profissional para empresas e marcas.'
            },
            {
              title: 'Design Premium',
              desc: 'Logos, identidade visual e presença forte.'
            },
            {
              title: 'Tecnologia',
              desc: 'Atendimento moderno e automação digital.'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-blue-500 transition"
            >
              <h3 className="text-2xl font-bold mb-3 text-blue-400">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-zinc-900 rounded-3xl p-8 border border-blue-500 mb-10">
          <h2 className="text-3xl font-bold mb-6">Área de Pagamentos</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black border border-green-500 rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-3">PIX Instantâneo</h3>
              <p className="text-gray-300 mb-4">Pagamento rápido e seguro via chave PIX.</p>
              <div className="bg-zinc-900 p-4 rounded-2xl text-sm break-all border border-green-500">
                <p className="text-green-400 mb-2 font-semibold">Chave PIX</p>
                <p className="select-all">{process.env.REACT_APP_PIX_KEY || 'orai24698@gmail.com'}</p>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-2xl mt-4">
                Copiar Chave PIX
              </button>
            </div>

            <div className="bg-black border border-white rounded-3xl p-6">
              <h3 className="text-2xl font-bold mb-3">Cartão</h3>
              <p className="text-gray-300 mb-4">Integração preparada para pagamentos online.</p>
              <button className="bg-white text-black px-5 py-3 rounded-2xl font-bold w-full hover:bg-gray-200">
                Finalizar Compra
              </button>
            </div>
          </div>

          <div className="bg-black border border-blue-500 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">✔ Benefícios</h3>
            <div className="space-y-2 text-gray-300">
              <p>✅ Pagamento rápido e instantâneo</p>
              <p>✅ Atendimento premium 24/7</p>
              <p>✅ Confirmação imediata</p>
              <p>✅ Segurança garantida</p>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 rounded-3xl p-8 border border-blue-500 mb-10">
          <h2 className="text-3xl font-bold mb-4">Contato Direto</h2>
          <div className="space-y-3 text-lg text-gray-300">
            <p>📧 {process.env.REACT_APP_CONTACT_EMAIL || 'orai24698@gmail.com'}</p>
            <p>📲 WhatsApp disponível</p>
            <p>🚀 Blue Vision Oficial</p>
          </div>
        </section>

        <footer className="text-center text-gray-500 py-6 border-t border-zinc-800">
          © 2026 Blue Vision — Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}
