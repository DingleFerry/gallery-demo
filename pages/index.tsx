import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useMetamask,
  useNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";


const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { contract } = useContract("0x24AA930895314Abe5E5BA8b2B83Ec1dd0BE0813c", "signature-drop");

  const { data: nfts, isLoading: loading } = useNFTs(contract, {
    start: 0,
    count: 99,
  });

  const truncateAddress = (address: string) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {!address && (
        <button onClick={connectWithMetamask}>Connect Wallet</button>
      )}

      {nfts && nfts?.length > 0 && (
        <div className={styles.cards}>
          {nfts
            .filter(
              (nft) =>
                nft.owner !== "0x0000000000000000000000000000000000000000"
            )
            .map((nft) => (
              <div key={nft.metadata.id.toString()} className={styles.card}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.image}
                />
                <h1 className={styles.title}>
                  Booty #{nft.metadata.id}
                </h1>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;