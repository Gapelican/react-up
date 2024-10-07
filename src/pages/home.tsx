import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Fácil de Usar',
    description: 'Interface intuitiva para todos os usuários.',
    icon: '🚀',
  },
  {
    title: 'Rápido',
    description: 'Desempenho otimizado para carregamento rápido.',
    icon: '⚡',
  },
  {
    title: 'Seguro',
    description: 'Proteção de dados de última geração.',
    icon: '🔒',
  },
  {
    title: 'Responsivo',
    description: 'Funciona perfeitamente em todos os dispositivos.',
    icon: '📱',
  },
]

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="py-16 text-center">
        <h1 className="mb-4 text-5xl font-bold text-blue-900">
          Bem-vindo ao Nosso App
        </h1>
        <p className="mb-8 text-xl text-blue-700">
          A solução perfeita para suas necessidades
        </p>
        <Link
          to="/about"
          className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
        >
          Saiba Mais
        </Link>
      </header>

      <main className="container mx-auto px-4">
        <section className="my-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h2 className="mb-2 text-xl font-semibold text-blue-900">
                {feature.title}
              </h2>
              <p className="text-blue-700">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900">
            Pronto para começar?
          </h2>
          <p className="mb-8 text-xl text-blue-700">
            Junte-se a milhares de usuários satisfeitos hoje mesmo!
          </p>
          <Link
            to="/contact"
            className="rounded-full bg-green-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-green-600"
          >
            Comece Agora
          </Link>
        </section>
      </main>

      <footer className="bg-blue-900 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Nosso App. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
