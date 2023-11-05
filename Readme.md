# Capture the Block 

## contract
To run this project, you will install the contract on 3 different servers. 
currently it runs just on localhost but there are stubs to set it up to run 
on three sepereate networks. 
```
npm run deploy
```

## TV 
CaptureTV is an angular project that will watch your different servers. It has test controls at the bottom that will you will be able to toggle off with the change of a bool. 

* there is an odd error that occurs after a long time sitting.  Need to look further into that. 

## Main 
This is the main Angular app the students will work with to connect their wallets and try to take over the 3 networks using the big button. 

## Backend 
This server is set up to give the student a random server to start with along with some test eth to get them started. 

* Need to make sure that the faucet gets money from everyone to the user. 
* Need to shift the minting of the tokens to a one time welcome mint 