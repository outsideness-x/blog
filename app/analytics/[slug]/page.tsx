import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CryptoPrice } from "@/lib/types";
import { getPublishedAnalyticsProjects } from "@/lib/analytics";
import { isExternalHref, sanitizeHref } from "@/lib/security";
import { ArrowUpRight, AlertTriangle } from "lucide-react";

export const dynamicParams = false;

// fetch data with caching (revalidate every 60s)
async function getCryptoData(id: string): Promise<CryptoPrice | null> {
  try {
    const encodedId = encodeURIComponent(id);
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodedId}`,
      { next: { revalidate: 60 } }
    );
    
    if (!res.ok) throw new Error("API Error");
    
    const data = await res.json();
    if (!data || data.length === 0) return null;
    
    return {
      current_price: data[0].current_price,
      price_change_percentage_24h: data[0].price_change_percentage_24h,
      last_updated: data[0].last_updated,
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return getPublishedAnalyticsProjects().map((project) => ({ slug: project.slug }));
}

type AnalyticsPageProps = {
  params: { slug: string };
};

function getAnalyticsProjectBySlug(slug: string) {
  return getPublishedAnalyticsProjects().find((project) => project.slug === slug) ?? null;
}

export async function generateMetadata({ params }: AnalyticsPageProps): Promise<Metadata> {
  const project = getAnalyticsProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: `${project.name} Analytics`,
    description: project.description,
    alternates: {
      canonical: `/analytics/${project.slug}`,
    },
  };
}

export default async function AnalyticsProjectPage({ params }: AnalyticsPageProps) {
  const project = getAnalyticsProjectBySlug(params.slug);
  if (!project) notFound();

  const marketData = project.dataSources.coingeckoId 
    ? await getCryptoData(project.dataSources.coingeckoId) 
    : null;

  return (
    <div className="space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-4xl font-bold font-sans text-zinc-50 mb-2">{project.name}</h1>
        <p className="text-zinc-400">{project.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded-lg bg-zinc-900/30">
          <h3 className="text-zinc-500 font-mono text-sm mb-2">
            <span className="lang-ru" lang="ru">Текущая цена (USD)</span>
            <span className="lang-en" lang="en">Live Price (USD)</span>
          </h3>
          {marketData ? (
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-zinc-100">
                ${marketData.current_price.toLocaleString()}
              </span>
              <span className={marketData.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
                {marketData.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-yellow-500">
              <AlertTriangle size={18} />
              <span className="lang-ru" lang="ru">Данные недоступны</span>
              <span className="lang-en" lang="en">Data unavailable</span>
            </div>
          )}
        </div>

        <div className="p-6 border border-border rounded-lg bg-zinc-900/30">
          <h3 className="text-zinc-500 font-mono text-sm mb-2">
            <span className="lang-ru" lang="ru">Ссылки</span>
            <span className="lang-en" lang="en">Links</span>
          </h3>
          <div className="flex flex-col gap-2">
            {Object.entries(project.links).map(([key, url]) => {
              const safeUrl = sanitizeHref(url);
              if (!isExternalHref(safeUrl)) return null;

              return (
                <a
                  key={key}
                  href={safeUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-2 text-primary hover:underline capitalize"
                >
                  {key} <ArrowUpRight size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      {marketData && (
        <p className="text-xs text-zinc-600 font-mono mt-4">
          <span className="lang-ru" lang="ru">Обновлено: </span>
          <span className="lang-en" lang="en">Last updated: </span>
          {new Date(marketData.last_updated).toLocaleString()}
        </p>
      )}
    </div>
  );
}
