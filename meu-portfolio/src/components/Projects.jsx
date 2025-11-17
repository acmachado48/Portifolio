import { useState, useEffect } from 'react';
import { FaGithub, FaLock, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [language, setLanguage] = useState('pt');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Novo estado para erro

  useEffect(() => {
    fetch('http://localhost:3001/api/projects')
      .then(async (res) => {
        if (!res.ok) throw new Error('Erro na resposta do servidor');
        return res.json();
      })
      .then((data) => {
        // Proteção: Se o servidor não devolver uma lista (array), lança erro
        if (!Array.isArray(data)) {
          throw new Error('Formato de dados inválido recebido do servidor');
        }

        const parsedData = data.map((project) => ({
          ...project,
          technologies:
            typeof project.technologies === 'string'
              ? JSON.parse(project.technologies)
              : project.technologies,
          media_url:
            typeof project.media_url === 'string'
              ? JSON.parse(project.media_url)
              : project.media_url,
          description:
            typeof project.description === 'string'
              ? JSON.parse(project.description)
              : project.description,
        }));
        setProjects(parsedData);
        setError(null);
      })
      .catch((err) => {
        console.error('Erro detalhado:', err);
        setError(
          'Não foi possível carregar os projetos. Verifique se o servidor está rodando.'
        );
      })
      .finally(() => {
        setLoading(false); // Garante que o loading some, mesmo com erro
      });
  }, []);

  return (
    <section id="projetos" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            {language === 'pt' ? 'Projetos' : 'Projects'}
          </h2>
          <button
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="text-sm font-bold text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition"
          >
            {language === 'pt' ? 'Switch to EN 🇺🇸' : 'Mudar para PT 🇧🇷'}
          </button>
        </div>

        {/* Mostra Loading, Erro ou os Cards */}
        {loading && (
          <p className="text-center text-gray-500">Carregando projetos...</p>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
            <strong className="font-bold">Erro: </strong>
            <span className="block sm:inline">{error}</span>
            <p className="text-sm mt-2">
              Dica: Verifique se o terminal do servidor (node index.js) está
              aberto.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhum projeto encontrado no banco de dados.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* ... (O restante do card permanece igual ao seu código anterior) ... */}
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                {project.media_type === 'video' ? (
                  <video
                    src={project.media_url?.[0]}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={project.media_url?.[0]}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {project.is_github_private === 1 && (
                  <div className="absolute top-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <FaLock size={10} /> Privado
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {project.name}
                  </h3>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded uppercase font-bold text-slate-500">
                    {project.category}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-4 flex-1">
                  {project.description ? project.description[language] : ''}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies &&
                    project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
                <div className="border-t border-slate-100 pt-4 flex gap-4">
                  {project.is_github_private === 0 ? (
                    <a
                      href={project.github_link}
                      target="_blank"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition"
                    >
                      <FaGithub /> Code
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-medium text-slate-300 cursor-not-allowed">
                      <FaGithub /> Private
                    </span>
                  )}
                  {project.test_link && (
                    <a
                      href={project.test_link}
                      target="_blank"
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                    >
                      <FaExternalLinkAlt size={12} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
