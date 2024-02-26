import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Trans, useTranslation } from "react-i18next";
import i18n from "../i18n.cjs";

function LanguageDropDown() {
  const { t, i18n } = useTranslation();
  const items = [
    {
      key: "zh-CN",
      label: "简体中文",
    },
    {
      key: "zh-TW",
      label: "正體中文",
    },
    {
      key: "en",
      label: "English",
    },
  ];
  const onClick = ({ key }) => {
    i18n.changeLanguage(key).catch((e) => console.error(e));
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault}>
        <Space>
          {t("language")}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}

export default LanguageDropDown;
