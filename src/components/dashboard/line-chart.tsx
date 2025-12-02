import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useLayoutEffect, useRef } from "react";
import ChartReasoningTooltip from "@/components/chart-reasoning-tooltip";
import { CHART_COLORS } from "@/constants/chart-colors";
import { processChartCategory } from "@/utils/text";

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  title?: string;
  reasoning?: string | null;
  xAxisTitle?: string;
  yAxisTitle?: string;
}

export default function LineChartComponent({
  data,
  title,
  reasoning,
  xAxisTitle,
  yAxisTitle,
}: LineChartProps) {
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
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        paddingLeft: 0,
      })
    );

    // Add cursor
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    });

    xRenderer.labels.template.setAll({
      rotation: -45,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
      fontSize: 12,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(
      data.map((item) => ({
        category: processChartCategory(item.label),
      }))
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{categoryX}: {valueY}",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(CHART_COLORS[6]), // "#3094eb"
    });

    series.fills.template.setAll({
      fillOpacity: 0.3,
      visible: true,
    });

    // Add circle bullet
    series.bullets.push(() => {
      const circle = am5.Circle.new(root, {
        radius: 4,
        fill: am5.color(CHART_COLORS[6]), // "#3094eb"
        stroke: am5.color("#ffffff"),
        strokeWidth: 2,
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    // Set data
    const chartData = data.map((item) => ({
      category: processChartCategory(item.label),
      value: item.value,
    }));

    series.data.setAll(chartData);

    // Add axis titles if provided
    if (xAxisTitle) {
      xAxis.children.push(
        am5.Label.new(root, {
          text: xAxisTitle,
          x: am5.p50,
          centerX: am5.p50,
          paddingTop: 10,
          fontSize: 14,
          fontWeight: "500",
        })
      );
    }

    if (yAxisTitle) {
      yAxis.children.unshift(
        am5.Label.new(root, {
          text: yAxisTitle,
          y: am5.p50,
          centerX: am5.p50,
          rotation: -90,
          fontSize: 14,
          fontWeight: "500",
        })
      );
    }

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data, xAxisTitle, yAxisTitle]);

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {reasoning && <ChartReasoningTooltip reasoning={reasoning} />}
      {title && (
        <h3 className="mb-4 text-center text-gray-950 text-h5">{title}</h3>
      )}
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}
