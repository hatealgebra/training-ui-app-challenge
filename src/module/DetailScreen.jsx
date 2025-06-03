import React, { useMemo } from "react";

import ServiceAPI from "../services/axiosInstances";

import { useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { DateTime } from "asab_webui_components";
import DataIcon from "./DataIcon";
import { Link } from "react-router-dom";

const isDateTime = (key, value) => {
  console.log(key);

  if (key !== "created" && key !== "last_sign_in") {
    return <span>{value}</span>;
  }
  return <DateTime value={value} />;
};

const DetailScreen = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const { t } = useTranslation();

  React.useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

    ServiceAPI.get(`/detail/${id}`)
      .then((response) => {
        const responseData = Object.entries(response.data);
        setData(responseData);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Table screen</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span className="text-uppercase fw-bold">Customer detail </span>
          <span>({id})</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row className="gap-3" widths={["100%", "100px", "200px"]}>
        {id &&
          data.map(([key, value], i) => (
            <Card
              key={`${key}-${value.id}`}
              outline
              style={{
                width: "18rem",
              }}
            >
              <CardHeader className="text-uppercase fw-bold">
                <DataIcon iconKey={key} />
                <span>{t(`Data|${key}`).replace(/_/g, " ")}</span>
              </CardHeader>
              <CardBody>{isDateTime(key, value)}</CardBody>
            </Card>
          ))}
      </Row>
    </Container>
  );
};

export default DetailScreen;
