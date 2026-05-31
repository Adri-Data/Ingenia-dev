type PromptExample = {
  id: string;
  title: string;
  label: string;
  body: string;
};

const examplePrompts: PromptExample[] = [
  {
    id: "mixing-line",
    title: "Línea con dos productos y operador compartido",
    label: "Ejemplo 1",
    body: `Las piezas A llegan en pallets. Cada pallet contiene 10 unidades. Cada pallet llega siguiendo una distribución exponencial con un valor mínimo de 2 minutos y un valor máximo de 20 minutos. Las piezas B llegan cada 5 minutos.

Las piezas A se procesan en MachineA con un tiempo de proceso de 5 minutos. Las piezas B se procesan en MachineB, cuyo tiempo de servicio es de 10 minutos. Ambas máquinas son operadas por el mismo operario.

Después, ambas piezas se ensamblan, con un tiempo de ensamblaje de 3 minutos por unidad. Finalmente, se transportan mediante un AGV a expedición, lo que toma 5 minutos, y luego se expiden.

Simula 48 horas con 10 réplicas.

Quiero conocer el throughput y la ocupación del operario y del AGV.`
  },
  {
    id: "multi-stage-manufacturing",
    title: "Flujo multietapa con mantenimiento y re-trabajo",
    label: "Ejemplo 2",
    body: `Las piezas llegan una a una al sistema cada 1 minuto y primero se envían a un buffer de espera. Tras esperar 10 minutos, las piezas se transportan a la estación de procesamiento (tiempo de transporte: 2 minutos), donde cada pieza se procesa en una máquina única llamada Machine0101 con un tiempo de proceso de 4 minutos.

Después, las piezas se transportan a la estación de corte. La operación de corte dura 3 minutos, y el desperdicio generado se almacena por separado. Tras el corte, las piezas se transportan a la estación de fresado (tiempo de transporte: 2 minutos) y se fresan con tiempos que siguen una distribución normal con media de 5 minutos y desviación estándar de 1 minuto.

Luego, las piezas se transportan a la estación de empaquetado (tiempo de transporte: 1 minuto), donde el proceso de empaquetado dura 2 minutos. Las piezas empaquetadas se mueven a un área de espera (tiempo de transporte: 1 minuto) antes de ser desempaquetadas en la estación de desempaquetado, que tarda 2 minutos.

Después del desempaquetado, las piezas se transportan a la estación de ensamblaje (tiempo de transporte: 2 minutos) y se ensamblan en 5 minutos. Se ensamblan con piezas B, que llegan una a una cada 5 minutos y se enrutan directamente a la estación de ensamblaje (tiempo de transporte: 10 minutos).

Finalmente, las piezas van a una estación de inspección, donde la inspección dura 2 minutos. El 50% de las piezas inspeccionadas se rechaza y se descarta, mientras que el 50% restante se almacena como producto terminado.

La industria solo opera de 8:00 a 21:00. Hay una parada de mantenimiento planificada para Machine0101 de 15 minutos cada día.

Simula 24 horas, solo una vez.

Quiero conocer el throughput y dónde está mi cuello de botella.`
  },
  {
    id: "pump-repair",
    title: "Taller de reparación de bombas centrífugas",
    label: "Ejemplo 3",
    body: `Las bombas centrífugas de un área de mantenimiento de refinería llegan a un flujo de reparación tras ser retiradas del servicio por alarmas de vibración, fugas en sellos, alarmas de temperatura en rodamientos o requisitos de overhaul programado.

Las solicitudes de reparación llegan siguiendo una distribución exponencial con un tiempo medio entre llegadas de 4 horas. Cada solicitud representa una bomba centrífuga.
Cuando llega una bomba, primero espera en un buffer de recepción. Luego, un técnico de confiabilidad realiza una inspección y diagnóstico inicial. El tiempo de diagnóstico sigue una distribución triangular con mínimo de 4 horas, valor más probable de 6 horas y máximo de 8 horas. Hay dos técnicos de confiabilidad disponibles.

Después del diagnóstico, las bombas se clasifican en tres categorías:
- 50% requieren reparación menor.
- 35% requieren reparación mayor.
- 15% requieren reparación con proveedor externo.

Las reparaciones menores se enrutan al taller mecánico. El tiempo de reparación menor sigue una distribución triangular con mínimo de 24 horas, valor más probable de 40 horas y máximo de 56 horas. Las reparaciones menores requieren un mecánico y un banco de reparación.

Las reparaciones mayores también se enrutan al taller mecánico. El tiempo de reparación mayor sigue una distribución triangular con mínimo de 40 horas, valor más probable de 60 horas y máximo de 80 horas. Las reparaciones mayores requieren dos mecánicos y un banco de reparación.

Las reparaciones externas requieren preparación y envío. El tiempo de preparación es de 2 horas y requiere un técnico. El lead time externo sigue una distribución normal con media de 80 horas y desviación estándar de 20 horas. Cuando la bomba vuelve del proveedor, pasa a inspección final.

El taller mecánico tiene:
- 3 mecánicos.
- 2 bancos de reparación.
- 1 máquina de balanceo.

Después de la reparación menor o mayor, el 40% de las bombas requieren balanceo del rotor antes de la prueba final. El tiempo de balanceo sigue una distribución triangular con mínimo de 2 horas, valor más probable de 3 horas y máximo de 4 horas. El balanceo requiere un mecánico y la máquina de balanceo.

Todas las bombas reparadas pasan a una estación de prueba final. La prueba final tarda 90 minutos por bomba y requiere un técnico y un banco de prueba. Solo hay un banco de prueba.

Durante la prueba final:
- 85% de las bombas aprueban la prueba y se liberan al servicio.
- 15% fallan y deben volver al taller mecánico para retrabajo.

El tiempo de retrabajo sigue una distribución triangular con mínimo de 2 horas, valor más probable de 5 horas y máximo de 10 horas. El retrabajo requiere un mecánico y un banco de reparación. Después del retrabajo, la bomba vuelve de nuevo a la prueba final.

El taller de mantenimiento opera de lunes a viernes, de 7:00 a 17:00, con una pausa de almuerzo de 12:00 a 13:00. No se trabaja fuera del horario laboral, pero las bombas pueden seguir esperando en buffers.

La máquina de balanceo tiene una parada planificada cada viernes de 13:00 a 15:00. El banco de prueba final tiene un comportamiento de fallo no planificado con un tiempo medio entre fallos de 80 horas de operación y un tiempo de reparación que sigue una distribución triangular con mínimo de 1 hora, valor más probable de 2 horas y máximo de 4 horas.

Simula 365 días calendario con 20 réplicas.

Quiero conocer:
1. Throughput total, medido como bombas liberadas al servicio.
2. Tiempo medio y máximo de ciclo de reparación.
3. Tiempo medio de espera antes de diagnóstico, reparación, balanceo y prueba final.
4. Utilización de técnicos, mecánicos, bancos de reparación, máquina de balanceo y banco de prueba.
5. El cuello de botella principal del sistema.
6. El porcentaje de bombas retrasadas por falta de mecánicos, bancos de reparación, disponibilidad de la máquina de balanceo o disponibilidad del banco de prueba final.
7. Recomendaciones para mejorar el throughput y reducir el tiempo de ciclo.`
  }
];

export default function PromptExamples() {
  return (
    <div className="mb-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-blue-300 mb-2">Prompts de ejemplo</p>
        <h4 className="text-lg font-semibold text-white">Mira cómo escribir un caso real</h4>
        <p className="text-sm text-gray-300 mt-2 max-w-2xl">Abre cada ejemplo para ver el nivel de detalle que esperamos.</p>
      </div>

      <div className="mt-5 space-y-3">
        {examplePrompts.map((prompt) => (
          <details key={prompt.id} className="group rounded-2xl border border-white/10 bg-slate-950/30 overflow-hidden">
            <summary className="list-none cursor-pointer px-4 py-4 md:px-5 md:py-5 flex items-center justify-between gap-4 text-left">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300 mb-1">{prompt.label}</p>
                <h5 className="text-sm md:text-base font-semibold text-white leading-snug">{prompt.title}</h5>
              </div>
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200 group-open:text-blue-200">
                Abrir
              </span>
            </summary>
            <div className="border-t border-white/10 px-4 py-4 md:px-5 md:py-5">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200 font-sans">{prompt.body}</pre>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}