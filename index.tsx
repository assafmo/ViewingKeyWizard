import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Avatar,
  makeStyles,
  createStyles,
  Theme,
  TextField,
  Badge,
} from "@material-ui/core";
import { Token, tokenList as localTokens } from "./tokens";
import { BroadcastMode, SigningCosmWasmClient } from "secretjs";
import { StdFee } from "secretjs/types/types";
import { Window as KeplrWindow } from "@keplr-wallet/types";
declare global {
  interface Window extends KeplrWindow {}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    avatar: {
      width: theme.spacing(2.8),
      height: theme.spacing(2.8),
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 10px",
    },
    smallAvatar: {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 10px",
    },
    customBadge: {
      backgroundColor: "transparent",
      color: "white",
    },
  })
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<{
    [address: string]: Token;
  }>({});
  const [selectedTokens, setSelectedTokens] = useState<Set<string>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  // const [myAddress, setMyAddress] = useState<string>(null);
  const [secretjs, setSecretjs] = useState<SigningCosmWasmClient>(null);
  const viewingKeyRef = useRef<{ value: string }>({ value: "" });

  useEffect(() => {
    const setupKeplr = async () => {
      const chainId = "secret-2";

      await window.keplr.enable(chainId);

      const keplrOfflineSigner = window.getOfflineSigner(chainId);
      const accounts = await keplrOfflineSigner.getAccounts();

      const myAddress = accounts[0].address;

      const secretjs = new SigningCosmWasmClient(
        "https://bridge-api-manager.azure-api.net/",
        myAddress,
        //@ts-ignore
        keplrOfflineSigner,
        window.getEnigmaUtils(chainId),
        null,
        BroadcastMode.Sync
      );

      // setMyAddress(myAddress);
      setSecretjs(secretjs);
    };

    setupKeplr();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const tokens: { [address: string]: Token } = {};
      for (const t of localTokens) {
        if (t.address in tokens) {
          console.error(`Duplicate tokens ${t} and ${tokens[t.address]}`);
        }
        if (t.type == "LP") {
          const [asset1, asset2] = t.name.split("-");

          if (asset1 === "uscrt" || asset2 === "uscrt") {
            const sscrt = asset1 === "uscrt" ? asset2 : asset1;
            tokens[t.address] = {
              address: t.address,
              name: `LP SCRT-sSCRT`,
              symbol: "",
              logo: JSON.stringify([tokens[sscrt].logo, tokens[sscrt].logo]),
              type: "LP",
            } as Token;
            continue;
          }

          if (!tokens[asset1] || !tokens[asset2]) {
            console.log(
              `Skipping LP token ${t.address} because ${asset1} or ${asset2} is unknown.`
            );
            continue;
          }

          tokens[t.address] = {
            address: t.address,
            name: `LP ${tokens[asset1].symbol}-${tokens[asset2].symbol}`,
            symbol: `${tokens[asset1].symbol}-${tokens[asset2].symbol}`,
            logo: `${asset1}-${asset2}`,
            type: "LP",
          } as Token;
          continue;
        } else if (t.type == "REWARDS") {
          const [lockToken, rewardsToken] = t.name.split(">");

          if (!tokens[lockToken] || !tokens[rewardsToken]) {
            console.log(
              `Skipping Rewards token ${t.address} because ${lockToken} or ${rewardsToken} is unknown.`
            );
            continue;
          }

          let lockTokenLogo = tokens[lockToken].address;
          if (tokens[lockToken].type === "LP") {
            lockTokenLogo = tokens[lockToken].logo;
          }
          tokens[t.address] = {
            address: t.address,
            name: `Rewards ${tokens[lockToken].symbol} ➜ ${tokens[rewardsToken].symbol}`,
            symbol: "",
            logo: `${lockTokenLogo}-${tokens[rewardsToken].logo}`,
            type: "REWARDS",
          } as Token;

          continue;
        }

        tokens[t.address] = Object.assign({}, t, {
          logo: `${window.location.origin}/${t.logo}`,
        });
      }

      setTokens(tokens);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCheckToken = (event) => {
    const address = event.target.name;
    setIsAllSelected(false);

    if (selectedTokens.has(address)) {
      setSelectedTokens(
        new Set(Array.from(selectedTokens).filter((a) => a !== address))
      );
    } else {
      setSelectedTokens(new Set(Array.from(selectedTokens).concat([address])));
    }
  };

  const handleCheckAll = (event) => {
    if (isAllSelected) {
      setSelectedTokens(new Set());
    } else {
      setSelectedTokens(new Set(Object.keys(tokens)));
    }
    setIsAllSelected(!isAllSelected);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Set Viewing Key"
          inputRef={viewingKeyRef}
          style={{ width: "25%" }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={selectedTokens.size === 0 || !secretjs || loading}
          onClick={async () => {
            setLoading(true);
            const numOfMsgs = selectedTokens.size;
            let gasPerMsg = 105_000;
            if (numOfMsgs >= 2) {
              gasPerMsg = 85_000;
            }
            if (numOfMsgs >= 5) {
              gasPerMsg = 68_000;
            }
            if (numOfMsgs >= 10) {
              gasPerMsg = 62_000;
            }
            if (numOfMsgs >= 15) {
              gasPerMsg = 58_000;
            }

            try {
              const { transactionHash } = await secretjs.multiExecute(
                Array.from(selectedTokens).map((contractAddress) => ({
                  contractAddress,
                  contractCodeHash: tokens[contractAddress].codeHash,
                  handleMsg: {
                    set_viewing_key: { key: viewingKeyRef.current.value },
                  },
                })),
                "",
                getFeeForExecute(numOfMsgs * gasPerMsg)
              );

              await new Promise((accept, reject) => {
                const interval = setInterval(async () => {
                  try {
                    const tx = await secretjs.restClient.txById(
                      transactionHash,
                      false
                    );
                    accept(tx);
                    clearInterval(interval);
                  } catch (error) {
                    console.error(error);
                  }
                }, 5000);
              });

              viewingKeyRef.current.value = "";
            } catch (e) {
              console.error(`Error: ${e.message}`);
              alert(`Error: ${e.message}`);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? <CircularProgress size="2em" /> : "Go"}
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              onChange={handleCheckAll}
              checked={isAllSelected}
            />
          }
          label={`Select all`}
        />
      </div>
      <hr />
      <div style={{ display: "flex " }}>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "SECRET")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleCheckToken}
              />
            ))}
        </div>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "ETH")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleCheckToken}
              />
            ))}
        </div>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "BSC")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleCheckToken}
              />
            ))}
        </div>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "LP")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleCheckToken}
              />
            ))}
        </div>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "REWARDS")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleCheckToken}
              />
            ))}
        </div>
      </div>
    </>
  );
}

const gasPriceUscrt = 0.25;
export function getFeeForExecute(gas: number): StdFee {
  return {
    amount: [
      { amount: String(Math.floor(gas * gasPriceUscrt) + 1), denom: "uscrt" },
    ],
    gas: String(gas),
  };
}

function TokenCheckBox({
  token,
  tokens,
  selectedTokens,
  handleCheckToken,
}: {
  token: Token;
  tokens: { [address: string]: Token };
  selectedTokens: Set<string>;
  handleCheckToken: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}) {
  if (!token) {
    return null;
  }

  const classes = useStyles();

  const { address, name, symbol, logo, type } = token;

  let label = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "0.3em" }}>
        <TokenLogo token={token} />
      </span>
      {symbol.length > 0 ? `${name} (${symbol})` : name}
    </div>
  );

  if (type == "LP") {
    const [token1, token2] = logo.split("-") as string[];

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "0.2em" }}>
          <TokenLogo token={tokens[token1]} />
        </span>
        <span style={{ marginRight: "0.3em" }}>
          <TokenLogo token={tokens[token2]} />
        </span>
        {name}
      </div>
    );
  } else if (type == "REWARDS") {
    const [a, b, c] = logo.split("-") as string[];

    const lockLogo1 = a;
    let lockLogo2: string;
    let rewardsLogo: string;

    if (c) {
      lockLogo2 = b;
      rewardsLogo = c;
    } else {
      rewardsLogo = b;
    }

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        {lockLogo2 ? (
          <>
            <span style={{ marginRight: "0.2em" }}>
              <TokenLogo token={tokens[lockLogo1]} />
            </span>
            <span>
              <TokenLogo token={tokens[lockLogo2]} />
            </span>
          </>
        ) : (
          <span>
            <TokenLogo token={tokens[lockLogo1]} />
          </span>
        )}
        {"➜"}
        <span style={{ marginRight: "0.3em" }}>
          <Avatar alt={name} src={rewardsLogo} className={classes.avatar} />
        </span>
        {name}
      </div>
    );
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            name={address}
            checked={selectedTokens.has(address)}
            onChange={handleCheckToken}
          />
        }
        label={label}
      />
    </div>
  );
}

function TokenLogo({ token }: { token: Token }) {
  if (!token) {
    return null;
  }

  const classes = useStyles();

  const { name, logo, type } = token;

  if (type === "SECRET") {
    return <Avatar alt={name} src={logo} className={classes.avatar} />;
  } else if (type === "ETH") {
    return (
      <Badge
        className={classes.customBadge}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <Avatar
            alt={name}
            src={window.location.origin + "/eth.png"}
            className={classes.smallAvatar}
          />
        }
      >
        <Avatar alt={name} src={logo} className={classes.avatar} />
      </Badge>
    );
  } else if (type === "BSC") {
    return (
      <Badge
        className={classes.customBadge}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <Avatar
            alt={name}
            src={window.location.origin + "/bnb.png"}
            className={classes.smallAvatar}
          />
        }
      >
        <Avatar alt={name} src={logo} className={classes.avatar} />
      </Badge>
    );
  } else {
    console.error(`getTokenLogo must be of type "SECRET" | "ETH" | "BSC"`);
    return null;
  }
}
