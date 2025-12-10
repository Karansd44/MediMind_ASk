# PowerShell script for testing Gemini API

$apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
$apiKey = "AIzaSyCETKavjf6ZJdPYtmmbZdl_1s1HNLQ7Ddo"

$headers = @{
    "Content-Type" = "application/json"
    "X-goog-api-key" = $apiKey
}

$body = @{
    "contents" = @(
        @{
            "parts" = @(
                @{
                    "text" = "Explain how AI works in a few words"
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

Write-Host "Sending request to Gemini API..."
$response = Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers -Body $body -ContentType "application/json"
Write-Host "Response received!"
Write-Host "-----------------"
Write-Host "AI's response:" -ForegroundColor Green
Write-Host $response.candidates[0].content.parts[0].text
Write-Host "-----------------"
Write-Host "Full response data:" -ForegroundColor Yellow
$response | ConvertTo-Json -Depth 10