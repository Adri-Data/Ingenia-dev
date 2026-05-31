;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="d85ed2c3-b677-836b-f04d-bd5223151b45")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32316,e=>{"use strict";var a=e.i(76307),i=e.i(23793),r=e.i(4579),n=e.i(44581),t=e.i(20845),o=e.i(55540);let s=[{id:"mixing-line",title:{es:"Línea con dos productos y operador compartido",en:"Two-product line with a shared operator"},languageLabel:{es:"Ejemplo 1",en:"Example 1"},body:{es:`Las piezas A llegan en pallets. Cada pallet contiene 10 unidades. Cada pallet llega siguiendo una distribuci\xf3n exponencial con un valor m\xednimo de 2 minutos y un valor m\xe1ximo de 20 minutos. Las piezas B llegan cada 5 minutos.

Las piezas A se procesan en MachineA con un tiempo de proceso de 5 minutos. Las piezas B se procesan en MachineB, cuyo tiempo de servicio es de 10 minutos. Ambas m\xe1quinas son operadas por el mismo operario.

Despu\xe9s, ambas piezas se ensamblan, con un tiempo de ensamblaje de 3 minutos por unidad. Finalmente, se transportan mediante un AGV a expedici\xf3n, lo que toma 5 minutos, y luego se expiden.

Simula 48 horas con 10 r\xe9plicas.

Quiero conocer el throughput y la ocupaci\xf3n del operario y del AGV.`,en:`Parts A arrive on pallets. Each pallet contains 10 units. Each pallet arrives following an exponential distribution with a minimum value of 2 minutes and a maximum value of 20 minutes. Parts B arrive every 5 minutes.

Parts A are processed in MachineA with a processing time of 5 minutes. Parts B are processed in MachineB, whose service time is 10 minutes. Both machines are operated by the same operator.

Then, both parts are assembled, with an assembly time of 3 minutes per assembly. Finally, they are transported by an AGV to expedition, which takes 5 minutes, and are then expedited.

Simulate 48 hours with 10 replications.

I would like to know the throughput and the occupation of the operator and the AGV.`}},{id:"multi-stage-manufacturing",title:{es:"Flujo multietapa con mantenimiento y re-trabajo",en:"Multi-stage flow with maintenance and rework"},languageLabel:{es:"Ejemplo 2",en:"Example 2"},body:{es:`Las piezas llegan una a una al sistema cada 1 minuto y primero se env\xedan a un buffer de espera. Tras esperar 10 minutos, las piezas se transportan a la estaci\xf3n de procesamiento (tiempo de transporte: 2 minutos), donde cada pieza se procesa en una m\xe1quina \xfanica llamada Machine0101 con un tiempo de proceso de 4 minutos.

Despu\xe9s, las piezas se transportan a la estaci\xf3n de corte. La operaci\xf3n de corte dura 3 minutos, y el desperdicio generado se almacena por separado. Tras el corte, las piezas se transportan a la estaci\xf3n de fresado (tiempo de transporte: 2 minutos) y se fresan con tiempos que siguen una distribuci\xf3n normal con media de 5 minutos y desviaci\xf3n est\xe1ndar de 1 minuto.

Luego, las piezas se transportan a la estaci\xf3n de empaquetado (tiempo de transporte: 1 minuto), donde el proceso de empaquetado dura 2 minutos. Las piezas empaquetadas se mueven a un \xe1rea de espera (tiempo de transporte: 1 minuto) antes de ser desempaquetadas en la estaci\xf3n de desempaquetado, que tarda 2 minutos.

Despu\xe9s del desempaquetado, las piezas se transportan a la estaci\xf3n de ensamblaje (tiempo de transporte: 2 minutos) y se ensamblan en 5 minutos. Se ensamblan con piezas B, que llegan una a una cada 5 minutos y se enrutan directamente a la estaci\xf3n de ensamblaje (tiempo de transporte: 10 minutos).

Finalmente, las piezas van a una estaci\xf3n de inspecci\xf3n, donde la inspecci\xf3n dura 2 minutos. El 50% de las piezas inspeccionadas se rechaza y se descarta, mientras que el 50% restante se almacena como producto terminado.

La industria solo opera de 8:00 a 21:00. Hay una parada de mantenimiento planificada para Machine0101 de 15 minutos cada d\xeda.

Simula 24 horas, solo una vez.

Quiero conocer el throughput y d\xf3nde est\xe1 mi cuello de botella.`,en:`Parts arrive one by one to the system every 1 minute and are first sent to a waiting buffer. After waiting 10 minutes, the parts are transported to the processing station (transport time: 2 minutes), where each part is processed by a single machine called Machine0101 with a 4-minute processing time.

Then, the parts are transported to the cutting station. The cutting operation lasts 3 minutes, and the generated waste is stored separately. After cutting, the parts are transported to the milling station (transport time: 2 minutes) and milled for times following a normal distribution with a mean of 5 minutes and a standard deviation of 1 minute.

Then, the parts are transported to the packing station (transport time: 1 minute), where the packing process lasts 2 minutes. Packed parts are moved to a waiting area (transport time: 1 minute) before being unpacked in the unpacking station, which takes 2 minutes.

After unpacking, the parts are transported to the assembly station (transport time: 2 minutes) and assembled in 5 minutes. They are assembled with pieces B, which arrive one by one every 5 minutes and are routed directly to the assembly station (transport time: 10 minutes).

Finally, the parts go to an inspection station, where the inspection lasts 2 minutes. 50% of the inspected parts are rejected and discarded, while the remaining 50% are stored as finished products.

The industry is only open from 8:00 to 21:00. There is a planned maintenance stop for Machine0101 of 15 minutes every day.

Simulate 24 hours, only once.

I would like to know the throughput and where my bottleneck is.`}},{id:"pump-repair",title:{es:"Taller de reparación de bombas centrífugas",en:"Centrifugal pump repair workflow"},languageLabel:{es:"Ejemplo 3",en:"Example 3"},body:{es:`Las bombas centr\xedfugas de un \xe1rea de mantenimiento de refiner\xeda llegan a un flujo de reparaci\xf3n tras ser retiradas del servicio por alarmas de vibraci\xf3n, fugas en sellos, alarmas de temperatura en rodamientos o requisitos de overhaul programado.

Las solicitudes de reparaci\xf3n llegan siguiendo una distribuci\xf3n exponencial con un tiempo medio entre llegadas de 4 horas. Cada solicitud representa una bomba centr\xedfuga.
Cuando llega una bomba, primero espera en un buffer de recepci\xf3n. Luego, un t\xe9cnico de confiabilidad realiza una inspecci\xf3n y diagn\xf3stico inicial. El tiempo de diagn\xf3stico sigue una distribuci\xf3n triangular con m\xednimo de 4 horas, valor m\xe1s probable de 6 horas y m\xe1ximo de 8 horas. Hay dos t\xe9cnicos de confiabilidad disponibles.

Despu\xe9s del diagn\xf3stico, las bombas se clasifican en tres categor\xedas:
- 50% requieren reparaci\xf3n menor.
- 35% requieren reparaci\xf3n mayor.
- 15% requieren reparaci\xf3n con proveedor externo.

Las reparaciones menores se enrutan al taller mec\xe1nico. El tiempo de reparaci\xf3n menor sigue una distribuci\xf3n triangular con m\xednimo de 24 horas, valor m\xe1s probable de 40 horas y m\xe1ximo de 56 horas. Las reparaciones menores requieren un mec\xe1nico y un banco de reparaci\xf3n.

Las reparaciones mayores tambi\xe9n se enrutan al taller mec\xe1nico. El tiempo de reparaci\xf3n mayor sigue una distribuci\xf3n triangular con m\xednimo de 40 horas, valor m\xe1s probable de 60 horas y m\xe1ximo de 80 horas. Las reparaciones mayores requieren dos mec\xe1nicos y un banco de reparaci\xf3n.

Las reparaciones externas requieren preparaci\xf3n y env\xedo. El tiempo de preparaci\xf3n es de 2 horas y requiere un t\xe9cnico. El lead time externo sigue una distribuci\xf3n normal con media de 80 horas y desviaci\xf3n est\xe1ndar de 20 horas. Cuando la bomba vuelve del proveedor, pasa a inspecci\xf3n final.

El taller mec\xe1nico tiene:
- 3 mec\xe1nicos.
- 2 bancos de reparaci\xf3n.
- 1 m\xe1quina de balanceo.

Despu\xe9s de la reparaci\xf3n menor o mayor, el 40% de las bombas requieren balanceo del rotor antes de la prueba final. El tiempo de balanceo sigue una distribuci\xf3n triangular con m\xednimo de 2 horas, valor m\xe1s probable de 3 horas y m\xe1ximo de 4 horas. El balanceo requiere un mec\xe1nico y la m\xe1quina de balanceo.

Todas las bombas reparadas pasan a una estaci\xf3n de prueba final. La prueba final tarda 90 minutos por bomba y requiere un t\xe9cnico y un banco de prueba. Solo hay un banco de prueba.

Durante la prueba final:
- 85% de las bombas aprueban la prueba y se liberan al servicio.
- 15% fallan y deben volver al taller mec\xe1nico para retrabajo.

El tiempo de retrabajo sigue una distribuci\xf3n triangular con m\xednimo de 2 horas, valor m\xe1s probable de 5 horas y m\xe1ximo de 10 horas. El retrabajo requiere un mec\xe1nico y un banco de reparaci\xf3n. Despu\xe9s del retrabajo, la bomba vuelve de nuevo a la prueba final.

El taller de mantenimiento opera de lunes a viernes, de 7:00 a 17:00, con una pausa de almuerzo de 12:00 a 13:00. No se trabaja fuera del horario laboral, pero las bombas pueden seguir esperando en buffers.

La m\xe1quina de balanceo tiene una parada planificada cada viernes de 13:00 a 15:00. El banco de prueba final tiene un comportamiento de fallo no planificado con un tiempo medio entre fallos de 80 horas de operaci\xf3n y un tiempo de reparaci\xf3n que sigue una distribuci\xf3n triangular con m\xednimo de 1 hora, valor m\xe1s probable de 2 horas y m\xe1ximo de 4 horas.

Simula 365 d\xedas calendario con 20 r\xe9plicas.

Quiero conocer:
1. Throughput total, medido como bombas liberadas al servicio.
2. Tiempo medio y m\xe1ximo de ciclo de reparaci\xf3n.
3. Tiempo medio de espera antes de diagn\xf3stico, reparaci\xf3n, balanceo y prueba final.
4. Utilizaci\xf3n de t\xe9cnicos, mec\xe1nicos, bancos de reparaci\xf3n, m\xe1quina de balanceo y banco de prueba.
5. El cuello de botella principal del sistema.
6. El porcentaje de bombas retrasadas por falta de mec\xe1nicos, bancos de reparaci\xf3n, disponibilidad de la m\xe1quina de balanceo o disponibilidad del banco de prueba final.
7. Recomendaciones para mejorar el throughput y reducir el tiempo de ciclo.`,en:`Centrifugal pumps from a refinery maintenance area arrive to a repair workflow after being removed from service due to vibration alarms, seal leakage, bearing temperature alarms, or scheduled overhaul requirements.

Pump repair requests arrive following an exponential distribution with a mean interarrival time of 4 hours. Each repair request represents one centrifugal pump.
When a pump arrives, it first waits in a receiving buffer. Then, a reliability technician performs an initial inspection and diagnosis. The diagnosis time follows a triangular distribution with a minimum of 4 hours, a most likely value of 6 hours, and a maximum of 8 hours. There are two reliability technicians available.
After diagnosis, pumps are classified into three categories:
- 50% require minor repair.
- 35% require major repair.
- 15% require external vendor repair.

Minor repairs are routed to the mechanical repair shop. Minor repair time follows a triangular distribution with a minimum of 24 hours, a most likely value of 40 hours, and a maximum of 56 hours. Minor repairs require one mechanic and one repair bench.
Major repairs are also routed to the mechanical repair shop. Major repair time follows a triangular distribution with a minimum of 40 hours, a most likely value of 60 hours, and a maximum of 80 hours. Major repairs require two mechanics and one repair bench.
External vendor repairs require preparation and shipment. Preparation time is 2 hours and requires one technician. The external repair lead time follows a normal distribution with a mean of 80 hours and a standard deviation of 20 hours. After the pump returns from the vendor, it goes to final inspection.

The mechanical repair shop has:
- 3 mechanics.
- 2 repair benches.
- 1 balancing machine.

After minor or major repair, 40% of the pumps require rotor balancing before final testing. Balancing time follows a triangular distribution with a minimum of 2 hour, a most likely value of 3 hours, and a maximum of 4 hours. Balancing requires one mechanic and the balancing machine.

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
7. Recommendations to improve throughput and reduce turnaround time.`}}];e.s(["default",0,function(){let[e,l]=(0,i.useState)({name:"",email:"",company:"",scenario:"",message:""}),[d,m]=(0,i.useState)(!1),[u,c]=(0,i.useState)(!1),[p,h]=(0,i.useState)(""),[b,x]=(0,i.useState)(null),[f,g]=(0,i.useState)("es");(0,i.useEffect)(()=>{let e=(0,o.getRateLimitState)();e.blockedUntil&&e.blockedUntil>Date.now()&&x(e.blockedUntil)},[]),(0,i.useEffect)(()=>{if(!b)return;let e=window.setTimeout(()=>{let e=(0,o.getRateLimitState)();e.blockedUntil&&e.blockedUntil>Date.now()?x(e.blockedUntil):x(null)},Math.max(b-Date.now(),1e3));return()=>window.clearTimeout(e)},[b]);let y=e=>{let{name:a,value:i}=e.target;l(e=>({...e,[a]:i})),h("")},w=async a=>{if(a.preventDefault(),!e.name||!e.email||!e.scenario)return void h("Por favor completa nombre, email y escenario.");if(!o.CONTACT_EMAILJS_SERVICE_ID||!o.CONTACT_EMAILJS_TEMPLATE_ID||!o.CONTACT_EMAILJS_PUBLIC_KEY)return void h("Falta configurar EmailJS: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID y NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.");let i=Date.now(),r=(0,o.getRateLimitState)(i);if(r.blockedUntil&&r.blockedUntil>i){x(r.blockedUntil),h("Has superado el límite diario. Vuelve mañana.");return}let n=i-o.CONTACT_RATE_LIMIT_MIN_INTERVAL_MS,s=r.timestamps.filter(e=>e>=n);if(s.length>0){let e=s[s.length-1],a=o.CONTACT_RATE_LIMIT_MIN_INTERVAL_MS-(i-e);h(`Solo puedes enviar una solicitud por minuto. Espera ${Math.ceil(a/1e3)} segundos.`);return}let d=i-o.CONTACT_RATE_LIMIT_BURST_WINDOW_MS,u=r.timestamps.filter(e=>e>=d);m(!0),h("");try{await t.default.send(o.CONTACT_EMAILJS_SERVICE_ID,o.CONTACT_EMAILJS_TEMPLATE_ID,(0,o.buildContactPayload)(e),o.CONTACT_EMAILJS_PUBLIC_KEY);let a=[...u,i],r={timestamps:a,blockedUntil:a.length>=o.CONTACT_RATE_LIMIT_MAX_ATTEMPTS?(0,o.getNextMidnightTimestamp)(i):void 0};(0,o.saveRateLimitState)(r),r.blockedUntil&&r.blockedUntil>i&&x(r.blockedUntil),c(!0),l({name:"",email:"",company:"",scenario:"",message:""}),setTimeout(()=>c(!1),5e3)}catch{h("No se pudo enviar la solicitud. Intenta de nuevo.")}finally{m(!1)}};return(0,a.jsxs)("div",{className:"glassmorphism p-10 rounded-[2.5rem] border border-blue-500/30 bg-blue-500/[0.03] group relative overflow-hidden",children:[(0,a.jsx)("div",{className:"absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[60px] group-hover:bg-purple-600/20 transition-colors"}),(0,a.jsx)("h3",{className:"text-lg font-bold uppercase tracking-widest italic text-blue-400 mb-2",children:"Solicita una demo"}),(0,a.jsx)("p",{className:"text-gray-300 mb-8 text-sm leading-relaxed",children:"Déjanos tus datos y el escenario que quieres simular. Si quieres añadir contexto, usa el mensaje opcional y lo incluiremos en el correo preparado."}),(0,a.jsxs)("div",{className:"mb-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 md:p-6",children:[(0,a.jsxs)("div",{className:"flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs uppercase tracking-[0.3em] text-blue-300 mb-2",children:"Prompts de ejemplo"}),(0,a.jsx)("h4",{className:"text-lg font-semibold text-white",children:"Mira cómo escribir un caso real"}),(0,a.jsx)("p",{className:"text-sm text-gray-400 mt-2 max-w-2xl",children:"Puedes cambiar entre español e inglés y abrir cada ejemplo para ver el nivel de detalle que esperamos."})]}),(0,a.jsxs)("div",{className:"inline-flex rounded-full border border-white/10 bg-white/5 p-1",children:[(0,a.jsx)("button",{type:"button",onClick:()=>g("es"),className:`px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all ${"es"===f?"bg-blue-500 text-white shadow-lg shadow-blue-500/20":"text-gray-300 hover:text-white"}`,children:"Español"}),(0,a.jsx)("button",{type:"button",onClick:()=>g("en"),className:`px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all ${"en"===f?"bg-blue-500 text-white shadow-lg shadow-blue-500/20":"text-gray-300 hover:text-white"}`,children:"English"})]})]}),(0,a.jsx)("div",{className:"mt-5 space-y-3",children:s.map(e=>(0,a.jsxs)("details",{className:"group rounded-2xl border border-white/10 bg-slate-950/30 overflow-hidden",children:[(0,a.jsxs)("summary",{className:"list-none cursor-pointer px-4 py-4 md:px-5 md:py-5 flex items-center justify-between gap-4 text-left",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-[11px] uppercase tracking-[0.28em] text-cyan-300 mb-1",children:e.languageLabel[f]}),(0,a.jsx)("h5",{className:"text-sm md:text-base font-semibold text-white leading-snug",children:e.title[f]})]}),(0,a.jsx)("span",{className:"shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-300 group-open:text-blue-200",children:"es"===f?"Abrir":"Open"})]}),(0,a.jsx)("div",{className:"border-t border-white/10 px-4 py-4 md:px-5 md:py-5",children:(0,a.jsx)("pre",{className:"whitespace-pre-wrap text-sm leading-relaxed text-gray-200 font-sans",children:e.body[f]})})]},e.id))})]}),(0,a.jsxs)("form",{onSubmit:w,className:"space-y-8 relative z-10",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-semibold text-gray-200 mb-2",children:"Nombre *"}),(0,a.jsx)("input",{type:"text",name:"name",value:e.name,onChange:y,placeholder:"Tu nombre",className:"w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-semibold text-gray-200 mb-2",children:"Email *"}),(0,a.jsx)("input",{type:"email",name:"email",value:e.email,onChange:y,placeholder:"tu@email.com",className:"w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-semibold text-gray-200 mb-2",children:"Empresa"}),(0,a.jsx)("input",{type:"text",name:"company",value:e.company,onChange:y,placeholder:"Nombre de tu empresa",className:"w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-semibold text-gray-200 mb-2",children:"Escenario a simular *"}),(0,a.jsx)("textarea",{name:"scenario",value:e.scenario,onChange:y,placeholder:"Ejemplo: línea de ensamblaje con 4 estaciones, colas en estación 3 y demanda variable por turno",rows:4,className:"w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all resize-none"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-semibold text-gray-200 mb-2",children:"Mensaje adicional opcional"}),(0,a.jsx)("textarea",{name:"message",value:e.message,onChange:y,placeholder:"Notas de contexto, prioridades o cualquier detalle útil",rows:4,className:"w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all resize-none"})]}),p&&(0,a.jsx)("div",{className:"p-4 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 text-sm",children:p}),u&&(0,a.jsx)("div",{className:"p-4 rounded-lg bg-green-500/15 border border-green-500/30 text-green-200 text-sm animate-pulse",children:"¡Gracias! Hemos enviado tu solicitud."}),b&&b>Date.now()&&(0,a.jsx)("div",{className:"p-4 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-100 text-sm",children:"Límite temporal activo hasta mañana. Podrás volver a enviar cuando se reinicie el bloqueo."}),(0,a.jsx)("button",{type:"submit",disabled:d||null!==b&&b>Date.now(),className:"w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-2",children:d?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"}),(0,a.jsx)("span",{children:"Enviando..."})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:"Enviar solicitud"}),(0,a.jsx)(n.ArrowRight,{className:"w-5 h-5"})]})}),(0,a.jsxs)("p",{className:"text-xs text-gray-500 leading-relaxed",children:["Puedes revisar el formulario con calma y volver a la home desde"," ",(0,a.jsx)(r.default,{href:"/",className:"text-blue-300 hover:text-blue-200 underline underline-offset-4",children:"la página principal"}),"."]})]})]})}])}]);

//# debugId=d85ed2c3-b677-836b-f04d-bd5223151b45