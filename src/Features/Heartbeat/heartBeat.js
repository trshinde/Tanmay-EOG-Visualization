import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import { actions } from './sliceReducer';
import MultipleMetrics from '../MultipleMetrics/multipleMetrics';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const heartBeatQuery = `
  query {
    heartBeat                                                                                                              
  }
  `;

export default () => {
  return (
    <Provider value={client}>
      <Heartbeat />
    </Provider>
  );
};

const Heartbeat = () => {
  const dispatch = useDispatch();

  const [heartBeat] = useQuery({
    query: heartBeatQuery,
  });

  const { data, error } = heartBeat;
  
  useEffect(() => {
    if (error) {
      console.log(error.message);
      return;
    }
    if (!data) return;

    dispatch(actions.timestamp(data.heartBeat));
  });

  return <MultipleMetrics />;
};
