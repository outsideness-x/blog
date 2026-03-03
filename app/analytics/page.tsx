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
      <h1 className="text-3xl font-bold font-mono text-primary mb-8">/analytics</h1>
      
      {publishedProjects.length === 0 ? (
        <MaterialPending section="/analytics" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-800 text-zinc-500 font-mono uppercase">
              <tr>
                <th className="pb-4">Project</th>
                <th className="pb-4">Chain</th>
                <th className="pb-4">Tags</th>
                <th className="pb-4 text-right">Action</th>
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
                      View Data
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
