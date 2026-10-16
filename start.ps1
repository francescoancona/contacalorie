$port = 5173
$url = "http://localhost:$port/ContaCalorie/"

Write-Host "Avvio ContaCalorie su $url ..." -ForegroundColor Cyan

# Avvia vite in background e salva il PID
$proc = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -PassThru -WindowStyle Hidden

# Salva il PID su file per lo stop
$proc.Id | Out-File -FilePath "$PSScriptRoot\.vite.pid" -Encoding utf8

Write-Host "Server avviato (PID: $($proc.Id)). Attendo che sia pronto..." -ForegroundColor Yellow

# Aspetta che il server risponda (max 15s)
$ready = $false
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Milliseconds 500
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
        $ready = $true
        break
    } catch {}
}

if ($ready) {
    Write-Host "Server pronto. Apro il browser..." -ForegroundColor Green
    Start-Process $url
} else {
    Write-Host "Server non risponde dopo 15s. Controlla manualmente su $url" -ForegroundColor Red
}
