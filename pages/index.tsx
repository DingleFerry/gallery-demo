import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useMetamask,
  useNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import metadataArr from "../public/metadata.json";
import { Edition } from "@thirdweb-dev/sdk";
import express from "express";


const Home: NextPage = () => {
  const address = useAddress();
  // const connectWithMetamask = useMetamask();
  const { contract } = useContract("0x24AA930895314Abe5E5BA8b2B83Ec1dd0BE0813c", "signature-drop");

  const { data: nfts, isLoading: loading } = useNFTs(contract, {
    start: 0,
    count: 99
  });

  // console.log(nfts);

  const logNFTs = () => {
    console.log(nfts);
  }

  const metaArray = metadataArr.metadataArr;
  

  const popModal = async (event: any) => {
    const modal = (document.getElementById("modal") as HTMLElement);
    modal.style.visibility = 'visible';
    const screenCover = (document.getElementById("screenCover") as HTMLElement);
    screenCover.style.visibility = 'visible';

    const clickedCard = event.target as Element;
    const imgFocusSrc = clickedCard.getAttribute('src');
    const activeID = clickedCard.getAttribute('alt');
    const activeIDSliced = activeID?.slice(2);
    const activeIDNum = parseInt(activeIDSliced as string) - 1;
  
    // const metaArrayString = metaArray.toString();
    // const metaArrayString: string[] = metaArray;
    // const imgFocusString = imgFocus?.toString();

    const modalImg = (document.getElementById("modalImg") as HTMLImageElement);
    modalImg.src = imgFocusSrc as string;

    const nameAtt = (document.getElementById("nameAtt") as HTMLElement);
    nameAtt.textContent = activeIDNum.toString();

    const openSeaLink = (document.getElementById("openSeaLink") as HTMLElement);
    let urlOS: string = 'https://testnets.opensea.io/assets/goerli/0x24aa930895314abe5e5ba8b2b83ec1dd0be0813c/' + activeIDNum;
    openSeaLink.setAttribute("href", urlOS)


    console.log(urlOS)

    // let indexedObj: any = JSON.stringify(metaArray[activeIDNum]);
    // let index = [];
    
    // indexedObj.set('edition', activeIDNum);
    // console.log(indexedObj.edition);

    // const express = require("express");
    // const config = require("../public/metadata.json");
    // const app = express();

    // app.listen(config.metadataArr.edition, () =>{
    //   console.log(`Edition #${config.metadataArr.edition}`)
    // })

    class Todo {
      World: string;
      Environment: string;
      Cheeks: string;
      Poop: string;
      Outline: string;
     
      getWorld() {
          return this.World;
      }
     
      getEnvironment() {
          return this.Environment;
      }
  }

  let activeAtts = Object.assign(new Todo(), metaArray[activeIDNum].attributes);
  let activeWorld = activeAtts[0].value;
  let activeEnv = activeAtts[1].value;
  let activeCheeks = activeAtts[2].value;
  let activePoop = activeAtts[3].value;
  let activeOutline = activeAtts[4].value;

    // for (var edition in metaArray) {
    //   index.push(edition);
    // };

    // index.sort(function (a, b) {    
    //   return a == b ? 0 : (a > b ? 1 : -1); 
    // });


    const worldVal = (document.getElementById("worldVal") as HTMLElement);
    worldVal.textContent = activeWorld;
    const envVal = (document.getElementById("envVal") as HTMLElement);
    envVal.textContent = activeEnv;
    const cheeksVal = (document.getElementById("cheeksVal") as HTMLElement);
    cheeksVal.textContent = activeCheeks;
    const poopVal = (document.getElementById("poopVal") as HTMLElement);
    poopVal.textContent = activePoop;
    const outlineVal = (document.getElementById("outlineVal") as HTMLElement);
    outlineVal.textContent = activeOutline;
    // const keys = Object.keys(indexedObj);
    // const values = Object.values(indexedObj);
    // console.log(values);

    // for (var key in indexedObj) {
    //   console.log(indexedObj["name"])
    // }


  }

  const closeModal = () => {
    const modal = (document.getElementById("modal") as HTMLElement);
    modal.style.visibility = 'hidden';
    const screenCover = (document.getElementById("screenCover") as HTMLElement);
    screenCover.style.visibility = 'hidden';
  }

  // const logThis = (event: any) => {
  //   console.log(event.target as Element)
  // }

  // const truncateAddress = (address: string) => {
  //   return (
  //     address.substring(0, 6) + "..." + address.substring(address.length - 4)
  //   );
  // };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* <button className={styles.mainBtn} onClick={logNFTs}>Log NFTs</button> */}
      {/* {!address && (
        <button onClick={connectWithMetamask}>Connect Wallet</button>
      )} */}
      <div className={styles.modal} id="modal">
        <div className={styles.imgCase}>
          <img src={''} className={styles.modalImg} id="modalImg"></img>
        </div>
        <div className={styles.textCase}>
          <ul className={styles.modalProps}>
            <li className={styles.name}>Stinky Booty #<span id="nameAtt"></span></li>
            <li>World: <span id="worldVal"></span></li>
            <li>Environment: <span id="envVal"></span></li>
            <li>Cheeks: <span id="cheeksVal"></span></li>
            <li>Poop: <span id="poopVal"></span></li>
            <li>Outline: <span id="outlineVal"></span></li>
          </ul>
          <a id="openSeaLink" href="" target="_blank"><button className={styles.socialBtn}>View on opensea</button></a>
          <button className={styles.closeBtn} onClick={closeModal}>X</button>
        </div>
      </div>
      <div className={styles.screenCover} id="screenCover"></div>

      {nfts && nfts?.length > 0 && (
        <div className={styles.cards}>
          {nfts
            .filter((nft) => nft.owner !== "0x0000000000000000000000000000000000000000")
            .map((nft) => (
              <div className={styles.fullCard}>
                <div key={nft.metadata.id.toString()} className={styles.card} onClick={popModal} id="gridCell">
                <ThirdwebNftMedia metadata={nft.metadata} className={styles.image} /></div>
                <h1 className={styles.cardTitle}>
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