import CursorZone from '../ui/CursorZone'
import Reveal from '../ui/Reveal'
import { BLOG } from '../../data/content'
import { ARTICLES, formatDate } from '../../lib/journal'

const hueOf = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7)

/** Cover: the article's own image, or a generated gradient cover (no stock art). */
function Cover({ article, className, featured }) {
  const hue = hueOf(article.slug)
  return (
    <div className={`relative overflow-hidden rounded-[1.25rem] transition-transform duration-700 ease-flip group-hover:scale-[.985] md:rounded-[1.67rem] ${className}`}>
      {article.cover ? (
        <img src={article.cover} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 22%), #101010 70%)` }}
          />
          <span aria-hidden className="absolute -right-[20%] -top-[25%] aspect-square w-[75%] rounded-full" style={{ background: `radial-gradient(circle, hsl(${hue} 90% 60% / .45), transparent 65%)` }} />
          <span aria-hidden className="absolute -bottom-[30%] -left-[15%] aspect-square w-[70%] rounded-full" style={{ background: 'radial-gradient(circle, #ff6a3d40, transparent 65%)' }} />
          <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
          <span className={`absolute left-[1.5rem] top-[1.5rem] rounded-full border border-white/20 bg-black/40 px-[1rem] py-[.5rem] leading-none text-white backdrop-blur ${featured ? 'text-[1rem] md:text-[1.25rem]' : 'text-[.875rem] md:text-[1.05rem]'}`}>
            {article.category || 'Journal'}
          </span>
        </>
      )}
    </div>
  )
}

function Card({ article, featured = false, delay = 0 }) {
  const Tag = article.href ? 'a' : 'div'
  const linkProps = article.href ? { href: article.href, ...(article.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}) } : {}
  const size = featured
    ? 'h-[21.75rem] w-full md:h-[41.6667rem] md:w-[39.7222rem]'
    : 'h-[21.75rem] w-full md:h-[23.5rem] md:w-[25rem]'
  return (
    <Reveal delay={delay} y={50} className="flex-none">
      <Tag {...linkProps} className="group flex flex-col gap-[2rem] md:gap-[3rem]">
        <Cover article={article} className={size} featured={featured} />
        <div className={`flex flex-col gap-[.8rem] ${featured ? 'md:max-w-[33.8rem]' : 'md:max-w-[22.7rem]'}`}>
          <div className="text-[.875rem] leading-none text-neutral-500 md:text-[1.05rem]">
            {[article.category, formatDate(article.date)].filter(Boolean).join(' · ')}
          </div>
          <div className="text-[1.125rem] leading-[125%] text-white transition-colors duration-300 group-hover:text-neutral-300 md:text-[1.66667rem]">
            {article.title}
          </div>
          {featured && article.summary ? (
            <p className="text-[1rem] leading-[145%] text-neutral-500 md:text-[1.2rem]">{article.summary}</p>
          ) : null}
        </div>
      </Tag>
    </Reveal>
  )
}

export default function Blog() {
  if (!ARTICLES.length) return null
  // the pinned article (or the newest) takes the big slot; the rest follow, newest first
  const featured = ARTICLES.find((a) => a.featured) || ARTICLES[0]
  const rest = ARTICLES.filter((a) => a !== featured)
  const side = rest.slice(0, 2)
  const more = rest.slice(2)
  const anyLink = ARTICLES.some((a) => a.href)
  const Wrap = anyLink ? CursorZone : 'div'
  const wrapProps = anyLink ? { label: 'Read', sub: 'article', variant: 'violet' } : {}

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-ink px-[1.25rem] pb-[5rem] pt-[2.25rem] md:-mt-[5rem] md:px-0 md:pb-[11rem] md:pt-[16rem]"
    >
      <div className="relative mx-auto md:max-w-[95rem]">
        <Reveal>
          <h2 className="mx-auto max-w-[55rem] pt-[1rem] text-center text-[2.625rem] font-bold leading-none text-white md:text-[4.44rem]">
            {BLOG.title}
          </h2>
        </Reveal>

        <Wrap {...wrapProps} className="mt-[4rem] md:mt-[5.56rem]">
          <div className="flex flex-col justify-center gap-[3rem] md:flex-row md:gap-[1.25rem]">
            <Card article={featured} featured />
            {side.length ? (
              <div className="flex flex-col gap-[3rem] md:flex-row md:gap-[1.25rem]">
                {side.map((a, i) => (
                  <Card key={a.slug} article={a} delay={0.1 * (i + 1)} />
                ))}
              </div>
            ) : null}
          </div>
          {more.length ? (
            <div className="mt-[3rem] flex flex-col gap-[3rem] md:mt-[5rem] md:flex-row md:flex-wrap md:justify-center md:gap-[1.25rem] md:gap-y-[4rem]">
              {more.map((a, i) => (
                <Card key={a.slug} article={a} delay={0.05 * (i % 3)} />
              ))}
            </div>
          ) : null}
        </Wrap>
      </div>
    </section>
  )
}
