console.log("Hello via Bun!");
import {callMe, sum} from "@demo-1/rustacean" // rs plugin
import {greet} from "@demo-1/wasmjs/pkg/wasmjs" // wasm plugin

callMe()
console.log(sum(1,2))   
greet()