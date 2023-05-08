const AugustusRFQ_ABI = require('./AugustusRFQ_ABI.json')
const { Contract } =  require("@ethersproject/contracts");
const { JsonRpcProvider } =  require("@ethersproject/providers");

const AugustusRFQ_ADDRESS = '0xe92b586627ccA7a83dC919cc7127196d70f55a06';

const JSON_RPC = 'https://1rpc.io/eth';

const crawlEvents = async () => {
    const rpcProvider = new JsonRpcProvider(JSON_RPC);
    const factoryContract = new Contract(
        AugustusRFQ_ADDRESS,
        AugustusRFQ_ABI,
        rpcProvider
    );

    const fromBlock = 17170000;
    const toBlock = 17180000;
    // Fetch events data
    const events = await factoryContract.queryFilter(
        'OrderFilled',
        fromBlock,
        toBlock
    );

    console.log(events);
  }

  crawlEvents();