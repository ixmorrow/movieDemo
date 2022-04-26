# Favorite Movies
This program is currently deployed on the Solana Devnet at [Program ID: CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN](https://explorer.solana.com/address/CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN?cluster=devnet)

The purpose of this program is to provide another example program for the students to interact with in the demo portion of the serialization, deserializaion, and pagination sections.

The program accepts a few different inputs from the user
  * movie title
  * description of the movie
  * rating (out of 5)

## Testing
To run the testing script, you will have to 'NPM Install' the dependencies. Once you've installed the dependencies, running 'npm start' inside the /js dir will compile and run the 'exampleDemo.ts' file.

If you make changes to the ts file, all you need to do is save and run 'npm start' again.

## Program Updates
The program is currently deployed to devnet. If we want to make changes to the program side code either I will have to implement these changes and then re-deploy the program to the same program id or someone else can make the changes and deploy them to a new program id. Only the initial author has the authority to push updates to a program at a specific program id.
