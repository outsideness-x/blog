import type { Metadata } from "next";
import Link from "next/link";
import { MaterialPending } from "@/components/material-pending";
import { getPublishedAnalyticsProjects } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Crypto project analytics snapshots and links.",
  alternates: { canonical: "/analytics" },
};

export default function AnalyticsPage() {
  const publishedProjects = getPublishedAnalyticsProjects();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-mono text-white mb-8">/analytics</h1>
      
      {publishedProjects.length === 0 ? (
        <MaterialPending section="/analytics" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-800 text-zinc-500 font-mono uppercase">
              <tr>
                <th className="pb-4">
                  <span className="lang-ru" lang="ru">Проект</span>
                  <span className="lang-en" lang="en">Project</span>
                </th>
                <th className="pb-4">
                  <span className="lang-ru" lang="ru">Сеть</span>
                  <span className="lang-en" lang="en">Chain</span>
                </th>
                <th className="pb-4">
                  <span className="lang-ru" lang="ru">Теги</span>
                  <span className="lang-en" lang="en">Tags</span>
                </th>
                <th className="pb-4 text-right">
                  <span className="lang-ru" lang="ru">Действие</span>
                  <span className="lang-en" lang="en">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {publishedProjects.map((p) => (
                <tr key={p.slug} className="group hover:bg-zinc-900/50 transition-colors">
                  <td className="py-4 font-bold text-zinc-200">{p.name}</td>
                  <td className="py-4 text-zinc-400">{p.chain}</td>
                  <td className="py-4 text-zinc-500">{p.tags.join(", ")}</td>
                  <td className="py-4 text-right">
                    <Link href={`/analytics/${p.slug}`} className="text-primary hover:underline">
                      <span className="lang-ru" lang="ru">Данные</span>
                      <span className="lang-en" lang="en">View Data</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
