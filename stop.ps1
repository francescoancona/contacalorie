$pidFile = "$PSScriptRoot\.vite.pid"

if (Test-Path $pidFile) {
    $savedPid = Get-Content $pidFile -Raw | ForEach-Object { $_.Trim() }
    try {
        Stop-Process -Id $savedPid -Force -ErrorAction Stop
        Write-Host "Server fermato (PID: $savedPid)." -ForegroundColor Green
    } catch {
        Write-Host "Processo $savedPid non trovato (potrebbe essere gia' fermo)." -ForegroundColor Yellow
    }
    Remove-Item $pidFile -Force
} else {
    # Fallback: termina tutti i processi node legati a vite
    $procs = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($procs) {
        $procs | Stop-Process -Force
        Write-Host "Fermati $($procs.Count) processo/i node." -ForegroundColor Green
    } else {
        Write-Host "Nessun server in esecuzione trovato." -ForegroundColor Yellow
    }
}
