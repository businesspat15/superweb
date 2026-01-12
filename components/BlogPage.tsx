import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS, BlogPost } from '../services/blogData';

const ITEMS_PER_PAGE = 9;

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]); // Also scroll when page changes

  // Filter and Sort Logic
  const filteredAndSortedPosts = useMemo(() => {
    let posts = [...BLOG_POSTS];

    // Search Filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase().trim();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(lowerQuery) || 
        post.excerpt.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort (Oldest first)
    posts.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return posts;
  }, [searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedPosts.length / ITEMS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedPosts, currentPage]);

  const handleReadMore = (post: BlogPost) => {
      navigate(`/blog/${post.slug}`);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 animate-fade-in-up relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8 text-center">
            <div className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Official Chronicles</span>
            </div>
            <h1 className="font-serif text-5xl font-black text-white md:text-6xl mb-6">
                THE <span className="text-gold-400">STORY</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400">
                The Legendary Tales from the Desk of CIFCI TOTO. When Math Replaced Trust. A Story Secured by Proof.BLOCK BY BLOCK : THE CIFCI TOTO BITCOIN JOURNEY.
            </p>
        </div>

        {/* Search Bar Only */}
        <div className="mb-8 flex justify-center">
             <div className="relative w-full max-w-md bg-navy-800/50 p-2 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
                 <div className="relative w-full">
                    <input 
                        type="text" 
                        placeholder="Search stories..." 
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full bg-navy-900 border border-white/10 rounded-xl py-3 pl-12 pr-10 text-white text-base focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-gray-500"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    {searchQuery && (
                        <button 
                            onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Content Area */}
        {filteredAndSortedPosts.length === 0 ? (
            <div className="text-center py-24 bg-navy-800/30 rounded-3xl border border-white/5 border-dashed">
                <Search size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-white">No stories found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
                <button 
                    onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                    className="mt-6 text-gold-400 hover:text-gold-300 font-bold underline"
                >
                    Clear Search
                </button>
            </div>
        ) : (
            <>
                {/* Posts Grid - Book Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} onReadMore={handleReadMore} />
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8 py-4 border-t border-white/5">
                        <button 
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-800 text-gold-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-700 transition-colors"
                        >
                            <ChevronLeft size={20} /> Prev
                        </button>
                        
                        <span className="text-gray-400 font-serif">
                            Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
                        </span>

                        <button 
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-800 text-gold-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-700 transition-colors"
                        >
                            Next <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};

// Extracted Card Component for Reusability
const BlogPostCard: React.FC<{ post: BlogPost; onReadMore: (post: BlogPost) => void }> = ({ post, onReadMore }) => (
    <article className="bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-2 group shadow-lg flex flex-col h-full">
        <div 
            className="h-48 overflow-hidden relative shrink-0 cursor-pointer"
            onClick={() => onReadMore(post)}
        >
             <div className="absolute top-4 left-4 z-10">
                <span className="bg-navy-900/80 backdrop-blur text-gold-400 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/20 shadow-lg">
                    {post.category}
                </span>
             </div>
             <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
             />
        </div>
        <div className="p-6 space-y-4 flex flex-col flex-grow">
            <div className="flex items-center justify-between text-xs text-gray-500">
                 <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                 <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
            </div>
            <h3 
                className="font-serif text-xl font-bold text-white leading-tight group-hover:text-gold-400 transition-colors cursor-pointer"
                onClick={() => onReadMore(post)}
            >
                {post.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-3 flex-grow">
                {post.excerpt}
            </p>
            <div className="pt-4 border-t border-white/5 mt-auto">
                <button 
                    onClick={() => onReadMore(post)}
                    className="text-sm font-bold text-white hover:text-gold-400 transition-colors flex items-center gap-1 group-hover:gap-2"
                >
                    Read<ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
            </div>
        </div>
    </article>
);

export default BlogPage;