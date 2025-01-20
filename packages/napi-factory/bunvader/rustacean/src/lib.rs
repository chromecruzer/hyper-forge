#![deny(clippy::all)]

use std::fs;

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
  a + b
}

#[napi]
pub fn call_me() {
  println!("Your are a Gay..!");
}

#[napi]
pub fn fibonacci(n: u32) -> u32 {
  if n <= 1 {
    return n;
  }
  fibonacci(n - 1) + fibonacci(n - 2)
}

#[napi]
pub fn read_file(path: String) -> Result<String, napi::Error> {
  let content = fs::read_to_string(path).map_err(|e| napi::Error::from_reason(e.to_string()))?;
  Ok(content)
}
