import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useForm, Controller } from "react-hook-form";
import { setCalc, useAppContext } from "../../utils/store";
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
  let {
    store: { weight, colorList, min, max, unit },
    dispatch,
  } = useAppContext();

  const [result, setResult] = useState("");
  const [resultText, setResultText] = useState("");

  const onSubmit = (data) => {
    min = parseInt(data.min);
    max = parseInt(data.max);
    let cl = (max + min) / 2;
    unit = parseInt(data.unit);
    let iterWeight = 0.0;
    let len = valueNames.length;

    let resultTxts = [];
    let values = [];
    const colorArray = colorList.split(",");

    for (let i = 0; i < len; i++) {
      let v =
        Math.round((max - ((max - cl) / 5) * (weight + iterWeight)) / unit) *
        unit;
      values.push(v);
      let vName = "result" + i;
      //document.getElementById(vName).innerText = v.toString();
      iterWeight += 0.5;

      if (colorArray.includes(valueNames[i])) {
        resultTxts.push(`${valueNames[i]} : ${v}`);
      }
      //   let chkSelected = document.getElementById("selected" + i);
      //   if (chkSelected.checked) resultTxts.push(`${valueNames[i]} : ${v}`);
    }

    let gap = values[0] - values[2];
    let gapPer = ((max - values[2]) / max - (max - values[0]) / max) * 100;
    setResult(`${gapPer.toFixed(2)}%(빨주),\t차이값 : ${gap}`);

    resultTxts = [`${gapPer.toFixed(2)}% (${gap})`].concat(resultTxts);
    let text = resultTxts.join("\n");
    setResultText(text);

    dispatch(setCalc(min, max, unit));
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <Form.Group as={Row} className="mb-3" controlId="max">
          <Form.Label column sm={2}>
            최대값
          </Form.Label>
          <Col sm={10}>
            <Controller
              control={control}
              name="max"
              defaultValue={max}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Form.Control
                  type="number"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  isInvalid={errors.max}
                  required
                />
              )}
            />
          </Col>
          <Form.Control.Feedback type="invalid">
            {errors.max?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="min">
          <Form.Label column sm={2}>
            최소값
          </Form.Label>
          <Col sm={10}>
            <Controller
              control={control}
              name="min"
              defaultValue={min}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Form.Control
                  type="number"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  isInvalid={errors.min}
                  required
                />
              )}
            />
          </Col>
          <Form.Control.Feedback type="min">
            {errors.min?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="unit">
          <Form.Label column sm={2}>
            단위
          </Form.Label>
          <Col sm={10}>
            <Controller
              control={control}
              name="unit"
              defaultValue={unit}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Form.Control
                  type="number"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  isInvalid={errors.unit}
                  required
                />
              )}
            />
          </Col>
          <Form.Control.Feedback type="invalid">
            {errors.unit?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} className="my-5">
          <Button type="submit" size="lg">
            계산하기
          </Button>
        </Form.Group>
      </Form>

      <hr className="my-3" />
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">이격</label>
        <div className="col-sm-8">
          <input
            readOnly={true}
            type="text"
            className="form-control"
            id="resultGap"
            value={result}
          />
        </div>
      </div>
      <div className="my-2">
        <div className="d-flex justify-content-center">
          <textarea
            className="form-control w-50 p-3"
            rows="7"
            id="txtResult"
            defaultValue={resultText}
            readOnly={true}
          ></textarea>
        </div>
      </div>
    </>
  );
}
