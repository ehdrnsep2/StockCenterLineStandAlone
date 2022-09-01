import React from "react";
import { Card } from "react-bootstrap";

export default function Footer() {
  return (
    <>
      <Card>
        <Card.Header>
          <div className="text-center">
            서버 비용 후원 계좌 : 토스뱅크 1000-0681-7154 김동영
            <br />
            Copyright@주식차트연구소 - 토리한이
          </div>
        </Card.Header>
      </Card>
    </>
  );
}
