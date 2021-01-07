import React, { Component } from 'react';
import Header from "./HeaderComponent";
import Footer  from "./FooterComponent";
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';


import { Switch, Route, Redirect } from 'react-router-dom';

const HomePage = () => {
    return(
        <Home 
        />
    );
  }

class MainComponents extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
    };
  }

 

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
    return (
        <div>
            <Header />
            <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
        
    );
  }
}

export default MainComponents;