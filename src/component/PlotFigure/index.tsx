import * as Plot from "@observablehq/plot";
import { Space } from "antd";
import { useEffect, useRef } from "react";

interface IProps {
  options?: Plot.PlotOptions | undefined
}
export default function PlotFigure({ options }: IProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (options == null) return;
    const plot = Plot.plot(options);
    if (containerRef.current) {
      containerRef.current.append(plot);
    }
    return () => plot.remove();
  }, [options]);

  return <Space ref={containerRef}></Space>;
}