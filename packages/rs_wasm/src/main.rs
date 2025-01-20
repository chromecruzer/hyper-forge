mod api;

use api::{delete_route, get_route, post_data, put_data};
use database::{Database, Status};

fn main() {
    println!("Hello, You are in Shyam's MonoRepo dude");
    let mut foo = Database::new(
        Status::Connected,
        "localhost".to_string(),
        5431,
        "tracdb".to_string(),
    );
    foo.display_stats();
    println!("{}", foo.mutable_demo("tracaudischema"));
    post_data();
    put_data();
    delete_route();
    get_route();
}
