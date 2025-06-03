import React, { useMemo } from "react";

import ServiceAPI from "../services/axiosInstances";

import { useParams } from "react-router";
import { AdvancedCard, ResultCard } from "asab_webui_components";
import { Card, CardBody, CardHeader, Container, Row } from "reactstrap";

const DetailScreen = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

    ServiceAPI.get(`/detail/${id}`)
      .then((response) => {
        console.log("Response from /detail:", response.data);
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
              <CardHeader className="text-uppercase fw-bold">{key}</CardHeader>
              <CardBody>
                <span>{value}</span>
              </CardBody>
            </Card>
          ))}
      </Row>
    </Container>
  );
};

export default DetailScreen;
