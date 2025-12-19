// Test different import methods for cyborgdb
console.log("Testing cyborgdb imports...");

// Method 1: Default import
import cyborgdb from "cyborgdb";
console.log("Default import:", cyborgdb);
console.log("Keys:", Object.keys(cyborgdb));

// Method 2: Named import
import * as pkg from "cyborgdb";
console.log("\nNamespace import:", pkg);
console.log("Keys:", Object.keys(pkg));
