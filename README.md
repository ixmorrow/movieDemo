# Favorite Movies
This program is currently deployed on the Solana Devnet at [Program ID: 4X5hVHsHeGHjLEB9hrUqQ57sEPcYPPfW54fndmQrsgCF](https://explorer.solana.com/address/4X5hVHsHeGHjLEB9hrUqQ57sEPcYPPfW54fndmQrsgCF?cluster=devnet)

The purpose of this program is to provide another example program for the students to interact with in the demo portion of the serialization, deserializaion, and pagination sections.

The program accepts a few different inputs from the user
  * movie title
  * description of the movie
  * rating (out of 5)

## Testing
To run the testing script, you will have to 'NPM Install' the dependencies, compile the ts file to js by running npx tsc within the js directory, and then a /dist directory will be added with the compiled js file in it. Move into that directory and run 'node exampleDemo.js'.

If you make changes to the ts file, then you will have re-compile it to js with the command 'npx tsc' and then follow the step above to run the newly compiled js file.

## Program Updates
The program is currently deployed to devnet. If we want to make changes to the program side code either I will have to implement these changes and then re-deploy the program to the same program id or someone else can make the changes and deploy them to a new program id. Only the initial author has the authority to push updates to a program at a specific program id.
