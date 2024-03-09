import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import rawData from "./data.json5";
import i18n from "./i18n.cjs";
import { Card, Flex, QRCode, Col, Row } from "antd";
import MyLiquid from "./chart/Liquid";
import MyLine from "./chart/Line";
import LanguageDropDown from "./component/LanguageDropDown";
import { Trans, useTranslation } from "react-i18next";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [percent, setPercent] = useState(0.0);
  const { width, height } = useWindowSize();
  const [runConfetti, setRunConfetti] = useState(false);

  useEffect(() => {
    let newData = [];
    let percent = 0;
    for (let i = 0; i < rawData.length; i++) {
      let time = new Date(rawData[i].time);
      newData.push({
        Time: time,
        Signatories: parseInt(rawData[i].cnt),
        Aim: 20000,
      });
    }
    percent = newData[newData.length - 1].Signatories / 20000;
    setData(newData);
    setPercent(percent);
    if (newData[newData.length - 1].Signatories >= 20000) {
      setRunConfetti(true);
      // setInterval(() => {
      //   setRunConfetti(false);
      // }, 5000);
    }
  }, []);

  const ePetitionUrl =
    "https://www.parliament.nsw.gov.au/la/Pages/ePetition-details.aspx?q=tabuKTP7hWgVFy0qTdhC7w";
  const endTime = new Date("2024-03-07 13:00:00");
  const nowTime = new Date();
  const endDiff = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
  const leftTime = endDiff > 0 ? endDiff : 0;
  const daysLeft = parseInt(leftTime / (24 * 60 * 60));
  return (
    <>
      <a
        href="https://github.com/Foldblade/track-make-transport-concessions-available-to-all-students-in-nsw/"
        className="github-corner"
        aria-label={t("vsogithub")}
      >
        <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: 130 + "px" + "," + 106 + "px" }}
            className="octo-arm"
          ></path>
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          ></path>
        </svg>
      </a>
      <Confetti
        width={width}
        height={height}
        run={runConfetti}
        recycle={false}
      />
      <main>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <LanguageDropDown />
          </Col>
          <Col xs={24}>
            <Card>
              <MyLine data={data} />
            </Card>
          </Col>
          <Col xs={24} xl={{ span: 16, offset: 4 }}>
            <Flex gap="middle" align="center" vertical>
              <Flex justify="space-between" align="center" gap="middle" wrap>
                <QRCode value={ePetitionUrl} height="200" width="200" />
                <MyLiquid percent={percent} width={200} height={200} />
              </Flex>
              <div>
                {t("united")} {t("i11lStuNsw")}
                <br />
                <Trans i18nKey="signFor">
                  Sign for{" "}
                  <a href={ePetitionUrl}>
                    Make transport concessions available to all students in NSW
                  </a>
                  !
                </Trans>
              </div>
              <div>{t("daysLeft", { count: daysLeft })}</div>

              <div>{t("fdefm")}</div>
              <div>
                <Trans i18nKey="thanks">
                  Thanks <strong>Jet Hunt</strong> who created this ePetition.
                </Trans>
              </div>
            </Flex>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default App;
