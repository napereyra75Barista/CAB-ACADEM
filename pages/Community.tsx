
import React from 'react';
import { FORUM_POSTS } from '../constants';
import { ThumbsUp, MessageCircle, TrendingUp, Search, PlusCircle, CheckCircle2, Pin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Heading, Text } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';

const POSTS_PER_PAGE = 5;

export const Community: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeCategory, setActiveCategory] = React.useState('Todo');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredPosts = FORUM_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'Todo' || post.tag === activeCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <Heading as="h1" className="text-4xl md:text-5xl font-serif">Comunidad Barista</Heading>
          <Text className="text-lg">Comparte técnicas, resuelve dudas y conecta con expertos.</Text>
        </div>
        <button className="bg-coffee-gold px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-coffee-goldLight transition-all shadow-xl shadow-coffee-gold/20 transform hover:-translate-y-1 active:translate-y-0">
          <PlusCircle size={20} /> Crear Debate
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <aside className="space-y-10 lg:sticky lg:top-12 h-fit">
           <div className="space-y-5">
             <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2">TEMAS</h3>
             <nav className="flex flex-wrap lg:flex-col gap-2">
               {['Todo', 'Técnica', 'Equipamiento', 'Granos', 'Negocios'].map(cat => (
                 <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-3 text-left rounded-xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-coffee-gold/10 text-coffee-gold border border-coffee-gold/20' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'}`}
                 >
                   {cat}
                 </button>
               ))}
             </nav>
           </div>

           <div className="glass-card p-8 rounded-[2rem] space-y-6 border border-white/5">
              <h3 className="font-bold text-white flex items-center gap-3"><TrendingUp size={20} className="text-coffee-gold" /> Tendencias</h3>
              <div className="space-y-4">
                {['#LatteArtThrowdown', '#WBC2024', '#SpecialtyCoffee'].map(tag => (
                  <div key={tag} className="text-sm text-gray-500 hover:text-coffee-gold cursor-pointer transition-colors font-medium">{tag}</div>
                ))}
              </div>
           </div>
        </aside>

        {/* Feed */}
        <div className="lg:col-span-3 space-y-8">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
            <input 
              type="text" 
              placeholder="Buscar discusiones o preguntas frecuentes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-coffee-dark border border-white/5 rounded-3xl pl-14 pr-6 py-5 focus:outline-none focus:border-coffee-gold/50 transition-all text-white placeholder:text-gray-600 shadow-xl"
            />
          </div>

          <div className="space-y-6">
            {currentPosts.length > 0 ? (
              currentPosts.map(post => (
                <div key={post.id} className="glass-card p-8 rounded-[2.5rem] hover:border-white/10 transition-all group cursor-pointer border border-white/5 relative overflow-hidden">
                  {post.isSolved && (
                    <div className="absolute top-0 right-0 bg-green-500/10 text-green-500 px-6 py-2 rounded-bl-3xl text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                      <CheckCircle2 size={12} /> Resuelto
                    </div>
                  )}
                  
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-coffee-gold/10 flex items-center justify-center font-bold text-coffee-gold border border-coffee-gold/20">
                      {post.author[0]}
                    </div>
                    <div>
                      <div className="font-bold text-white flex items-center gap-3">
                        {post.author} 
                        {post.role === 'Expert Instructor' && <Badge variant="gold" className="px-2 py-0">STAFF</Badge>}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{post.time}</div>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="outline">{post.tag}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <h3 className="text-2xl font-bold text-white group-hover:text-coffee-gold transition-colors flex items-center gap-3">
                      {post.isPinned && <Pin size={18} className="text-coffee-gold rotate-45" />}
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed line-clamp-2">{post.content}</p>
                  </div>

                  <div className="flex items-center gap-8 text-gray-500 text-sm pt-6 border-t border-white/5">
                    <button className="flex items-center gap-2.5 hover:text-white transition-all font-bold">
                      <ThumbsUp size={18} /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2.5 hover:text-white transition-all font-bold">
                      <MessageCircle size={18} /> {post.replies} respuestas
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 glass-card rounded-[2.5rem] border-dashed border-white/10">
                <Search size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">No se encontraron debates en esta categoría.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls - Refined Visuals */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="flex items-center gap-2 sm:gap-4 p-2 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm">
                <button 
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Anterior"
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <ChevronLeft size={22} />
                </button>
                
                <div className="flex items-center gap-1 sm:gap-2 px-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = currentPage === pageNum;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`min-w-[48px] h-12 rounded-2xl font-bold text-sm transition-all duration-300 relative group ${
                          isActive 
                          ? 'bg-coffee-gold text-white shadow-[0_0_25px_rgba(197,160,89,0.3)] border border-coffee-gold/50' 
                          : 'bg-transparent border border-transparent text-gray-500 hover:text-gray-200 hover:bg-white/5'
                        }`}
                      >
                        {pageNum}
                        {isActive && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Siguiente"
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
              
              <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                Página <span className="text-coffee-gold">{currentPage}</span> de <span className="text-gray-400">{totalPages}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
