// import Web3 from "web3";
// window.ethereum.request({ method: "eth_requestAccounts" });
// const web3 = new Web3(window.ethereum);
// export default web3;

import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} 
else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/55fd7abc8f764213b421f6cd929577d5'
  );
  web3 = new Web3(provider);
}
 
export default web3;