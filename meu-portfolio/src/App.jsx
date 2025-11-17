import Hero from './components/Hero';
import Projects from './components/Projects';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Seção de Apresentação (Hero) */}
      <Hero />

      {/* Seção de Projetos */}
      <Projects />

      {/* Rodapé Simples */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <div className="container mx-auto px-6">
          <p>
            © {new Date().getFullYear()} Ana Carolina Couto Machado.
            Desenvolvido com React & Tailwind CSS.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <a
              href="mailto:accmachado5@icloud.com"
              className="hover:text-white transition"
            >
              Email
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://github.com/acmachado48"
              target="_blank"
              className="hover:text-white transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
