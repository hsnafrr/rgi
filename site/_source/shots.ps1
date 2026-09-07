# Render full-page screenshots of the RGI site with headless Chromium.
# Usage: powershell -File _source/shots.ps1 -Page index.html -Width 1440 -Height 9600 -Out shot.png
param(
  [string]$Page = "index.html",
  [int]$Width = 1440,
  [int]$Height = 9600,
  [string]$Out = "$env:TEMP\rgi_shot.png",
  [string]$Base = "http://localhost:5183"
)
$ch = "$env:LOCALAPPDATA\ms-playwright\chromium_headless_shell-1148\chrome-win\headless_shell.exe"
& $ch --disable-gpu --hide-scrollbars --force-prefers-reduced-motion `
      --virtual-time-budget=12000 --window-size="$Width,$Height" `
      --screenshot="$Out" "$Base/$Page" 2>&1 | Out-Null
if (Test-Path $Out) { "OK $Out" } else { "FAILED" }
