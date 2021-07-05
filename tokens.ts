export type Token = {
  address: string;
  name: string;
  symbol: string;
  logo: string;
  type: "SECRET" | "ETH" | "BSC" | "LP" | "REWARDS";
};

export const tokenList: Token[] = [
  // Secret
  {
    address: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    name: "Secret SCRT",
    symbol: "sSCRT",
    logo: "scrt.svg",
    type: "SECRET",
  },
  {
    address: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    name: "Secret Finance Token",
    symbol: "SEFI",
    logo: "sefi.svg",
    type: "SECRET",
  },
  {
    address: "secret1vq0gc5wdjqnalvtgra3dr4m07kaxkhq2st3hzx",
    name: "Sienna",
    symbol: "SIENNA",
    logo: "sienna.svg",
    type: "SECRET",
  },
  {
    address: "secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798",
    name: "Fat Secret",
    symbol: "FATS",
    logo: "fat_secret.png",
    type: "SECRET",
  },
  // ETH
  {
    address: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    name: "Ethereum",
    symbol: "ETH",
    logo: "eth.png",
    type: "ETH",
  },
  {
    address: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f",
    name: "Tether",
    symbol: "USDT",
    logo: "0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    type: "ETH",
  },
  {
    address: "secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq",
    name: "Dai Stablecoin",
    symbol: "DAI",
    logo: "0x6b175474e89094c44da98b954eedeac495271d0f.png",
    type: "ETH",
  },
  {
    address: "secret1szqzgpl9w42kekla57609y6dq2r39nf0ncx400",
    name: "Compound",
    symbol: "COMP",
    logo: "0xc00e94cb662c3520282e6f5717214004a7f26888.png",
    type: "ETH",
  },
  {
    address: "secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te",
    name: "Uniswap",
    symbol: "UNI",
    logo: "uni.png",
    type: "ETH",
  },
  {
    address: "secret15grq8y54tvc24j8hf8chunsdcr84fd3d30fvqv",
    name: "yearn.finance",
    symbol: "YFI",
    logo: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e.png",
    type: "ETH",
  },
  {
    address: "secret1ryh523y4e3233hphrkdslegszqz8syjfpthcpp",
    name: "TrueUSD",
    symbol: "TUSD",
    logo: "0x0000000000085d4780b73119b644ae5ecd22b376.png",
    type: "ETH",
  },
  {
    address: "secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps",
    name: "Ocean Token",
    symbol: "OCEAN",
    logo: "0x967da4048cd07ab37855c090aaf366e4ce1b9f48.png",
    type: "ETH",
  },
  {
    address: "secret1xcrf2vvxcz8dhtgzgsd0zmzlf9g320ea2rhdjw",
    name: "ChainLink Token",
    symbol: "LINK",
    logo: "0x514910771af9ca656af840dff83e8264ecf986ca.png",
    type: "ETH",
  },
  {
    address: "secret1tqltnm8f53xnprmnlurczf6sr86a4mgztafxzp",
    name: "Maker",
    symbol: "MKR",
    logo: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png",
    type: "ETH",
  },
  {
    address: "secret15c5ftq4rq7xq3tml4nphv2fvz3u7kg73a583qp",
    name: "Synthetix Network",
    symbol: "SNX",
    logo: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.png",
    type: "ETH",
  },
  {
    address: "secret1p4zvqgxggrrk435nj94p6la2g4xd0rwssgzpsr",
    name: "BandToken",
    symbol: "BAND",
    logo: "0xba11d00c5f74255f56a5e366f4f77f5a186d7f55.png",
    type: "ETH",
  },
  {
    address: "secret1rs389ss2jch4xjmxv5guru86s8y839nmjsrm5d",
    name: "KyberNetwork",
    symbol: "KNC",
    logo: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200.png",
    type: "ETH",
  },
  {
    address: "secret1yxwnyk8htvvq25x2z87yj0r5tqpev452fk6h5h",
    name: "Aave Token",
    symbol: "AAVE",
    logo: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
    type: "ETH",
  },
  {
    address: "secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a",
    name: "Wrapped BTC",
    symbol: "WBTC",
    logo: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
    type: "ETH",
  },
  {
    address: "secret1ezg8weaamcr99848qhkqcf2ap5xz7nwe3cy22x",
    name: "Basis Cash",
    symbol: "BAC",
    logo: "0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a.png",
    type: "ETH",
  },
  {
    name: "REN",
    address: "secret1s4fllut0e6vw0k3fxsg4fs6fm2ad6hn09zwgwv",
    symbol: "REN",
    logo: "0x408e41876cccdc0f92210600ef50372656052a38.png",
    type: "ETH",
  },
  {
    name: "RENBTC",
    address: "secret13j9sg2lpmwl92taac4lr3xqhslnm2yjm4nsmzl",
    symbol: "RENBTC",
    logo: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png",
    type: "ETH",
  },
  {
    name: "Sushi",
    address: "secret19uje5xy80rm6rfu03df2xea532mcalw9hv8vf9",
    symbol: "SUSHI",
    logo: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png",
    type: "ETH",
  },
  {
    name: "ReserveRights",
    address: "secret1vcm525c3gd9g5ggfqg7d20xcjnmcc8shh902un",
    symbol: "RSR",
    logo: "0x8762db106b2c2a0bccb3a80d1ed41273552616e8.png",
    type: "ETH",
  },
  {
    name: "USDC",
    address: "secret1h6z05y90gwm4sqxzhz4pkyp36cna9xtp7q0urv",
    symbol: "USDC",
    logo: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    type: "ETH",
  },
  {
    name: "DefiPulse Index",
    address: "secret1ukn328k6y3th5nw9z00p8lvk5s7m05cr9p06cu",
    symbol: "DPI",
    logo: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b.png",
    type: "ETH",
  },
  {
    address: "secret1d673zrls7z5sd7nzqavqs4uzahnzqxq9zk7e62",
    name: "UNILP-WSCRT-ETH",
    symbol: "UNILP-WSCRT-ETH",
    logo: "scrt.svg",
    type: "ETH",
  },
  {
    name: "THORChain (ERC20)",
    address: "secret1el5uj9ns9sty682dem033pt50xsv5mklmsvy24",
    symbol: "RUNE",
    logo: "0x3155ba85d5f96b2d030a4966af206230e46849cb.png",
    type: "ETH",
  },
  {
    name: "Tornado Cash",
    address: "secret19g8edr6pa2s7ywuc3wys9sgk76kj2th7xtksey",
    symbol: "TORN",
    logo: "0x77777feddddffc19ff86db637967013e6c6a116c.png",
    type: "ETH",
  },
  {
    name: "Basic Attention Token",
    address: "secret1nq7resltu9870ar7vdu2suhzplx84800jfj2ja",
    symbol: "BAT",
    logo: "0x0d8775f648430679a709e98d2b0cb6250d2887ef.png",
    type: "ETH",
  },
  {
    name: "0x",
    address: "secret120vtzu6xjprp6pq0r8wprf3jlp86xr8uu0nlc5",
    symbol: "ZRX",
    logo: "0xe41d2489571d322189246dafa5ebde1f4699f498.png",
    type: "ETH",
  },
  {
    name: "Enjin Coin",
    address: "secret1wp8aj7tja30cek5wf5jwcv0xalw8vmdasfv2lh",
    symbol: "ENJ",
    logo: "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c.png",
    type: "ETH",
  },
  {
    name: "Decentraland",
    address: "secret178t2cp33hrtlthphmt9lpd25qet349mg4kcega",
    symbol: "MANA",
    logo: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942.png",
    type: "ETH",
  },
  {
    name: "YF Link",
    address: "secret1jk0tw00vs23n8jwqdzrxtln6ww2a3k6em7s0p2",
    symbol: "YFL",
    logo: "yflink_32.png",
    type: "ETH",
  },
  {
    name: "AlphaToken",
    address: "secret1h0tn05w9cjtsz9stccq2xl5rha2fxl0n2d765t",
    symbol: "ALPHA",
    logo: "0xa1faa113cbe53436df28ff0aee54275c13b40975.png",
    type: "ETH",
  },
  {
    name: "Polygon",
    address: "secret1pse3xfvv5pq5jw04wcaxhnhn7jqamfhcpm7j3t",
    symbol: "MATIC",
    logo: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
    type: "ETH",
  },
  // BSC
  {
    address: "secret1tact8rxxrvynk4pwukydnle4l0pdmj0sq9j9d5",
    name: "BNB Token",
    symbol: "BNB(BSC)",
    logo: "binance-coin-bnb-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1793ctg56epnzjlv7t7mug2tv3s2zylhqssyjwe",
    name: "Binance-peg BUSD",
    symbol: "BUSD(BSC)",
    logo: "binance-usd-busd-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1m6a72200733a7jnm76xrznh9cpmt4kf5ql0a6t",
    name: "Binance-peg Ethereum",
    symbol: "ETH(BSC)",
    logo: "ethereum-eth-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1j0urq4pfrjr55c95z9s9jzv0evj88gjc9m0h02",
    name: "Binance-peg XRP",
    symbol: "XRP(BSC)",
    logo: "xrp-xrp-logo.svg",
    type: "BSC",
  },
  {
    address: "secret16euwqyntvsp0fp2rstmggw77w5xgz2z26cpwxj",
    name: "Binance-peg USDT",
    symbol: "USDT(BSC)",
    logo: "tether-usdt-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1t6228qgqgkwhnsegk84ahljgw2cj7f9xprk9zd",
    name: "Binance-peg Cardano",
    symbol: "ADA(BSC)",
    logo: "cardano-ada-logo.svg",
    type: "BSC",
  },
  {
    address: "secret16nqax7x66z4efpu3y0kssdfnhg93va0h20yjre",
    name: "Binance-peg Dogecoin",
    symbol: "DOGE(BSC)",
    logo: "dogecoin-doge-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1px5mtmjh072znpez4fjpmxqsv3hpevdpyu9l4v",
    name: "Binance-Peg Polkadot",
    symbol: "DOT(BSC)",
    logo: "polkadot-new-dot-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1kf45vm4mg5004pgajuplcmkrzvsyp2qtvlklyg",
    name: "Binance-peg USDC",
    symbol: "USDC(BSC)",
    logo: "usd-coin-usdc-logo.svg",
    type: "BSC",
  },
  {
    address: "secret12cwvnd5g0r7raq94rpve93rdrl49f3rpw30gqn",
    name: "Binance-peg Bitcoin Cash",
    symbol: "BCH(BSC)",
    logo: "bitcoin-cash-bch-logo.svg",
    type: "BSC",
  },
  {
    address: "secret17zt6ycf3n079fngha6ku5u4qwjca2k2jq6rfp9",
    name: "Binance-peg Litecoin",
    symbol: "LTC(BSC)",
    logo: "litecoin-ltc-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1trr50jqff3ncn099cpukehh8a4pjxu0d3m4ccq",
    name: "Binance-peg ChainLink",
    symbol: "LINK(BSC)",
    logo: "0x514910771af9ca656af840dff83e8264ecf986ca.png",
    type: "BSC",
  },
  {
    address: "secret1ehz0rjrng3q8pr8sdduuajnwq7fwrdhqf8awtz",
    name: "Binance-peg Tron Token",
    symbol: "TRX(BSC)",
    logo: "tron-trx-logo.svg",
    type: "BSC",
  },
  {
    address: "secret13z4thzp3zzyxr008fsygnpn2jpl84w884gfy86",
    name: "PancakeSwap",
    symbol: "CAKE",
    logo: "pancakeswap-cake-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1r8pgpj8x8ptqxwlweu8j8dqagjmqzugxpxa706",
    name: "Bakery Swap",
    symbol: "BAKE",
    logo: "bakerytoken-bake-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1npxd6pyh7ujhdsk7cvmq93y2v5uccj79sccch5",
    name: "Venus",
    symbol: "XVS",
    logo: "venus-xvs-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1u9myrsw6mmgvmrrgjnkermayp88arkjd5e9jut",
    name: "Linear",
    symbol: "LINA",
    logo: "logo-crypto-linear-buildr.svg",
    type: "BSC",
  },
  {
    address: "secret1ztejvy40avl54gu049jdk4wtggcq2uxnw0wnxu",
    name: "Refinable",
    symbol: "FINE",
    logo: "refinable-fine-logo.png",
    type: "BSC",
  },
  {
    address: "secret1fsmwnrttkr2qtywzzlkmy6wpu22khg7a88kzm6",
    name: "Bunny",
    symbol: "BUNNY",
    logo: "token-bunny.svg",
    type: "BSC",
  },
  {
    address: "secret1c7apt5mmv9ma5dpa9tmwjunhhke9de2206ufyp",
    name: "Binance-peg SCRT",
    symbol: "SCRT(BSC)",
    logo: "scrt.svg",
    type: "BSC",
  },
  // SecretSwap LP
  // TODO
  // Rewards
  //TODO
];