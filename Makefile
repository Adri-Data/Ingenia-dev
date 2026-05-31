FRONTEND_DIR := frontend
EXPORT_DIR := $(FRONTEND_DIR)/out
ENV_FILE := $(FRONTEND_DIR)/.env.local
NEXT_PUBLIC_BASE_PATH ?= /Ingenia-dev
PORT ?= 3001

.PHONY: help dev install build export deploy-gh-pages deploy-actions sync-secrets clean

help:
	@echo "Makefile targets:"
	@echo "  make install          # Install frontend dependencies (uses pnpm by default)"
	@echo "  make install-pnpm     # Install frontend deps using pnpm (faster)"
	@echo "  make install-fast-npm # Install frontend deps using npm ci with fast flags"
	@echo "  make dev              # Run frontend in dev mode (localhost:$(PORT))"
	@echo "  make build            # Build static export into $(EXPORT_DIR)"
	@echo "  make deploy-gh-pages  # Publish $(EXPORT_DIR) to gh-pages branch using npx gh-pages"
	@echo "  make sync-secrets     # Sync $(ENV_FILE) into GitHub repository secrets using gh"
	@echo "  make deploy-actions   # Commit and push GitHub Actions workflow to enable automatic deploy"
	@echo "  make clean            # Remove build artifacts"

dev:
	@echo "Starting dev server..."
	cd $(FRONTEND_DIR) && npm run dev -- --port $(PORT)


# Default install: use pnpm (recommended)
install:
	@echo "Installing frontend dependencies with pnpm (recommended)"
	@pwsh -NoProfile -ExecutionPolicy Bypass -Command "& { Set-Location '$(FRONTEND_DIR)'; corepack enable; corepack prepare pnpm@latest --activate; try { pnpm import } catch { Write-Host 'pnpm import skipped'; }; pnpm install }"


install-pnpm:
	@echo "Installing frontend dependencies with pnpm (recommended)"
	@pwsh -NoProfile -ExecutionPolicy Bypass -Command "& { Set-Location '$(FRONTEND_DIR)'; $nodeV = (node -v).TrimStart('v'); $nodeMajor = [int]($nodeV.Split('.')[0]); if ($nodeMajor -lt 22) { Write-Host 'Node < 22 detected (v'+$nodeV+'). Falling back to npm ci (pnpm requires Node >= 22).'; $$env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1; npm ci --prefer-offline --no-audit --progress=false; exit 0 } ; corepack enable; corepack prepare pnpm@latest --activate; try { pnpm import } catch { Write-Host 'pnpm import failed, continuing' }; pnpm install --frozen-lockfile }"

install-fast-npm:
	@echo "Installing frontend dependencies quickly with npm ci (no audit, prefer-offline)"
	@pwsh -NoProfile -ExecutionPolicy Bypass -Command "& { Set-Location '$(FRONTEND_DIR)'; $$env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1; npm ci --prefer-offline --no-audit --progress=false }"

build:
	@echo "Building frontend (static export)..."
	pwsh -NoProfile -ExecutionPolicy Bypass -Command "& { Set-Item -Path Env:NEXT_PUBLIC_BASE_PATH -Value '$(NEXT_PUBLIC_BASE_PATH)'; Set-Location '$(FRONTEND_DIR)'; npm run build }"

export: build
	@echo "Export complete. Static files are in $(EXPORT_DIR)"

deploy-gh-pages: export
	@echo "Publishing $(EXPORT_DIR) to gh-pages branch (requires network and origin remote)"
	pwsh -NoProfile -ExecutionPolicy Bypass -Command "& { Set-Item -Path Env:NEXT_PUBLIC_BASE_PATH -Value '$(NEXT_PUBLIC_BASE_PATH)'; Set-Location '$(FRONTEND_DIR)'; npx gh-pages -d out -b gh-pages --dotfiles }"

deploy-actions:
	@echo "Committing and pushing GitHub Actions workflow (expects branch 'main' or 'master' remote)"
	@git add .github/workflows/deploy-pages.yml
	@git commit -m "ci: add GitHub Pages deploy workflow" || true
	@git push origin HEAD

sync-secrets:
	@echo "Syncing $(ENV_FILE) into GitHub repository secrets via gh"
	pwsh -NoProfile -ExecutionPolicy Bypass -File scripts/sync-env-secrets.ps1 -EnvPath "$(ENV_FILE)"

clean:
	@echo "Removing build artifacts..."
	-rm -rf $(EXPORT_DIR) .next .next-local node_modules
