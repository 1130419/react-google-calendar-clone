import { Row, Col, Button, Tooltip } from "antd";
import React from "react";
import { toolbar, toolbarDate, spacify, weekButtons } from "../styles";
import moment from "moment";

function WeekToolbar(props) {
  const formattedDate = moment(props.startDate).format("MMM YYYY");
  return (
    <Row type="flex" gutter={4} style={toolbar}>
      <Col span={6} offset={16} style={weekButtons}>
        <Button onClick={props.goToPreviousWeek} style={spacify} icon="left" />
        <Button onClick={props.goToPreviousDay} style={spacify} icon="left" />

        <Tooltip placement="topLeft" title={moment().format("dddd, MMM D")}>
          <Button onClick={props.goToToday}>Today</Button>
        </Tooltip>

        <Button onClick={props.goToNextDay} icon="right" />
        <Button onClick={props.goToNextWeek} icon="right" />
      </Col>

      <Col span={2} style={toolbarDate}>
        {formattedDate}
      </Col>
    </Row>
  );
}

export default WeekToolbar;
