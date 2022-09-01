import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useForm, Controller } from "react-hook-form";
import { setSetting, useAppContext } from "../../utils/store";
import { valueNames } from "../../common";

export default function Root() {
  const {
    setError,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const {
    store: { weight, colorList },
    dispatch,
  } = useAppContext();
  const colorArray = colorList.split(",");
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, valueNames.length);
  }, []);

  const onSubmit = (data) => {
    const weight = parseInt(data.weight);
    const colors = [];
    for (let i = 0; i < valueNames.length; i++) {
      if (itemsRef.current[i].checked) {
        colors.push(valueNames[i]);
      }
    }
    const colorText = colors.join(",");
    dispatch(setSetting(weight, colorText));
    alert("저장을 완료하였습니다.");
  };

  const onChange = (e) => {};

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <Form.Group as={Row} className="mb-3" controlId="weight">
          <Form.Label column sm={2}>
            가중치(%)
          </Form.Label>
          <Col sm={10}>
            <Controller
              control={control}
              name="weight"
              defaultValue={weight}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Form.Control
                  type="number"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  isInvalid={errors.weight}
                  placeholder="2.0"
                  required
                />
              )}
            />
          </Col>
          <Form.Control.Feedback type="invalid">
            {errors.weight?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th>선택</th>
                <th>구분</th>
              </tr>
            </thead>
            <tbody>
              {valueNames.map((item, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="checkbox"
                      key={i}
                      defaultChecked={colorArray.includes(item)}
                      onChange={onChange}
                      ref={(el) => (itemsRef.current[i] = el)}
                    />
                  </td>
                  <td>{valueNames[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Form.Group as={Row} className="my-5">
          <Button type="submit" size="lg">
            저장하기
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
