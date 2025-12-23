try {
  Write-Host 'Starting font download'
  $css = (Invoke-WebRequest -Uri 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' -UseBasicParsing -ErrorAction Stop).Content
  $matches = [regex]::Matches($css,'url\((https:[^)]+\.woff2)\)')
  New-Item -ItemType Directory -Force -Path 'docs\assets\fonts' | Out-Null
  foreach($m in $matches) {
    $u = $m.Groups[1].Value
    $fn = [IO.Path]::GetFileName($u)
    Write-Host "Downloading $fn from $u"
    Invoke-WebRequest -Uri $u -OutFile (Join-Path 'docs\\assets\\fonts' $fn) -UseBasicParsing -ErrorAction Stop
  }
  $modified = [regex]::Replace($css,'url\((https:[^)]+\.woff2)\)',{param($m) $fn=[IO.Path]::GetFileName($m.Groups[1].Value); "url('/HarmonIQ/assets/fonts/$fn')"})
  Set-Content -Path 'docs\assets\fonts\fonts.css' -Value $modified -Encoding UTF8
  Write-Host 'fonts.css created'
  Write-Host 'Files in docs/assets/fonts:'
  Get-ChildItem -Path 'docs\assets\fonts' | ForEach-Object { Write-Host $_.Name }
} catch {
  Write-Host 'Error:' $_.Exception.Message
}
