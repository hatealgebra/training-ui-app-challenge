import React from "react";
import { Container, UncontrolledTooltip } from "reactstrap";
import { useTranslation } from "react-i18next";
import { DataTableCard2, DateTime } from "asab_webui_components";
import ServiceAPI from "../services/axiosInstances";

const loader = async ({ params }) => {
  let response = await ServiceAPI.get("/data", { params: params });
  console.log("Response from /data:", response.data);
  const rows = response.data.data;
  const count = response.data.count;
  return { count, rows };
};

const columns = [
  {
    title: "Username",
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
    title: "Email",
    thStyle: { minWidth: "2rem" },
    render: ({ row }) => row.email,
  },
  {
    title: "Created at",
    thStyle: { minWidth: "4rem" },
    render: ({ row: { created } }) => <DateTime value={created} />,
  },
  {
    title: "Last Sign In",
    thStyle: { minWidth: "4rem" },
    render: ({ row: { last_sign_in } }) => <DateTime value={last_sign_in} />,
  },
  {
    thStyle: { width: "0px" }, // This is how you do the column for buttons
    tdStyle: { padding: "0px", whiteSpace: "nowrap" },
    render: ({ row, column }) => (
      <>
        <button className="btn btn-primary me-1" onClick={() => onYClick(row)}>
          <i className="bi bi-check"></i>
        </button>
        <button className="btn btn-danger" onClick={() => onXClick(row)}>
          <i className="bi bi-trash"></i>
        </button>
      </>
    ),
  },
];

export function TableScreen(props) {
  const { t } = useTranslation();

  return (
    <Container className="h-100">
      <DataTableCard2
        className="h-50"
        columns={columns}
        loader={async () => await loader({ params: { p: 1, i: 20 } })}
      />
    </Container>
  );
}
