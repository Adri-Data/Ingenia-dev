"use client";

import { useEffect, useMemo, useState } from "react";

type Locale = "es" | "en";

type PromptExample = {
  id: string;
  title: Record<Locale, string>;
  label: Record<Locale, string>;
  body: Record<Locale, string>;
};

const examplePrompts: PromptExample[] = [
  {
    id: "mixing-line",
    title: {
      es: "Línea con dos productos y operador compartido",
      en: "Two-product line with a shared operator"
    },
    label: {
      es: "Ejemplo 1",
      en: "Example 1"
    },
    body: {
      es: `Las piezas A llegan en pallets. Cada pallet contiene 10 unidades. Cada pallet llega siguiendo una distribución exponencial con un valor mínimo de 2 minutos y un valor máximo de 20 minutos. Las piezas B llegan cada 5 minutos.

Las piezas A se procesan en MachineA con un tiempo de proceso de 5 minutos. Las piezas B se procesan en MachineB, cuyo tiempo de servicio es de 10 minutos. Ambas máquinas son operadas por el mismo operario.

Después, ambas piezas se ensamblan, con un tiempo de ensamblaje de 3 minutos por unidad. Finalmente, se transportan mediante un AGV a expedición, lo que toma 5 minutos, y luego se expiden.

Simula 48 horas con 10 réplicas.

Quiero conocer el throughput y la ocupación del operario y del AGV.`,
      en: `Parts A arrive on pallets. Each pallet contains 10 units. Each pallet arrives following an exponential distribution with a minimum value of 2 minutes and a maximum value of 20 minutes. Parts B arrive every 5 minutes.

Parts A are processed in MachineA with a processing time of 5 minutes. Parts B are processed in MachineB, whose service time is 10 minutes. Both machines are operated by the same operator.

Then, both parts are assembled, with an assembly time of 3 minutes per assembly. Finally, they are transported by an AGV to expedition, which takes 5 minutes, and are then expedited.

Simulate 48 hours with 10 replications.

I would like to know the throughput and the occupation of the operator and the AGV.`
    }
  },
  {
    id: "multi-stage-manufacturing",
    title: {
      es: "Flujo multietapa con mantenimiento y re-trabajo",
      en: "Multi-stage flow with maintenance and rework"
    },
    label: {
      es: "Ejemplo 2",
      en: "Example 2"
    },
    body: {
      es: `Las piezas llegan una a una al sistema cada 1 minuto y primero se envían a un buffer de espera. Tras esperar 10 minutos, las piezas se transportan a la estación de procesamiento (tiempo de transporte: 2 minutos), donde cada pieza se procesa en una máquina única llamada Machine0101 con un tiempo de proceso de 4 minutos.

Después, las piezas se transportan a la estación de corte. La operación de corte dura 3 minutos, y el desperdicio generado se almacena por separado. Tras el corte, las piezas se transportan a la estación de fresado (tiempo de transporte: 2 minutos) y se fresan con tiempos que siguen una distribución normal con media de 5 minutos y desviación estándar de 1 minuto.

Luego, las piezas se transportan a la estación de empaquetado (tiempo de transporte: 1 minuto), donde el proceso de empaquetado dura 2 minutos. Las piezas empaquetadas se mueven a un área de espera (tiempo de transporte: 1 minuto) antes de ser desempaquetadas en la estación de desempaquetado, que tarda 2 minutos.

Después del desempaquetado, las piezas se transportan a la estación de ensamblaje (tiempo de transporte: 2 minutos) y se ensamblan en 5 minutos. Se ensamblan con piezas B, que llegan una a una cada 5 minutos y se enrutan directamente a la estación de ensamblaje (tiempo de transporte: 10 minutos).

Finalmente, las piezas van a una estación de inspección, donde la inspección dura 2 minutos. El 50% de las piezas inspeccionadas se rechaza y se descarta, mientras que el 50% restante se almacena como producto terminado.

La industria solo opera de 8:00 a 21:00. Hay una parada de mantenimiento planificada para Machine0101 de 15 minutos cada día.

Simula 24 horas, solo una vez.

Quiero conocer el throughput y dónde está mi cuello de botella.`,
      en: `Parts arrive one by one to the system every 1 minute and are first sent to a waiting buffer. After waiting 10 minutes, the parts are transported to the processing station (transport time: 2 minutes), where each part is processed by a single machine called Machine0101 with a 4-minute processing time.

Then, the parts are transported to the cutting station. The cutting operation lasts 3 minutes, and the generated waste is stored separately. After cutting, the parts are transported to the milling station (transport time: 2 minutes) and milled for times following a normal distribution with a mean of 5 minutes and a standard deviation of 1 minute.

Then, the parts are transported to the packing station (transport time: 1 minute), where the packing process lasts 2 minutes. Packed parts are moved to a waiting area (transport time: 1 minute) before being unpacked in the unpacking station, which takes 2 minutes.

After unpacking, the parts are transported to the assembly station (transport time: 2 minutes) and assembled in 5 minutes. They are assembled with pieces B, which arrive one by one every 5 minutes and are routed directly to the assembly station (transport time: 10 minutes).

Finally, the parts go to an inspection station, where the inspection lasts 2 minutes. 50% of the inspected parts are rejected and discarded, while the remaining 50% are stored as finished products.

The industry is only open from 8:00 to 21:00. There is a planned maintenance stop for Machine0101 of 15 minutes every day.

Simulate 24 hours, only once.

I would like to know the throughput and where my bottleneck is.`
    }
  },
  {
    id: "pump-repair",
    title: {
      es: "Taller de reparación de bombas centrífugas",
      en: "Centrifugal pump repair workflow"
    },
    label: {
      es: "Ejemplo 3",
      en: "Example 3"
    },
    body: {
      es: `Las bombas centrífugas de un área de mantenimiento de refinería llegan a un flujo de reparación tras ser retiradas del servicio por alarmas de vibración, fugas en sellos, alarmas de temperatura en rodamientos o requisitos de overhaul programado.

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
7. Recomendaciones para mejorar el throughput y reducir el tiempo de ciclo.`,
      en: `Centrifugal pumps from a refinery maintenance area arrive to a repair workflow after being removed from service due to vibration alarms, seal leakage, bearing temperature alarms, or scheduled overhaul requirements.

Pump repair requests arrive following an exponential distribution with a mean interarrival time of 4 hours. Each repair request represents one centrifugal pump.
When a pump arrives, it first waits in a receiving buffer. Then, a reliability technician performs an initial inspection and diagnosis. The diagnosis time follows a triangular distribution with a minimum of 4 hours, a most likely value of 6 hours, and a maximum of 8 hours. There are two reliability technicians available.
After diagnosis, pumps are classified into three categories:
- 50% require minor repair.
- 35% require major repair.
- 15% require external vendor repair.

Minor repairs are routed to the mechanical repair shop. Minor repair time follows a triangular distribution with a minimum of 24 hours, a most likely value of 40 hours, and a maximum of 56 hours. Minor repairs require one mechanic and one repair bench.
Major repairs are also routed to the mechanical repair shop. Major repair time follows a triangular distribution with a minimum of 40 hours, a most likely value of 60 hours, and a maximum of 80 hours. Major repairs require one mechanic and one repair bench.
External vendor repairs require preparation and shipment. Preparation time is 2 hours and requires one technician. The external repair lead time follows a normal distribution with a mean of 80 hours and a standard deviation of 20 hours. After the pump returns from the vendor, it goes to final inspection.

The mechanical repair shop has:
- 3 mechanics.
- 2 repair benches.
- 1 balancing machine.

After minor or major repair, 40% of the pumps require rotor balancing before final testing. Balancing time follows a triangular distribution with a minimum of 2 hours, a most likely value of 3 hours, and a maximum of 4 hours. Balancing requires one mechanic and the balancing machine.

All repaired pumps then go to a final test station. Final testing takes 90 minutes per pump and requires one technician and one test bench. There is only one test bench.

During final testing:
- 85% of pumps pass the test and are released to service.
- 15% fail the test and must return to the mechanical repair shop for rework.

Rework time follows a triangular distribution with a minimum of 2 hours, a most likely value of 5 hours, and a maximum of 10 hours. Rework requires one mechanic and one repair bench. After rework, the pump returns again to final testing.

The maintenance shop operates from Monday to Friday, from 7:00 to 17:00, with a 1-hour lunch break from 12:00 to 13:00. No work is performed outside working hours, but pumps can continue waiting in buffers.

The balancing machine has a planned maintenance stop every Friday from 13:00 to 15:00. The final test bench has an unplanned failure behavior with a mean time between failures of 80 operating hours and a repair time following a triangular distribution with a minimum of 1 hour, a most likely value of 2 hours, and a maximum of 4 hours.

Simulate 365 calendar days with 20 replications.

I would like to know:
1. Total throughput, measured as pumps released to service.
2. Average and maximum repair turnaround time.
3. Average waiting time before diagnosis, repair, balancing, and final testing.
4. Utilization of technicians, mechanics, repair benches, balancing machine, and test bench.
5. The main bottleneck in the system.
6. The percentage of pumps delayed by lack of mechanics, repair benches, balancing machine availability, or final test bench availability.
7. Recommendations to improve throughput and reduce turnaround time.`
    }
  }
];

export default function PromptExamples({ locale = "es" }: { locale?: Locale }) {
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

  const selectedPrompt = useMemo(
    () => examplePrompts.find((prompt) => prompt.id === selectedPromptId) ?? null,
    [selectedPromptId]
  );

  useEffect(() => {
    if (!selectedPromptId) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPromptId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPromptId]);

  return (
    <div className="mb-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-blue-300 mb-2">Prompts de ejemplo</p>
        <h4 className="text-lg font-semibold text-white">Mira cómo escribir un caso real</h4>
        <p className="text-sm text-gray-300 mt-2 max-w-2xl">Abre cada ejemplo para ver el nivel de detalle que esperamos.</p>
      </div>

      <div className="mt-5 grid gap-3">
        {examplePrompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            onClick={() => setSelectedPromptId(prompt.id)}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left transition-all hover:bg-white/[0.06]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300 mb-1">{prompt.label[locale]}</p>
                <h5 className="text-sm font-semibold text-white leading-snug">{prompt.title[locale]}</h5>
              </div>
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200 group-hover:text-white">
                {locale === "en" ? "Open" : "Abrir"}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedPrompt ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm" onClick={() => setSelectedPromptId(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedPrompt.title[locale]}
            className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#07111f] shadow-2xl shadow-black/60"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-6 md:py-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300 mb-1">{selectedPrompt.label[locale]}</p>
                <h5 className="text-base md:text-lg font-semibold text-white leading-snug">{selectedPrompt.title[locale]}</h5>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPromptId(null)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                {locale === "en" ? "Close" : "Cerrar"}
              </button>
            </div>

            <div className="px-5 py-5 md:px-6 md:py-6">
              <pre className="max-h-[70vh] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-gray-200 font-sans">{selectedPrompt.body[locale]}</pre>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}