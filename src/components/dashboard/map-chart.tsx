import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_southKoreaLow from "@amcharts/amcharts5-geodata/southKoreaLow";
import { useLayoutEffect, useRef } from "react";
import ChartReasoningTooltip from "@/components/chart-reasoning-tooltip";
import { REGION_CODE_MAP, REGION_NAME_MAP } from "@/constants/region-map";
import type { ChartDataPoint } from "@/types/dashboard_result";

interface MapChartProps {
  data: ChartDataPoint[];
  title?: string;
  reasoning?: string | null;
}

export default function MapChartComponent({
  data,
  title,
  reasoning,
}: MapChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    // Create polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_southKoreaLow,
        valueField: "value",
        calculateAggregates: true,
      })
    );

    polygonSeries.mapPolygons.template.adapters.add(
      "tooltipText",
      (_text, target) => {
        const dataContext = target.dataItem?.dataContext as unknown as {
          id?: string;
          name?: string;
          value?: number;
        };
        const id = dataContext?.id;
        const value = dataContext?.value;
        const name = id
          ? REGION_NAME_MAP[id] || dataContext?.name || id
          : dataContext?.name || "";
        return value !== undefined ? `${name}: ${value}` : name;
      }
    );

    polygonSeries.mapPolygons.template.setAll({
      interactive: true,
      fill: am5.color(0xf5f4fe),
      strokeWidth: 0.5,
      stroke: am5.color(0xffffff),
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x8569e4),
    });

    // Set up heat rules
    polygonSeries.set("heatRules", [
      {
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color(0xedebfc),
        max: am5.color(0x764ed9),
        key: "fill",
      },
    ]);

    // Prepare data with region IDs
    const chartData = data.map((item) => {
      const isAlreadyCode = item.id?.startsWith("KR-");

      let regionCode: string | null | undefined = item.id;
      if (!isAlreadyCode && item.id) {
        regionCode = REGION_CODE_MAP[item.id] || item.id;
      }

      if (!regionCode && item.category) {
        regionCode = REGION_CODE_MAP[item.category] || item.category;
      }

      return {
        id: regionCode,
        name:
          item.name || (regionCode ? REGION_NAME_MAP[regionCode] : undefined),
        value: item.value,
      };
    });

    polygonSeries.data.setAll(chartData);

    // Add zoom control
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

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
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <div className="h-[350px] w-[350px] rounded-full bg-tertiary-300 opacity-50 blur-3xl" />
        </div>
        <div
          ref={chartRef}
          className="relative z-10"
          style={{ width: "100%", height: "500px" }}
        />
      </div>
    </div>
  );
}
