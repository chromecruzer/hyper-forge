//use std::fs;

#[warn(dead_code)]
fn main() {
  #[allow(dead_code)]

  pub fn sum(a: i32, b: i32) -> i32 {
    let added_val = a + b;
    added_val
  }

  pub fn call_me() {
    println!("Your are a Gay..!");
  }

  
  pub fn fibonacci(n: u32) -> u128 {
    if n <= 1 {
      return n.into();
    }
    fibonacci(n - 1) + fibonacci(n - 2)
  }

  // pub fn read_file(path: String) -> Result<String, napi::Error> {
  //   let content = fs::read_to_string(path)
  //       .map_err(|e| napi::Error::from_reason(e.to_string()))?;
  //   Ok(content)
  // }

  println!("{}", sum(2, 9));
  call_me();
  println!("{:?}",fibonacci(50));
  //read_file()
}
