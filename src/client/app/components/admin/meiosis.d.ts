declare module 'meiosis-tracer' {
  interface TracerConfig {
    selector?: string;
    streams: flyd.Stream<any>[];
  }

  function meiosisTracer(config: TracerConfig): void;

  export default meiosisTracer;
}
