const {
  apiHost,
  verifyNetworkId,
  verifyChainId,
  verifySenderAcctOffline,
  verifyReceiverAcctOffline,
  verifyReceiverPublicKeyOffline,
  verifyAmountOffline,
  verifySenderPublicKey,
  verifySenderPrivateKey,
  printPreview,
  askContinue,
  askReview,
  printCurlCmd,
  exit,
} = require("../util/verify.js");
const crypto = require('crypto');
const Pact = require("pact-lang-api");

const { transfer, transferCreate } = require("../util/create-cmd.js");

const main = async () => {
 let networkId, chainId, senderAcct, receiverAcct, receiverPublicKey, amount, senderPublicKey, senderPrivateKey;
 await runOfflineTransferCreate(networkId, chainId, senderAcct, receiverAcct, receiverPublicKey, amount, senderPublicKey, senderPrivateKey)
 exit();
}

async function runOfflineTransferCreate(networkId, chainId, senderAcct, receiverAcct, receiverPublicKey, amount, senderPublicKey, senderPrivateKey) {
  networkId = await verifyNetworkId(networkId);
  chainId = await verifyChainId(chainId);
  const host = apiHost("localhost:9999", networkId, chainId)
  senderAcct = await verifySenderAcctOffline(senderAcct);
  //receiverAcct = await verifyReceiverAcctOffline(receiverAcct);
  //receiverPublicKey = await verifyReceiverPublicKeyOffline(receiverAcct, receiverPublicKey);
  //amount = await verifyAmountOffline(senderAcct, receiverAcct, amount);
  const receiverGuard = {
    pred: 'keys-all',
    keys: [receiverPublicKey]
  }
  senderPublicKey =  await verifySenderPublicKey(senderAcct, senderPublicKey);
  senderPrivateKey = await verifySenderPrivateKey(senderAcct, senderPrivateKey);
  //await askReview(chainId, senderAcct, receiverAcct, amount, receiverGuard);
  //while(True){
    receiverAcct = crypto.randomBytes(32).toString("hex");
    receiverPublicKey = receiverAcct;
    var res = await transferCreate.fetch(senderAcct, senderPublicKey, senderPrivateKey, receiverAcct, receiverPublicKey, 0.0001, chainId, networkId, host);
  console.log(res);
    //printCurlCmd(transfer.send(senderAcct, senderPublicKey, senderPrivateKey, receiverAcct, 0.0001, chainId, networkId), host);
  //}
}

main();
