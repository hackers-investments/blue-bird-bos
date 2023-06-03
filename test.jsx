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
    currency: 'ETH'
  },
  MATIC: {
    chainId: '0x89',
    chainName: 'Matic',
    currency: 'MATIC'
  }
};

const ABI = [
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
    stateMutability: 'payable',
    type: 'function',
    name: 'create'
  }
];

const BB_SWAP = '0x9D340f30aF6dE05A3909a52F4Dcc9350Ffb67ecB';

// State Initialize
State.init({
  balance: 0,
  chainId: undefined,
  fromChainId: undefined,
  payAmount: 1,
  toChainId: 'Matic',
  buyAmount: 1,
  activeView: 'exchange',
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
          toChainId: Object.keys(CHAIN_ID_MAP).filter((x) => x !== chainId)[0]
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

  const swap = new ethers.Contract(
    '0x9d340f30af6de05a3909a52f4dcc9350ffb67ecb',
    ABI,
    signer
  );
  State.update({ result: typeof Big(state.payAmount) });
  const payAmountPow = ethers.utils
    .parseUnits(state.payAmount, tokenDecimals)
    .toHexString();
  // const buyAmountPow = Big(state.buyAmount).mul(Big(10).Pow(18));
  // swap.create(
  //   state.toChainId,
  //   ZERO_ADDRESS,
  //   payAmountPow,
  //   ZERO_ADDRESS,
  //   buyAmountPow,
  //   {
  //     value: payAmountPow,
  //   }
  // );
};

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
              className="btn btn-warning w-50"
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
              className="btn btn-secondary w-50"
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
                        type="number"
                        className="form-control"
                        value={payAmount}
                        placeholder="amount to transfer"
                        onChange={(e) => {
                          State.update({ payAmount: e.target.value });
                        }}
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
                        type="number"
                        className="form-control"
                        value={buyAmount}
                        placeholder="amount to transfer"
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
            </div>
            <div className="col">
              <div className="border rounded p-3">
                <div>Address : {sender}</div>
                <div>Balance : {state.balance} ETH</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="dashboard"
          style={{
            display: state.activeView === 'dashboard' ? 'block' : 'none'
          }}
        >
          dashabord view
        </div>
      </div>
      {state.result}
    </div>
  </Theme>
);
