import React from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import moment from 'moment';

    function RenderDish(dish) {
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

   function RenderComments(comments){
        if (comments != null)
            return(
                <div >
                    <ul className = "list-unstyled">
                        {comments.map(comment =>
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

   const DishDetail = (props) => {
        if(props.dish != null)
            return (
                <div class="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {RenderDish(props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {RenderComments(props.dish.comments)}
                        </div>
                    </div>
                </div>
            )
        else 
            return (
                <div class="container"></div>
            )
    };


export default DishDetail
