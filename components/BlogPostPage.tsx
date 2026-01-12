
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, Heart } from 'lucide-react';
import { BLOG_POSTS } from '../services/blogData';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const postIndex = BLOG_POSTS.findIndex(p => p.slug === slug);
  const post = BLOG_POSTS[postIndex];

  // BLOG_POSTS is sorted Newest (index 0) to Oldest.
  // Next Day (Chronological Future) is index - 1 (e.g. going from Day 1 to Day 2).
  const nextPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  // Previous Day (Chronological Past) is index + 1 (e.g. going from Day 2 to Day 1).
  const prevPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  // Like State
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // Initialize data and like status
  useEffect(() => {
    // Scroll to top immediately when slug changes (new post loaded)
    window.scrollTo(0, 0);

    if (post) {
      // Check local storage for like status
      const storageKey = `cift_like_${post.id}`;
      const userLiked = localStorage.getItem(storageKey) === 'true';
      setHasLiked(userLiked);
      
      // Set initial likes (base from data + 1 if user liked locally)
      // This ensures the count increments visually for the user who liked it
      setLikes(post.likes + (userLiked ? 1 : 0));
    }
  }, [post, slug]);

  const toggleLike = () => {
      if (!post) return;
      
      const storageKey = `cift_like_${post.id}`;
      
      if (hasLiked) {
          setLikes(prev => prev - 1);
          setHasLiked(false);
          localStorage.removeItem(storageKey);
      } else {
          setLikes(prev => prev + 1);
          setHasLiked(true);
          localStorage.setItem(storageKey, 'true');
      }
  };

  // Handle Dynamic SEO (Title, Meta Description, Open Graph, Twitter)
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | CIFCI TOTO`;
      
      const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
         let element = document.querySelector(`meta[${attr}="${name}"]`);
         if (!element) {
           element = document.createElement('meta');
           element.setAttribute(attr, name);
           document.head.appendChild(element);
         }
         element.setAttribute('content', content);
      };

      // Standard
      updateMeta('description', post.excerpt);

      // Open Graph
      updateMeta('og:type', 'article', 'property');
      updateMeta('og:url', window.location.href, 'property');
      updateMeta('og:title', post.title, 'property');
      updateMeta('og:description', post.excerpt, 'property');
      if (post.imageUrl) {
        updateMeta('og:image', post.imageUrl, 'property');
      }

      // Twitter
      updateMeta('twitter:card', 'summary_large_image');
      updateMeta('twitter:title', post.title);
      updateMeta('twitter:description', post.excerpt);
      if (post.imageUrl) {
        updateMeta('twitter:image', post.imageUrl);
      }
    } else {
      document.title = 'Story Not Found | CIFCI TOTO';
    }

    // Cleanup: Reset title when unmounting this component
    return () => {
      document.title = 'CIFCI TOTO | Solana Tycoon';
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center justify-center animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-4">Story not found</h2>
        <button onClick={() => navigate('/blog')} className="text-gold-400 hover:text-white underline">Back to Chronicles</button>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this story from CIFCI TOTO: ${post.title}`;

  return (
    <div className="min-h-screen pt-24 pb-12 px-[5px] md:px-6 animate-fade-in-up">
      <div className="mx-auto max-w-4xl">
        <div className="px-1 md:px-0">
            <button 
                onClick={() => navigate('/blog')}
                className="group flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-sm tracking-wide">BACK TO CHRONICLES</span>
            </button>
        </div>

        <article className="bg-navy-900/50 rounded-2xl md:rounded-3xl border border-gold-500/20 shadow-2xl overflow-hidden">
             {/* Hero Image */}
             <div className="h-[400px] sm:h-96 w-full relative">
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <span className="inline-block px-3 py-1 bg-gold-500 text-navy-900 text-xs font-bold rounded-full mb-4 shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                        {post.category}
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                        {post.title}
                    </h1>
                     <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gold-500" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gold-500" />
                            <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-gold-500" />
                            <span>By CIFCI TOTO</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-0 md:p-12">
                 <div 
                    className="w-full text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                >
                </div>

                {/* Like & Share Section */}
                <div className="mt-12 pt-8 border-t border-white/5 px-4 md:px-0">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        
                        {/* Like Button */}
                        <button 
                            onClick={toggleLike}
                            className={`group flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
                                hasLiked 
                                ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                                : 'bg-navy-800 border-white/10 text-gray-400 hover:border-red-500/50 hover:text-red-400 hover:bg-navy-700'
                            }`}
                        >
                            <div className={`transition-transform duration-300 ${hasLiked ? 'scale-110' : 'group-hover:scale-110'}`}>
                                <Heart size={24} fill={hasLiked ? "currentColor" : "none"} />
                            </div>
                            <span className="font-bold text-lg">{likes.toLocaleString()}</span>
                        </button>

                        <div className="flex items-center gap-4">
                            <span className="text-gold-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                <Share2 size={16} />
                                Share
                            </span>
                            
                            <div className="flex gap-3">
                                {/* X / Twitter */}
                                <a 
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-navy-800 border border-white/10 text-gray-400 hover:text-white hover:border-gold-500/50 hover:bg-navy-700 transition-all"
                                    aria-label="Share on X"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>

                                {/* Telegram */}
                                <a 
                                    href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-navy-800 border border-white/10 text-gray-400 hover:text-[#229ED9] hover:border-[#229ED9]/50 hover:bg-navy-700 transition-all"
                                    aria-label="Share on Telegram"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.27l-1.91 8.84c-.13.56-.44.73-.89.46l-2.48-1.83-1.2 1.16c-.13.13-.24.24-.49.24l.17-2.51 4.58-4.14c.2-.17-.04-.27-.31-.1l-5.67 3.57-2.44-.76c-.53-.17-.54-.53.11-.78l9.55-3.68c.44-.17.83.1.56.73z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="mt-8 pt-8 pb-8 md:pb-0 px-4 md:px-0 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Previous Day */}
                    <div className="flex justify-start">
                        {prevPost && (
                            <button 
                                onClick={() => navigate(`/blog/${prevPost.slug}`)}
                                className="group flex flex-col items-start gap-1 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all w-full sm:w-auto"
                            >
                                <div className="flex items-center gap-2 text-gray-500 group-hover:text-gold-400 transition-colors text-xs font-bold uppercase tracking-wider">
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Previous Day
                                </div>
                                <div className="text-white font-bold text-lg leading-tight group-hover:text-gold-100 line-clamp-1">
                                    {prevPost.title}
                                </div>
                            </button>
                        )}
                    </div>

                    {/* Next Day */}
                    <div className="flex justify-end">
                        {nextPost && (
                            <button 
                                onClick={() => navigate(`/blog/${nextPost.slug}`)}
                                className="group flex flex-col items-end gap-1 p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 hover:bg-gold-500/20 hover:border-gold-500/40 transition-all w-full sm:w-auto text-right"
                            >
                                <div className="flex items-center gap-2 text-gold-400 group-hover:text-gold-300 transition-colors text-xs font-bold uppercase tracking-wider">
                                    Next Day <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                                <div className="text-white font-bold text-lg leading-tight group-hover:text-white line-clamp-1">
                                    {nextPost.title}
                                </div>
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;
