import React from 'react';
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import moment from "moment";

const sliderTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "rgb(0, 143, 251)",
      },
      track: {
        color: 'rgb(0, 143, 251)',
        height: 1.5,
      },
      rail: {
        color: 'rgb(229,229,229)',
        opacity: 1,
        height: 1.5,
      }
    }
  },
});

const tooltipTheme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 12,
        color: "rgb(0, 143, 251)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        fontWeight: 600,
      }
    }
  },
});

function ValueLabelComponent(props) {
  const {children, open, value} = props;
  return (
    <ThemeProvider theme={tooltipTheme}>
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    </ThemeProvider>
  );
}

export default function DateSlider({min, max, onChange}) {
  return (
    <ThemeProvider theme={sliderTheme}>
      <Slider
        valueLabelFormat={(value) => moment(new Date(value)).format("DD.MM.YYYY")}
        ValueLabelComponent={ValueLabelComponent}
        defaultValue={min}
        min={min}
        max={max}
        onChange={onChange}
      />
    </ThemeProvider>
  )
}