$compress = @{
    Path = "autoload.js", "icon.png", "manifest.json", "options.html", "options.js"
    CompressionLevel = "Fastest"
    DestinationPath = "extension.zip"
  }
  Compress-Archive @compress