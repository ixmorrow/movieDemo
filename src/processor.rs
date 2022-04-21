use solana_program::{
    log::sol_log_compute_units,
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    program_error::ProgramError,
    msg,
    pubkey::Pubkey,
    sysvar::{rent::Rent, Sysvar},borsh::try_from_slice_unchecked,
    system_program::ID as SYSTEM_PROGRAM_ID,
    system_instruction,
    program::{invoke_signed},
    program_pack::{IsInitialized},
};
use crate::{instruction::IntroInstruction, state::MovieInfo};
use crate::{error::IntroError};
use borsh::{ BorshDeserialize, BorshSerialize };


pub struct Processor;

pub fn assert_with_msg(statement: bool, err: ProgramError, msg: &str) -> ProgramResult {
    if !statement {
        msg!(msg);
        Err(err)
    } else {
        Ok(())
    }
}

impl Processor {
    pub fn process_instruction(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        sol_log_compute_units();
        let instruction = IntroInstruction::unpack(instruction_data)?;
        let account_info_iter = &mut accounts.iter();

        match instruction {
        IntroInstruction::InitMovieRating {movie, rating, message}  => {
            msg!("Initialize movie rating account");
            let initializer = next_account_info(account_info_iter)?;

            if !initializer.is_signer {
                msg!("Initializer is not signer");
                return Err(ProgramError::MissingRequiredSignature);
            }

            let user_account = next_account_info(account_info_iter)?;
            let system_program = next_account_info(account_info_iter)?;
            
            msg!("finding pda");
            let (pda, bump_seed) = Pubkey::find_program_address(&[initializer.key.as_ref(),], program_id);
            msg!("pda: {}", pda);

            let account_len: usize = 1 + 1 + (4 + movie.len()) + (4 + message.len());
            let rent = Rent::get()?;
            let rent_lamports = rent.minimum_balance(account_len);

            msg!("initializing account at pda");
            invoke_signed(
                    &system_instruction::create_account(
                    initializer.key,
                    user_account.key,
                    rent_lamports,
                    account_len.try_into().unwrap(),
                    program_id,
                ),
                &[initializer.clone(), user_account.clone(), system_program.clone()],
                &[&[initializer.key.as_ref(), &[bump_seed]]],
            )?;

            assert_with_msg(
                *system_program.key == SYSTEM_PROGRAM_ID,
                ProgramError::InvalidArgument,
                "Invalid passed in for system program",
            )?;
            assert_with_msg(
                pda == *user_account.key,
                ProgramError::InvalidArgument,
                "Invalid PDA seeds for user account",
            )?;

            msg!("Movie: {}", movie);
            if !rent.is_exempt(user_account.lamports(), user_account.data_len()) {
                msg!("user account is not rent exempt");
                return Err(IntroError::NotRentExempt.into());
            }
            msg!("unpacking state account");
            let mut account_data = try_from_slice_unchecked::<MovieInfo>(&user_account.data.borrow()).unwrap();
            msg!("borrowed account data");

            msg!("checking if user account is already initialized");
            if account_data.is_initialized() {
                msg!("Account already initialized");
                return Err(ProgramError::AccountAlreadyInitialized);
            }

            account_data.movie = movie;
            account_data.rating = rating;
            account_data.message = message;
            account_data.is_initialized = true;
            
            msg!("serializing account");
            account_data.serialize(&mut &mut user_account.data.borrow_mut()[..])?;
            msg!("state account serialized");

            sol_log_compute_units();

        }
    }
    
    Ok(())
}}