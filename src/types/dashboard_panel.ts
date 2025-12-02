export interface DashboardPanel {
  keys: [string];
  values: [
    {
      gender: string;
      age: string;
      residence: string;
      respondent_id: string;
      personal_income: string;
      concordance_rate: string;
      marital_status?: string;
      occupation?: string;
    },
  ];
  page_info: {
    offset: number;
    limit: number;
    current_page: number; // 현재 페이지
    current_page_count: number; // 현재 페이지의 데이터 수
    total_page_count: number; // 총 페이지 수
    total_count: number; // 총 데이터 수
    has_next: boolean; // 다음 페이지 존재 여부
    has_previous: boolean; // 이전 페이지 존재 여부
  };
}
