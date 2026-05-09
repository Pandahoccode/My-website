import { getProjectBySlug } from '@/lib/project';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectEmbedProps {
  slug: string;
}

/**
 * ProjectEmbed Component
 * 
 * A premium MDX component that fetches and renders a project card.
 * Designed to be embedded within blog posts to create a seamless connection between 
 * theoretical content and practical projects.
 */
export async function ProjectEmbed({ slug }: ProjectEmbedProps) {
  const locale = await getLocale();
  const project = getProjectBySlug(slug, locale);
  const t = await getTranslations('Projects');

  if (!project) {
    return (
      <div className="my-8 p-6 border-2 border-dashed border-red-500/30 rounded-2xl bg-red-500/5 text-red-500 font-mono text-sm flex items-center justify-center gap-3">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        Project not found: {slug}
      </div>
    );
  }

  const isData = project.meta.category?.toLowerCase().includes("data") || false;
  
  // Custom theme colors based on category
  const accentColor = isData ? "text-cyan-400" : "text-purple-400";
  const glowClass = isData ? "shadow-cyan-500/10 hover:shadow-cyan-500/30" : "shadow-purple-500/10 hover:shadow-purple-500/30";
  const borderClass = isData ? "hover:border-cyan-500/40" : "hover:border-purple-500/40";

  return (
    <div className="my-10 not-prose">
      <Link href={`/project/${project.slug}`} className="group block no-underline">
        <div className={`relative flex flex-col md:flex-row overflow-hidden glass-surface antigravity-card ${glowClass} ${borderClass}`}>
          
          {/* Visual Side */}
          <div className="relative h-44 md:h-auto md:w-[35%] overflow-hidden bg-slate-900/50">
            {project.meta.image ? (
              <Image
                src={project.meta.image}
                alt={project.meta.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${project.meta.color || 'from-slate-800 to-slate-900'} opacity-30 group-hover:opacity-50 transition-opacity duration-700`} />
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            
            {/* Category Badge on Image (Mobile) */}
            <div className="absolute top-4 left-4 z-10 md:hidden">
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${isData ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' : 'border-purple-500/30 bg-purple-500/10 text-purple-400'}`}>
                {project.meta.category}
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="hidden md:flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${isData ? 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400' : 'border-purple-500/30 bg-purple-500/5 text-purple-400'}`}>
                  {project.meta.category}
                </span>
                <ExternalLink className="w-4 h-4 text-foreground/20 group-hover:text-foreground/60 transition-colors" />
              </div>
              
              <h3 className="text-2xl font-black font-outfit text-foreground mb-3 group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                {project.meta.title}
              </h3>
              
              <p className="text-sm md:text-base text-foreground/60 line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed">
                {project.meta.excerpt}
              </p>
            </div>
            
            <div className={`flex items-center gap-2 text-sm font-bold ${accentColor} transition-all duration-300 group-hover:gap-4`}>
              {t('readCaseStudy')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Background Decorative Element */}
          <div className={`absolute -right-12 -bottom-12 w-48 h-48 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none ${isData ? 'bg-cyan-500' : 'bg-purple-500'}`} />
        </div>
      </Link>
    </div>
  );
}
