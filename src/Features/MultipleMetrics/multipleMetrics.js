import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from './sliceReducer';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const measurementQuery = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric,
        measurements {
            metric,
            at,
            value,
            unit
        }
    }                                                                                       
  }
  `;

export default () => {
  return (
    <Provider value={client}>
      <MultipleMetrics />
    </Provider>
  );
};

const MultipleMetrics = () => {
  const timeStamp = useSelector(state => state.heartbeat);
  const dispatch = useDispatch();

  const metricSet = [
    {
      metricName: 'injValveOpen',
      before: timeStamp.currentData,
      after: timeStamp.pastData,
    },
    {
      metricName: 'oilTemp',
      before: timeStamp.currentData,
      after: timeStamp.pastData,
    },
    {
      metricName: 'casingPressure',
      before: timeStamp.currentData,
      after: timeStamp.pastData,
    },
    {
      metricName: 'tubingPressure',
      before: timeStamp.currentData,
      after: timeStamp.pastData,
    },
    {
      metricName: 'flareTemp',
      before: timeStamp.currentData,
      after: timeStamp.pastData,
    },
    {
      metricName: 'waterTemp',
      before: timeStamp.currentData,
      after: timeStamp.pastData,
    },
  ];

  const [measurementRes] = useQuery({
    query: measurementQuery,
    variables: {
      input: metricSet,
    },
  });

  const { fetching, data, error } = measurementRes;

  useEffect(() => {
    if (error) {
      return;
    }
    if (!data) {
      return;
    } else {
      const { getMultipleMeasurements } = data;
      dispatch(actions.multipleData(getMultipleMeasurements));
    }
  });

  if (fetching) return <LinearProgress />;

  return null;
};
