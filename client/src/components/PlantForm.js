import React, { useState } from "react";

import plantService from "../services/plants";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Row,
  Col
} from "react-bootstrap";

const PlantForm = () => {
  const [plantName, setPlantName] = useState("");
  const [location, setLocation] = useState("");
  const [light, setLight] = useState("");
  const [water, setWater] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    const plant = {
      name: plantName,
      location: location,
      light: light,
      water: water
    };

    plantService.create(plant).then(response => console.log(response));

    setPlantName("");
    setLocation("");
    setLight("");
    setWater("");

    return;
  };

  return (
    <div className="container m-3">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <FormLabel column sm={2} className="text-right">
              Plant Name:
            </FormLabel>
            <Col sm={5}>
              <FormControl
                value={plantName}
                onChange={({ target }) => setPlantName(target.value)}
              ></FormControl>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <FormLabel column sm={2} className="text-right">
              Water requirements:{" "}
            </FormLabel>
            <Col sm={5}>
              <FormControl
                value={water}
                onChange={({ target }) => setWater(target.value)}
              ></FormControl>
            </Col>
          </Row>
        </FormGroup>{" "}
        <FormGroup>
          <Row>
            <FormLabel column sm={2} className="text-right">
              Light requirements:{" "}
            </FormLabel>
            <Col sm={5}>
              <FormControl
                value={light}
                onChange={({ target }) => setLight(target.value)}
              ></FormControl>
            </Col>
          </Row>
        </FormGroup>{" "}
        <FormGroup>
          <Row>
            <FormLabel column sm={2} className="text-right">
              Location:{" "}
            </FormLabel>
            <Col sm={5}>
              <FormControl
                value={location}
                onChange={({ target }) => setLocation(target.value)}
              ></FormControl>
            </Col>
          </Row>
        </FormGroup>
        <div className="text-center">
          <Button type="submit" variant="primary">
            Add Plant!
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PlantForm;
