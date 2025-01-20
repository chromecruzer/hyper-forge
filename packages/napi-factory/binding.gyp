{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ],
      "include_dirs": [
        "<!@(node -e \"console.log(require('node-addon-api').include)\")"
      ],
      "cflags!": [ "-DNAPI_CPP_EXCEPTIONS=1" ],  
      "cflags!": [ "-DNAPI_DISABLE_CPP_EXCEPTIONS=1" ],
      "cflags_cc": ["/EHsc"],
      "defines": ["NAPI_CPP_EXCEPTIONS"]
    }
  ]
}
