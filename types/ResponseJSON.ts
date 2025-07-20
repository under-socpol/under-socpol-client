type ResponseJSON = {
  status_code: number;
  message: string;
  data?: any;
  pagination?: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
};
