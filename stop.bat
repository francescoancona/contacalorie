@echo off
echo Fermo il server...
taskkill /F /IM node.exe >nul 2>&1
if errorlevel 1 (
    echo Nessun server in esecuzione.
) else (
    echo Server fermato.
)
