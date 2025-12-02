import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useRef } from "react";
import ChartReasoningTooltip from "@/components/chart-reasoning-tooltip";
import { CHART_COLORS } from "@/constants/chart-colors";
import type { ChartDataPoint } from "@/types/dashboard_result";
import { processChartCategory } from "@/utils/text";

interface DonutChartProps {
  data: ChartDataPoint[];
  title?: string;
  reasoning?: string | null;
}

export default function DonutChartComponent({
  data,
  title,
  reasoning,
}: DonutChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    series.get("colors")?.set(
      "colors",
      CHART_COLORS.map((color) => am5.color(color))
    );

    series.labels.template.setAll({
      textType: "circular",
      centerX: 0,
      centerY: 0,
      fontSize: 12,
      fill: am5.color(0x000000),
      text: "{valuePercentTotal.formatNumber('0.0')}%",
    });

    series.ticks.template.setAll({
      strokeOpacity: 0.5,
      strokeWidth: 1,
    });

    series.slices.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(0xffffff),
    });

    // Process data
    const MAX_ITEMS = 5;
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    let processedData: { category: string; value: number }[];
    if (sortedData.length > MAX_ITEMS) {
      const topItems = sortedData.slice(0, MAX_ITEMS);
      const othersSum = sortedData
        .slice(MAX_ITEMS)
        .reduce((sum, item) => sum + item.value, 0);

      processedData = [
        ...topItems.map((item) => ({
          category: processChartCategory(item.category || "Unknown"),
          value: item.value,
        })),
        {
          category: "기타",
          value: othersSum,
        },
      ];
    } else {
      processedData = sortedData.map((item) => ({
        category: processChartCategory(item.category || "Unknown"),
        value: item.value,
      }));
    }

    series.data.setAll(processedData);

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {reasoning && <ChartReasoningTooltip reasoning={reasoning} />}
      {title && (
        <h3 className="mb-2 text-center text-gray-950 text-h5">{title}</h3>
      )}
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}
