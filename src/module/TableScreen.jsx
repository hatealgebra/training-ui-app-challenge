import React from "react";
import { Container, UncontrolledTooltip } from "reactstrap";
import { useTranslation } from "react-i18next";
import { DataTableCard2, DateTime } from "asab_webui_components";
import ServiceAPI from "../services/axiosInstances";
import { Link } from "react-router-dom";
import DataIcon from "./DataIcon";

const loader = async ({ params }) => {
  let response = await ServiceAPI.get("/data", { params: params });

  const rows = response.data.data;
  const count = response.data.count;
  return { count, rows };
};

const getColumns = (translationFn) => [
  {
    title: (
      <>
        <DataIcon iconKey="username" />
        <span>{translationFn("Data|username")}</span>
      </>
    ),
    thStyle: { minWidth: "2rem" },
    render: ({ row: { id, username } }) => {
      const targetRef = `TooltipRef-${id}`;
      return (
        <div>
          <UncontrolledTooltip target={targetRef} placement="top">
            {id}
          </UncontrolledTooltip>
          <span id={targetRef}>{username}</span>
        </div>
      );
    },
  },
  {
    title: (
      <>
        <DataIcon iconKey="email" />
        <span>{translationFn("Data|email")}</span>
      </>
    ),
    icon: "bi-alarm",
    thStyle: { minWidth: "2rem" },
    render: ({ row }) => row.email,
  },
  {
    title: (
      <>
        <DataIcon iconKey="created" />
        <span>{translationFn("Data|created")}</span>
      </>
    ),
    thStyle: { minWidth: "4rem" },
    render: ({ row: { created } }) => <DateTime value={created} />,
  },
  {
    title: (
      <>
        <DataIcon iconKey="last_sign_in" />
        <span>{translationFn("Data|last_sign_in")}</span>
      </>
    ),
    thStyle: { minWidth: "4rem" },
    render: ({ row: { last_sign_in } }) => <DateTime value={last_sign_in} />,
  },
  {
    thStyle: { width: "0px" }, // This is how you do the column for buttons
    tdStyle: { padding: "0px", whiteSpace: "nowrap" },
    render: ({ row }) => (
      <Link key="hello" to={`/detail/${row.id}`} className="btn btn-primary">
        {translationFn("Data|detail")}
      </Link>
    ),
  },
];

const Header = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex-fill">
        <h3>
          <i className="bi bi-stopwatch pe-2"></i>
          {t("SessionListContainer|Sessions")}
        </h3>
      </div>
    </>
  );
};

export function TableScreen() {
  const { t } = useTranslation();
  const columns = React.useMemo(() => getColumns(t), [t]);

  return (
    <Container className="h-100">
      <DataTableCard2
        header={<Header />}
        className="h-50"
        columns={columns}
        loader={async () => await loader({ params: { p: 1 } })}
      />
    </Container>
  );
}
