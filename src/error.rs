use solana_program::{decode_error::DecodeError, program_error::ProgramError};
use thiserror::Error;

/// Errors that may be returned by the TokenLending program.
#[derive(Clone, Debug, Eq, Error, PartialEq)]
pub enum IntroError{
    // 0
    /// Invalid instruction data passed in.
    #[error("Invalid instruction")]
    InstructionUnpackError,
    // 1
    // Account already initialized
    #[error("Cannot initialize account")]
    AlreadyInitialized,
    // 2
    // Account is not rent exempt
    #[error("Account is not rent exempt")]
    NotRentExempt,
    // 3
    // Failed to deserialize state account
    #[error("Error deserializing state account")]
    DeserializationFailure,
    // 4
    // Error in unpack from slice
    #[error("Error in unpack from slice of state account")]
    UnpackFromSliceError,
    // 5
    // Error in processing function
    #[error("Error processing instruction")]
    ProcessInstructionError,
}

impl From<IntroError> for ProgramError {
    fn from(e: IntroError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

impl<T> DecodeError<T> for IntroError {
    fn type_of() -> &'static str {
        "Student Intro Error"
    }
}