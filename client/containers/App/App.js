import React from 'react';
import classnames from 'classnames/bind';
import s from './App.styl';
import Autocomplete from "../../components/Autocomplete/main";
import {getAirportsList} from "../../utils/data-provider";

const cx = classnames.bind(s);
const DEPARTURE = 'DEPARTURE';
const ARRIVAL = 'ARRIVAL';

const AirportItemView = function({ item }) {

  return (
    <div className="pokemon-container">
      <div>{item.airport_name || item.name} ({item.iata})</div>
    </div>
  );
}


export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedArr: undefined,
      selectedDep: undefined
    }
  }
  onChange(query, type ) {
    getAirportsList(query, (data) => {
      type === DEPARTURE ?  this.refs.autocomplete_dep.setItems(data) : this.refs.autocomplete_arr.setItems(data);
    })
  }

  onSelect(item, type) {
    console.log('selected', item);
    type === DEPARTURE ?
      this.setState({
        selectedDep: item
      }) :
      this.setState({
        selectedArr: item
      })
    return item.airport_name || item.name;
  }

  render() {
    return (
      <div className={cx('page')}>
        <Autocomplete
          ref="autocomplete_dep"
          ItemView={AirportItemView}
          onChange={(item) => this.onChange(item, DEPARTURE)}
          onSelect={(item) => this.onSelect(item, DEPARTURE)}
        />
        <Autocomplete
          ref="autocomplete_arr"
          ItemView={AirportItemView}
          onChange={(item) => this.onChange(item, ARRIVAL)}
          onSelect={(item) => this.onSelect(item, ARRIVAL)}
        />
      </div>
    );
  }
}
