export type Frontmatter = {
    title: string;
    date: string;
    summary: string;
    tags?: string[];
    slug: string;
  };
  
  export type ProjectData = {
    slug: string;
    name: string;
    chain: string;
    tags: string[];
    links: {
      website?: string;
      github?: string;
      twitter?: string;
    };
    description: string;
    dataSources: {
      coingeckoId?: string;
    };
  };
  
  export type CryptoPrice = {
    current_price: number;
    price_change_percentage_24h: number;
    last_updated: string;
  };