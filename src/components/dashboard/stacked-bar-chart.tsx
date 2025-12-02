import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useLayoutEffect, useRef } from "react";
import ChartReasoningTooltip from "@/components/chart-reasoning-tooltip";
import type { ChartDataPoint } from "@/types/dashboard_result";
import { truncateBeforeParenthesis } from "@/utils/text";

interface StackedBarChartProps {
  data: ChartDataPoint[];
  title?: string;
  reasoning?: string | null;
}

export default function StackedBarChartComponent({
  data,
  title,
  reasoning,
}: StackedBarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );

    // Create Y-axis (categories - age groups)
    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true,
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
    });

    yRenderer.grid.template.setAll({
      location: 1,
    });

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
      })
    );

    const chartData = data.map((item) => ({
      category: truncateBeforeParenthesis(item.category || "Unknown"),
      male: -(item.male || 0), // negative for left side
      female: item.female || 0,
      male_max: item.male_max || 0,
      female_max: item.female_max || 0,
    }));

    yAxis.data.setAll(chartData);

    // Create X-axis (values)
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // Create male series (left side)
    const maleSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "남성",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "male",
        categoryYField: "category",
        sequencedInterpolation: true,
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "남성: {valueX}",
        }),
      })
    );

    maleSeries.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBR: 5,
      cornerRadiusTR: 5,
    });

    maleSeries.columns.template.setAll({
      fill: am5.color(0x4a90e2),
      stroke: am5.color(0x4a90e2),
    });

    maleSeries.data.setAll(chartData);

    // Create female series (right side)
    const femaleSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "여성",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "female",
        categoryYField: "category",
        sequencedInterpolation: true,
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "여성: {valueX}",
        }),
      })
    );

    femaleSeries.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBL: 5,
      cornerRadiusTL: 5,
    });

    femaleSeries.columns.template.setAll({
      fill: am5.color(0xe85d75),
      stroke: am5.color(0xe85d75),
    });

    femaleSeries.data.setAll(chartData);

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
      })
    );

    legend.data.setAll(chart.series.values);

    // Make stuff animate on load
    chart.appear(1000, 100);

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
      <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
}
