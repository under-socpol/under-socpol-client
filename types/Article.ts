type Article = {
  id: string;
  title: string;
  excerpt: string;
  content?: Object;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  category_id: string;
  user_id: string;
  user: {
    id: string;
    name: string;
  };
};
