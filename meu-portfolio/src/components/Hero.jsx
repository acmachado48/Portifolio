import { user } from '../data/user';

export default function Hero() {
  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Coluna de Texto */}
          <div className="md:w-3/5 space-y-6">
            <span className="inline-block bg-blue-100 text-primary font-semibold text-sm px-4 py-1 rounded-full tracking-wide uppercase">
              {user.role}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Olá, eu sou a <br />
              <span className="text-primary">
                {user.name.split(' ')[0]} {user.name.split(' ')[1]}
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              {user.about}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
              >
                LinkedIn
              </a>
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-slate-700 border border-slate-200 font-medium rounded-lg hover:bg-slate-50 transition hover:border-slate-300"
              >
                GitHub
              </a>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-3 uppercase tracking-wider font-bold">
                Habilidades Principais
              </p>
              <div className="flex flex-wrap gap-2">
                {user.skills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna da Imagem/Avatar */}
          <div className="md:w-2/5 flex justify-center md:justify-end">
            <div className="w-72 h-72 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl rotate-3 shadow-2xl flex items-center justify-center transform transition hover:rotate-0 duration-500">
              <span className="text-8xl font-bold text-white opacity-80">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
