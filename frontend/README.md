# Ingenia Frontend

Frontend de Ingenia hecho con Next.js y preparado para exportación estática en GitHub Pages.

## Qué incluye

- Home pública con propuesta de valor y CTA a contacto.
- Página de contacto con formulario enviado por EmailJS.
- Export estático para publicar en GitHub Pages.
- Comandos de desarrollo y despliegue automatizado.

## Requisitos

- Node.js 22.x
- npm 10.x o superior
- Git
- GitHub CLI si quieres sincronizar secrets desde consola
 - pnpm (recomendado) o Corepack para gestionarlo automáticamente

## Variables de entorno

Crea el archivo `frontend/.env.local` con las variables necesarias para el formulario y, si aplica, Sentry:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
NEXT_PUBLIC_BASE_PATH=/Ingenia-dev
NEXT_PUBLIC_SENTRY_DSN=tu_sentry_dsn_publico
SENTRY_DSN=tu_sentry_dsn_privado
```

### Notas

- `NEXT_PUBLIC_BASE_PATH` debe ser `/Ingenia-dev` si publicas en `https://adri-data.github.io/Ingenia-dev/`.
- Las variables `NEXT_PUBLIC_*` se exponen al cliente. `SENTRY_DSN` se usa solo en servidor/telemetría.
- No subas `.env.local` al repositorio.

## Instalación local

Desde la carpeta `frontend` (recomendado: usar `pnpm`):

```bash
# Instalar pnpm via corepack (si aún no lo tienes)
corepack enable
corepack prepare pnpm@latest --activate

cd frontend
pnpm install
```

Alternativa con `npm`:

```bash
cd frontend
npm ci --prefer-offline --no-audit --progress=false
```

Si prefieres usar el Makefile desde la raíz del repo, también puedes ejecutar:

```bash
make install   # usa pnpm por defecto
```

Si ya tienes dependencias instaladas, no hace falta repetir este paso para cada build.

## Desarrollo local

### Opción recomendada

Desde la raíz del repositorio:

```bash
make dev
```

Por defecto arranca en `http://localhost:3001` para evitar choques con otros procesos.

### Opción directa

Desde `frontend` (pnpm recomendado):

```bash
pnpm run dev -- --port 3001
# o con npm
npm run dev -- --port 3001
```

Si quieres usar otro puerto:

```bash
pnpm run dev -- --port 3000
# o con npm
npm run dev -- --port 3000
```

## Build estático

El proyecto exporta sitio estático y genera la carpeta `out`.

Desde `frontend`:

```bash
pnpm run build
# o con npm
npm run build
```

Desde la raíz con Makefile:

```bash
make build
```

Si ves un error de dependencias corruptas o instalación a medias, vuelve a instalar primero:

```bash
make install
```

El build también ajusta la salida para GitHub Pages y copia los archivos necesarios para el hosting estático.

## Previsualización local del export

Después de compilar, puedes servir la carpeta `out` con cualquier servidor estático. Por ejemplo:

```bash
npx serve out
```

O con Python:

```bash
python -m http.server 4173 -d out
```

## Despliegue en GitHub Pages

Hay dos formas:

### 1. Despliegue manual con `gh-pages`

Desde `frontend`:

```bash
npm run build
npx gh-pages -d out -b gh-pages --dotfiles
```

Desde la raíz:

```bash
make deploy-gh-pages
```

Este flujo publica el contenido exportado en la rama `gh-pages`.

### 2. Despliegue automático con GitHub Actions

El workflow está en `.github/workflows/deploy-pages.yml`.

Flujo:

1. Hacer push a `main` o `master`.
2. GitHub Actions ejecuta el build.
3. Se publica la salida estática en GitHub Pages.

Si necesitas forzar el subpath manualmente, usa `NEXT_PUBLIC_BASE_PATH=/Ingenia-dev` antes del build.

## Secrets en GitHub

Sincroniza las variables del `.env.local` con GitHub Secrets si quieres automatizar el despliegue sin copiar valores a mano.

Desde la raíz del repo:

```bash
make sync-secrets
```

Eso usa `scripts/sync-env-secrets.ps1` y `gh secret set`.

### Secrets recomendados

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_BASE_PATH`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_DSN`

## Comandos útiles

Desde la raíz del repositorio:

```bash
make help
make dev
make build
make export
make deploy-gh-pages
make sync-secrets
make clean
```

Desde `frontend`:

```bash
pnpm run dev -- --port 3001
pnpm run build
pnpm run lint
```

## Estructura relevante

```text
frontend/
  src/
    app/
    new_formulary/
  public/
  out/
  .env.local
.github/workflows/
scripts/
Makefile
```

## Problemas comunes

### Veo la web sin estilos en GitHub Pages

- Asegúrate de que `NEXT_PUBLIC_BASE_PATH` sea `/Ingenia-dev`.
- Rebuild y republica el sitio.
- Haz un hard refresh en el navegador.

### GitHub Pages da 404 en `_next`

- Verifica que exista `frontend/public/.nojekyll`.
- Vuelve a ejecutar el build y el despliegue.

### `make dev` falla por puerto ocupado

- Cambia el puerto:

```bash
make dev PORT=3002
```

- O mata el proceso que ya esté usando el puerto.

### El formulario no envía correos

- Revisa que los secrets de EmailJS estén definidos.
- Confirma que el template de EmailJS acepta el payload que construye el formulario.
- Comprueba la consola del navegador para ver errores de envío.

## URL de producción

Cuando el repositorio se publica en GitHub Pages, la URL esperada es:

```text
https://adri-data.github.io/Ingenia-dev/
```

La página de contacto queda en:

```text
https://adri-data.github.io/Ingenia-dev/contact/
```
