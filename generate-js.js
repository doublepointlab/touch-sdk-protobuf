const pbjs = require("protobufjs-cli/pbjs");
const fs = require("fs");
const path = require("path");

// Adjust file paths here as needed
const protoDir = "proto";
const outFile = "gen/js/watch_protobuf.js";

// List all .proto files to include
const protoFiles = [
  "watch_input.proto",
  "watch_output.proto",
  "common.proto"
].map(file => path.join(protoDir, file));

pbjs.main(["--target", "static-module", ...protoFiles], (err, output) => {
  if (err) {
    console.error("pbjs error:", err);
    process.exit(1);
  }

  fs.writeFile(outFile, output, err => {
    if (err) {
      console.error("fs write error:", err);
      process.exit(1);
    }
    console.log("JavaScript protobuf file generated:", outFile);
  });
});
