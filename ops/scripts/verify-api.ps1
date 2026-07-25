param(
  [string]$BaseUrl = "http://localhost:3000",
  [string]$SessionCookie = ""
)

$headers = @{}
if ($SessionCookie) {
  $headers["Cookie"] = $SessionCookie
}

$checks = @(
  @{ Name = "Auth session"; Method = "GET"; Url = "/api/auth/session"; Expected = @(200) },
  @{ Name = "Customer dashboard"; Method = "GET"; Url = "/api/customer/dashboard"; Expected = @(200, 401) },
  @{ Name = "Admin dashboard"; Method = "GET"; Url = "/api/admin/dashboard/live"; Expected = @(200, 401, 403) },
  @{ Name = "Product catalog"; Method = "GET"; Url = "/api/product-catalog/products"; Expected = @(200, 401, 403) },
  @{ Name = "QR plant passports"; Method = "GET"; Url = "/api/plant-passports"; Expected = @(200, 401, 403) },
  @{ Name = "Booking persistence"; Method = "POST"; Url = "/api/bookings"; Expected = @(201); Body = @{ name = "Demo Visitor"; phone = "9000000099"; city = "Mumbai"; service = "Garden Visit"; message = "Please schedule a production verification garden visit." } },
  @{ Name = "Contact persistence"; Method = "POST"; Url = "/api/enquiries"; Expected = @(201); Body = @{ name = "Demo Enquiry"; phone = "9000000098"; city = "Mumbai"; service = "Garden Maintenance"; message = "Please contact me for Garden Live production verification." } }
)

$results = foreach ($check in $checks) {
  try {
    $params = @{
      Uri = "$BaseUrl$($check.Url)"
      Method = $check.Method
      Headers = $headers
      UseBasicParsing = $true
      TimeoutSec = 30
      MaximumRedirection = 0
    }
    if ($check.Body) {
      $params.Body = ($check.Body | ConvertTo-Json -Depth 8)
      $params.ContentType = "application/json"
    }
    $response = Invoke-WebRequest @params
    [pscustomobject]@{ Name = $check.Name; Status = $response.StatusCode; Passed = $check.Expected -contains $response.StatusCode }
  } catch {
    $response = $_.Exception.Response
    $status = if ($response) { [int]$response.StatusCode } else { "ERR" }
    [pscustomobject]@{ Name = $check.Name; Status = $status; Passed = $check.Expected -contains $status }
  }
}

$results | Format-Table -AutoSize
if ($results.Passed -contains $false) {
  exit 1
}
