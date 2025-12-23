$css = (Invoke-WebRequest -Uri 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' -UseBasicParsing).Content
$matches = [regex]::Matches($css,'url\((https:[^)]+\.ttf)\)')
New-Item -ItemType Directory -Force -Path 'docs\assets\fonts' | Out-Null
foreach($m in $matches) {
  $u = $m.Groups[1].Value
  $fn = [IO.Path]::GetFileName($u)
  Write-Host "Downloading $fn from $u"
  Invoke-WebRequest -Uri $u -OutFile (Join-Path 'docs\\assets\\fonts' $fn) -UseBasicParsing
}
# replace URLs in fonts.css to local
$cssLocal = [regex]::Replace($css,'url\((https:[^)]+\.ttf)\)',{param($m) $fn=[IO.Path]::GetFileName($m.Groups[1].Value); "url('/HarmonIQ/assets/fonts/$fn')"})
Set-Content -Path 'docs\assets\fonts\fonts.css' -Value $cssLocal -Encoding UTF8
Write-Host 'Downloaded fonts and updated fonts.css'
Get-ChildItem docs\assets\fonts | ForEach-Object { Write-Host $_.Name }
