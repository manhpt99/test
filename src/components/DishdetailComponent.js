import React, { Component } from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import moment from 'moment';

export class DishdetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderDish(dish) {
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    renderComments(dish){
        if (dish != null)
            return(
                <div >
                    <ul className = "list-unstyled">
                        {dish.comments.map(comment =>
                            <div >
                                <li>
                                    {comment.comment}
                                </li>
                                <li>
                                    -- {comment.author} ,
                                    {moment(comment.date).add(1, 'd').format(' MMM DD, YYYY')}
                                </li>
                                <br></br>
                            </div>
                        )}
                   </ul>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    render() {
        if (this.props.dish != null)
            return (
                <div class="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(this.props.dish)}
                        </div>
                    </div>
                </div>
            )
        else
            return (
                <div></div>
            );

    };
}

export default DishdetailComponent
