@echo off
echo Avvio ContaCalorie...

start /B npm run dev > .vite.log 2>&1

echo Attendo che il server sia pronto...
:wait
timeout /t 1 /nobreak >nul
curl -s http://localhost:5173/ContaCalorie/ >nul 2>&1
if errorlevel 1 goto wait

echo Server pronto. Apro il browser...
start http://localhost:5173/ContaCalorie/
