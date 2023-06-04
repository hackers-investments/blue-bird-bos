// Styling
const Theme = styled.div`
  ${fetch(
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
  ).body}
`;

// Constants
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const CHAIN_ID_MAP = {
  5: 'ETH_GOERLI',
  137: 'MATIC'
};

const NETWORK_CONFIGS = {
  ETH_GOERLI: {
    chainId: '0x5',
    chainName: 'Ethereum(Goerli)',
    currency: 'ETH',
    swap: '0x9d340f30af6de05a3909a52f4dcc9350ffb67ecb'
  },
  MATIC: {
    chainId: '0x89',
    chainName: 'Matic',
    currency: 'MATIC',
    swap: '0x7660397e9430ec65eba63684298482a48470d90a'
  }
};

const ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      }
    ],
    name: 'Canceled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      }
    ],
    name: 'Executed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'toChain',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'payToken',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'payTokenAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'buyToken',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'buyTokenAmount',
        type: 'uint256'
      }
    ],
    name: 'NewLock',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      }
    ],
    name: 'RequestCancel',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'recipientLockId',
        type: 'uint256'
      }
    ],
    name: 'SetRecipient',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'digest',
        type: 'bytes32'
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32'
      }
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'action',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'digest',
        type: 'bytes32'
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32'
      }
    ],
    name: 'checkSign',
    outputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'toChain',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'payToken',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'payTokenAmount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'buyToken',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'buyTokenAmount',
        type: 'uint256'
      }
    ],
    name: 'create',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'emitter',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'digest',
        type: 'bytes32'
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32'
      }
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'messageHash',
        type: 'bytes32'
      }
    ],
    name: 'getEthSignedHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'action',
        type: 'string'
      }
    ],
    name: 'hash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lockIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'locks',
    outputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'executed',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      }
    ],
    name: 'requesetCancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_emitter',
        type: 'address'
      }
    ],
    name: 'setEmitter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'recipientLockId',
        type: 'uint256'
      }
    ],
    name: 'setRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

// State Initialize
State.init({
  balance: 0,
  chainId: undefined,
  fromChainId: undefined,
  payAmount: '0.0001',
  toChainId: undefined,
  buyAmount: '0.0001',
  activeView: 'exchange',
  myOrders: [],
  listedOrders: [],
  interLockMyOrder: undefined,
  interLockCounterOrderId: undefined,
  err: undefined,
  result: ''
});

// prefetch
const sender = props.sender || Ethers.send('eth_requestAccounts', [])[0];
// if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

if (
  state.fromChainId === undefined &&
  Ethers.send('eth_requestAccounts', [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      if (res?.chainId && CHAIN_ID_MAP[res.chainId]) {
        State.update({
          chainId: res.chainId,
          fromChainId: res.chainId,
          toChainId: Object.keys(CHAIN_ID_MAP).filter(
            (x) => x !== res.chainId
          )[0]
        });
      } else {
        State.update({
          err: (
            <>
              <p>Unsupported Network. Available Networks below,</p>
              <p>{Object.values(CHAIN_ID_MAP).join(', ')}</p>
            </>
          )
        });
      }
    });
}

if (sender && state.fromChainId) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(5) });
    });
}

const ChainSelect = ({ chainIdState, chainIdMap }) => {
  return (
    <div className="input-group mb-3" style={{ height: '40px' }}>
      <button
        className="btn btn-outline-secondary dropdown-toggle w-100"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {CHAIN_ID_MAP[state[chainIdState]]}
      </button>
      <ul className="dropdown-menu">
        {Object.entries(chainIdMap).map(
          (
            [chainId, chainName],
            index // chainId, chainName
          ) => (
            <li key={index}>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  State.update({ [chainIdState]: chainId });
                }}
              >
                {chainName}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

const create = () => {
  const provider = Ethers.provider();
  const signer = provider.getSigner();
  console.log(state.fromChainId);
  const swap = new ethers.Contract(
    NETWORK_CONFIGS[CHAIN_ID_MAP[state.fromChainId]].swap,
    ABI,
    signer
  );

  const payAmountPow = ethers.utils
    .parseUnits(state.payAmount, 18)
    .toHexString();
  const buyAmountPow = ethers.utils
    .parseUnits(state.buyAmount, 18)
    .toHexString();
  swap.create(
    state.toChainId,
    ZERO_ADDRESS,
    payAmountPow,
    ZERO_ADDRESS,
    buyAmountPow,
    {
      value: payAmountPow
    }
  );
};

const loadMyOrders = () => {
  const myOrders = fetch(
    'https://api.studio.thegraph.com/query/47853/test/v0.0.1',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{
        newLocks(where: {owner: "${sender}"}) {
          lockId
          payToken
          payTokenAmount
          toChain
          buyToken
          buyTokenAmount
          owner
        }
      }`
      })
    }
  );
  State.update({ myOrders: myOrders.body.data.newLocks });
  if (!myOrders.ok) return 'Loading...';
};

const loadListedOrders = () => {
  const listedOrders = fetch(
    'https://api.studio.thegraph.com/query/47853/test/v0.0.1',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{
        newLocks(where: {and: [{owner_not: "${sender}"},{toChain: "${state.fromChainId}"}]}) {
          lockId
          payToken
          payTokenAmount
          toChain
          buyToken
          buyTokenAmount
          owner
        }
      }`
      })
    }
  );
  if (!listedOrders.ok) return 'Loading...';
  console.log(state.listedOrders);
  State.update({ listedOrders: listedOrders.body.data.newLocks });
};

loadMyOrders();
loadListedOrders();

return (
  <Theme>
    <div className="container-fluid">
      <div className="navbar bg-body-tertiary border rounded px-3 mb-3">
        <a className="navbar-brand" href="#">
          <h2>Blue Bird Bridge</h2>
        </a>
      </div>
      <div
        className="error_msg"
        style={{ display: state.err ? 'block' : 'none' }}
      >
        <div className="btn btn-warning w-100">{state.err}</div>
      </div>
      <div
        className="section"
        style={{ display: state.err ? 'none' : 'block' }}
      >
        <div className="row mb-3">
          <div className="col-12">
            <h3>My Account</h3>
          </div>
          <div className="col">
            <div className="border rounded p-3">
              <div>
                Address :{' '}
                <span className="badge text-bg-warning">
                  {sender.slice(0, 6)} ... {sender.slice(-4, sender.length)}
                </span>
              </div>
              <div>
                Balance : {state.balance}{' '}
                {NETWORK_CONFIGS[CHAIN_ID_MAP[state.chainId]].currency}
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div class="col-12">
            <button
              className={
                'btn ' +
                (state.activeView === 'exchange'
                  ? 'btn-warning'
                  : 'btn-secondary') +
                ' w-50'
              }
              style={{
                borderTopRightRadius: '0',
                borderBottomRightRadius: '0',
                float: 'left'
              }}
              onClick={() => {
                State.update({ activeView: 'exchange' });
              }}
            >
              Exchange
            </button>
            <button
              className={
                'btn ' +
                (state.activeView === 'dashboard'
                  ? 'btn-warning'
                  : 'btn-secondary') +
                ' w-50'
              }
              style={{
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
                float: 'left'
              }}
              onClick={() => {
                State.update({ activeView: 'dashboard' });
              }}
            >
              Dashboard
            </button>
          </div>
        </div>
        <div
          className="exchange"
          style={{
            display: state.activeView === 'exchange' ? 'block' : 'none'
          }}
        >
          <div className="row mb-3">
            <div className="col-12">
              <h3>Make Order</h3>
            </div>
            <div className="col">
              <div className="border rounded p-3">
                <div className="row">
                  {/* TODO : MAKE ORDER */}
                  <div className="row">
                    <div className="col-6">
                      <h4>From</h4>
                      {ChainSelect({
                        chainIdState: 'fromChainId',
                        chainIdMap: CHAIN_ID_MAP
                      })}
                    </div>
                    <div className="col-6">
                      <h4>
                        Amount (
                        {
                          NETWORK_CONFIGS[CHAIN_ID_MAP[state.fromChainId]]
                            .currency
                        }
                        )
                      </h4>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="amount to transfer"
                        value={state.payAmount}
                        onChange={(e) => {
                          State.update({ payAmount: e.target.value });
                        }}
                        onFocus
                      />
                    </div>
                    <div className="col-6">
                      <h4>To</h4>
                      {ChainSelect({
                        chainIdState: 'toChainId',
                        chainIdMap: CHAIN_ID_MAP
                      })}
                    </div>
                    <div className="col-6">
                      <h4>
                        Amount (
                        {
                          NETWORK_CONFIGS[CHAIN_ID_MAP[state.toChainId]]
                            .currency
                        }
                        )
                      </h4>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="amount to transfer"
                        value={state.buyAmount}
                        onChange={(e) => {
                          State.update({ buyAmount: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-warning w-100"
                      onClick={() => {
                        create();
                      }}
                    >
                      Place New Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <h3>Listed Orders</h3>
              {state.listedOrders.map((order) => (
                <div className="col-12 mb-2">
                  <div className="border rounded p-3">
                    <div className="row">
                      <div className="col-9">
                        <div>order_id : {order.lockId}</div>
                        {/**/}
                        <div>
                          {' '}
                          Paying{' '}
                          {Big(order.payTokenAmount)
                            .div(Big(10).pow(18))
                            .toFixed(6)}{' '}
                          {
                            NETWORK_CONFIGS[CHAIN_ID_MAP[order.toChain]]
                              .currency
                          }{' '}
                          from {CHAIN_ID_MAP[order.toChain]}
                        </div>
                        <div>
                          {' '}
                          Buying{' '}
                          {Big(order.buyTokenAmount)
                            .div(Big(10).pow(18))
                            .toFixed(6)}{' '}
                          {
                            NETWORK_CONFIGS[CHAIN_ID_MAP[state.chainId]]
                              .currency
                          }{' '}
                          from {CHAIN_ID_MAP[parseInt(state.chainId)]}
                        </div>
                        <div>owner: {order.owner}</div>
                      </div>
                      <div className="col-3">
                        <button
                          className="btn btn-primary w-100 mb-2"
                          style={{
                            float: 'center'
                          }}
                          onClick={() => {
                            setRecipient(order.lockId);
                          }}
                        >
                          Take
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="dashboard"
          style={{
            display: state.activeView === 'dashboard' ? 'block' : 'none'
          }}
        >
          <div className="row mb-3">
            <div className="col-12">
              <h3>My Orders</h3>
              <div className="row">
                {state.myOrders.map((order) => (
                  <div className="col-12 mb-2">
                    <div className="border rounded p-3">
                      <div className="row">
                        <div className="col-9">
                          <div>order_id : {order.lockId}</div>
                          <div>
                            {' '}
                            Paying{' '}
                            {Big(order.payTokenAmount)
                              .div(Big(10).pow(18))
                              .toFixed(6)}{' '}
                            {
                              NETWORK_CONFIGS[CHAIN_ID_MAP[state.chainId]]
                                .currency
                            }{' '}
                            from {CHAIN_ID_MAP[state.chainId]}
                          </div>
                          <div>
                            {' '}
                            Buying{' '}
                            {Big(order.buyTokenAmount)
                              .div(Big(10).pow(18))
                              .toFixed(6)}{' '}
                            {
                              NETWORK_CONFIGS[CHAIN_ID_MAP[order.toChain]]
                                .currency
                            }{' '}
                            from {CHAIN_ID_MAP[parseInt(order.toChain)]}
                          </div>
                          <div>Owner : {order.owner} </div>
                        </div>
                        <div className="col-3">
                          <button
                            className="btn btn-danger w-100"
                            style={{
                              float: 'center'
                            }}
                            onClick={() => {
                              State.update({ activeView: 'exchange' });
                            }}
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.result}
    </div>
  </Theme>
);
