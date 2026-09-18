// Adapted from 21st.dev "Finance Chart" (component id 2334).
// The chart keeps the original interactive tooltip pattern and uses Cepte Sarraf's gold data.
import React, { useCallback, useMemo } from 'react';
import { AreaClosed, Bar, Line } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { GridColumns, GridRows } from '@visx/grid';
import { scaleLinear, scaleTime } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { localPoint } from '@visx/event';
import { Tooltip, TooltipWithBounds, defaultStyles, withTooltip } from '@visx/tooltip';
import type { WithTooltipProvidedProps } from '@visx/tooltip';

export type ChartPoint = {
  date: Date;
  close: number;
};

type ChartProps = {
  width: number;
  height: number;
  data: ChartPoint[];
  margin?: { top: number; right: number; bottom: number; left: number };
};

const gold = 'var(--market-gold)';
const goldSoft = 'var(--market-gold-soft)';
const background = 'var(--market-surface)';
const background2 = 'var(--market-bg)';
const tooltipStyles = {
  ...defaultStyles,
  background: 'var(--market-surface)',
  border: '1px solid var(--market-gold)',
  color: 'var(--market-text)',
};

const formatDate = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short' });
const formatCurrency = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0,
});

const FinanceChartLogic = ({
  width,
  height,
  data,
  margin = { top: 18, right: 18, bottom: 28, left: 12 },
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
}: ChartProps & WithTooltipProvidedProps<ChartPoint>) => {
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const dates = useMemo(() => data.map((point) => point.date), [data]);
  const values = useMemo(() => data.map((point) => point.close), [data]);
  const minValue = Math.min(...values, 0);
  const maxValue = Math.max(...values, 1);

  const dateScale = useMemo(
    () => scaleTime({
      range: [margin.left, innerWidth + margin.left],
      domain: [dates[0] || new Date(), dates[dates.length - 1] || new Date()],
    }),
    [dates, innerWidth, margin.left],
  );
  const valueScale = useMemo(
    () => scaleLinear({
      range: [innerHeight + margin.top, margin.top],
      domain: [minValue * 0.995, maxValue * 1.005],
      nice: true,
    }),
    [innerHeight, margin.top, minValue, maxValue],
  );

  const handleTooltip = useCallback((event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
    if (!data.length || innerWidth <= 0) return;
    const point = localPoint(event);
    if (!point) return;
    const ratio = Math.max(0, Math.min(1, (point.x - margin.left) / innerWidth));
    const index = Math.min(data.length - 1, Math.max(0, Math.round(ratio * (data.length - 1))));
    const selected = data[index];
    showTooltip({
      tooltipData: selected,
      tooltipLeft: dateScale(selected.date),
      tooltipTop: valueScale(selected.close),
    });
  }, [data, dateScale, innerWidth, margin.left, showTooltip, valueScale]);

  if (width < 10 || height < 10 || !data.length) return null;

  return (
    <div className="market-chart-shell">
      <svg width={width} height={height} role="img" aria-label="Gram altın örnek fiyat grafiği">
        <rect width={width} height={height} rx={18} fill="url(#gold-chart-background)" />
        <LinearGradient id="gold-chart-background" from={background} to={background2} />
        <LinearGradient id="gold-area" from={goldSoft} to={gold} fromOpacity={0.3} toOpacity={0.02} />
        <GridRows
          left={margin.left}
          scale={valueScale}
          width={innerWidth}
          stroke="rgba(255,255,255,.09)"
          strokeDasharray="3,5"
          pointerEvents="none"
        />
        <GridColumns
          top={margin.top}
          scale={dateScale}
          height={innerHeight}
          stroke="rgba(255,255,255,.06)"
          strokeDasharray="3,5"
          pointerEvents="none"
        />
        <AreaClosed<ChartPoint>
          data={data}
          x={(point) => dateScale(point.date) ?? 0}
          y={(point) => valueScale(point.close) ?? 0}
          yScale={valueScale}
          stroke={gold}
          strokeWidth={2}
          fill="url(#gold-area)"
          curve={curveMonotoneX}
        />
        <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={hideTooltip}
        />
        {tooltipData && (
          <g pointerEvents="none">
            <Line
              from={{ x: tooltipLeft, y: margin.top }}
              to={{ x: tooltipLeft, y: innerHeight + margin.top }}
              stroke={goldSoft}
              strokeWidth={1.5}
              strokeDasharray="5,3"
            />
            <circle cx={tooltipLeft} cy={tooltipTop} r={4} fill={gold} stroke="var(--market-text)" strokeWidth={2} />
          </g>
        )}
      </svg>
      {tooltipData && (
        <>
          <TooltipWithBounds top={tooltipTop - 12} left={tooltipLeft + 12} style={tooltipStyles}>
            <strong>{formatCurrency.format(tooltipData.close)}</strong>
          </TooltipWithBounds>
          <Tooltip
            top={height - 22}
            left={tooltipLeft}
            style={{ ...defaultStyles, minWidth: 72, textAlign: 'center', transform: 'translateX(-50%)' }}
          >
            {formatDate.format(tooltipData.date)}
          </Tooltip>
        </>
      )}
    </div>
  );
};

export const FinanceChart = withTooltip<ChartProps, ChartPoint>(FinanceChartLogic);
