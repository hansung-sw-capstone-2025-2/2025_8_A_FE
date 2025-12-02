// Common chart data point structure
export interface ChartDataPoint {
  category: string | null;
  value: number;
  male: number | null;
  female: number | null;
  id: string | null;
  name: string | null;
  male_max: number | null;
  female_max: number | null;
}

// Chart configuration
export interface ChartConfig {
  metric: string;
  title: string;
  reasoning: string | null;
  data: ChartDataPoint[];
  chart_type:
    | "map"
    | "donut"
    | "pie"
    | "semi_circle_pie"
    | "column"
    | "stacked_bar"
    | "bar"
    | "line";
}

export interface DashboardResult {
  result: {
    summary: {
      total_respondents: number;
      average_age: number;
      data_capture_date: string;
      confidence_level: number;
    };
    search_id: number;
    applied_filters_summary: any[];
    main_chart: ChartConfig;
    sub_charts: ChartConfig[];
  };
  search_id: string;
  question: string;
}
