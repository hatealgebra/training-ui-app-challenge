import React from "react";
import { useTranslation } from "react-i18next";

const icons = {
  id: "bi-hash",
  username: "bi-person",
  email: "bi-envelope",
  created: "bi-clock-history",
  last_sign_in: "bi-clock-history",
  detail: "info-circle",
  address: "geo-alt",
  phone_number: "bi-telephone",
  ip_address: "bi-wifi",
  mac_address: "bi-hdd-network",
};

const DataIcon = ({ iconKey, direction = "left" }) => {
  const { t } = useTranslation();

  const iconClass = icons[iconKey];

  if (!iconClass) {
    console.warn(`Icon for key "${iconKey}" not found.`);
    return null;
  }

  return (
    <i
      className={`bi ${iconClass} ${direction === "left" ? "pe-2" : "pr-2"}`}
      label={t(`Data|${iconKey}`)}
    ></i>
  );
};

export default DataIcon;
