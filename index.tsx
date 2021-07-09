import React, { useRef, useState, useEffect } from "react";
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
  })
);

const chainId = "secret-2";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

function App() {
  const classes = useStyles();

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

      const tokens = {};
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
            symbol: "",
            logo: JSON.stringify([tokens[asset1].logo, tokens[asset2].logo]),
            type: "LP",
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
        }}
      >
        <TextField label="Viewing Key" inputRef={viewingKeyRef} />
        <Button
          variant="contained"
          color="primary"
          disabled={Object.keys(tokens).length === 0 || !secretjs || loading}
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
          Go nuts
        </Button>
        {loading && (
          <CircularProgress size="2em" style={{ marginLeft: "0.3em" }} />
        )}
      </div>
      <div>
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
      {Object.keys(tokens).map((addr) => {
        const { address, name, symbol, logo, type } = tokens[addr];

        let label = (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "0.3em" }}>
              <Avatar alt={name} src={logo} className={classes.avatar} />
            </span>
            {`${name} (${symbol})`}
          </div>
        );
        if (type == "LP") {
          const [logo1, logo2] = JSON.parse(logo) as string[];

          label = (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "0.1em" }}>
                <Avatar alt={name} src={logo1} className={classes.avatar} />
              </span>
              <span style={{ marginRight: "0.3em" }}>
                <Avatar alt={name} src={logo2} className={classes.avatar} />
              </span>
              {name}
            </div>
          );
        }

        return (
          <div key={address}>
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
      })}
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
