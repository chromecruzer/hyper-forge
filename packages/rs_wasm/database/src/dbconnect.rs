#![allow(dead_code)]

#[derive(Debug)]
pub enum Status {
    Connected,
    Disconnected,
    Failed,
}

pub struct Database {
    status: Status,
    host: String,
    port: i16,
    db: String,
}

impl Database {
    pub fn new(status: Status, host: String, port: i16, db: String) -> Database {
        Database {
            status,
            host,
            port,
            db,
        }
    }

    pub fn display_stats(&self) {
        println!(
            "db = {}, port = {}, host = {}, status= {:?}",
            self.db, self.port, self.host, self.status
        )
    }
    pub fn mutable_demo(&mut self, val: &str) -> String {
        self.db = val.to_string();
        format!("Mutable call dude Db name Modified Safely to -->>{}", self.db)
    }
}
