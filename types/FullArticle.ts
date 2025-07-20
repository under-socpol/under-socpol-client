type FullArticle = {
  id: string;
  title: string;
  excerpt: string;
  content: {
    time: number;
    blocks: any[];
    version: string;
  };
  category_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
  };
};
