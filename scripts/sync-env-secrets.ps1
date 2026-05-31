 [CmdletBinding(SupportsShouldProcess = $true)]
param(
  [Parameter(Mandatory = $false)]
  [string]$EnvPath = "frontend/.env.local"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $EnvPath)) {
  throw "No se encontró el archivo de entorno: $EnvPath"
}

if (-not $WhatIfPreference) {
  $gh = Get-Command gh -ErrorAction SilentlyContinue
  if (-not $gh) {
    throw "GitHub CLI (gh) no está instalado o no está en PATH. Instálalo antes de sincronizar secrets."
  }
}

$entries = Get-Content -LiteralPath $EnvPath | Where-Object {
  $_.Trim() -and -not $_.TrimStart().StartsWith('#')
}

foreach ($entry in $entries) {
  $pair = [regex]::Match($entry, '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$')
  if (-not $pair.Success) {
    continue
  }

  $name = $pair.Groups[1].Value
  $value = $pair.Groups[2].Value

  if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
    $value = $value.Substring(1, $value.Length - 2)
  }

  Write-Host "Setting secret $name"
  if ($PSCmdlet.ShouldProcess($name, "gh secret set")) {
    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
      throw "GitHub CLI (gh) no está instalado o no está en PATH."
    }
    & gh secret set $name --body $value | Out-Null
  }
}