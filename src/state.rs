use solana_program::{
    program_pack::{IsInitialized, Sealed},
};
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct MovieInfo {
    pub is_initialized: bool,
    pub rating: u8,
    pub title: String,
    pub description: String,
}

impl Sealed for MovieInfo {}

impl IsInitialized for MovieInfo {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}
